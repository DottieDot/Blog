use std::pin::Pin;

use actix_identity::Identity;
use actix_web::{
  dev::Payload,
  error::BlockingError,
  web,
  Error,
  HttpResponse,
  HttpRequest,
  FromRequest,
};
use diesel::prelude::*;
use diesel::MysqlConnection;
use serde::Deserialize;

use crate::models::{
  Pool,
  User,
  UserSlim,
};
use crate::errors::ServiceError;
use crate::util::{verify_password};
use futures::future::Future;

#[derive(Debug, Deserialize)]
pub struct AuthData {
  pub email: String,
  pub password: String,
}

pub type LoggedUser = UserSlim;

impl FromRequest for LoggedUser {
  type Config = ();
  type Error = Error;
  type Future = Pin<Box<dyn Future<Output = Result<LoggedUser, Error>>>>;

  fn from_request(req: &HttpRequest, pl: &mut Payload) -> Self::Future {
    let fut = Identity::from_request(req, pl);

    Box::pin(async move {
      if let Some(identity) = fut.await?.identity() {
          let user: LoggedUser = serde_json::from_str(&identity)?;
          return Ok(user);
      };
      Err(ServiceError::Unauthorized.into())
    })
  }
}

pub async fn logout(id: Identity) -> HttpResponse {
  id.forget();
  HttpResponse::Ok().finish()
}

pub async fn login(
  auth_data: web::Json<AuthData>,
  id: Identity,
  pool: web::Data<Pool>,
) -> Result<HttpResponse, ServiceError> {
  let res = web::block(move || query(auth_data.into_inner(), pool)).await;

  match res {
    Ok(user) => {
      let user_string = serde_json::to_string(&user).unwrap();
      id.remember(user_string);
      Ok(HttpResponse::Ok().finish())
    }
    Err(err) => match err {
      BlockingError::Error(service_error) => Err(service_error),
      BlockingError::Canceled => Err(ServiceError::InternalServerError)
    },
  }
}

pub async fn check_login(
  user: LoggedUser
) -> HttpResponse {
  HttpResponse::Ok().json(user)
}

fn query(auth_data: AuthData, pool: web::Data<Pool>) -> Result<UserSlim, ServiceError> {
  use crate::schema::users::dsl::{email, users};

  let conn: &MysqlConnection = &pool.get().unwrap();
  
  let mut items = users
    .filter(email.eq(&auth_data.email))
    .load::<User>(conn)?;

  if let Some(user) = items.pop() {
    if let Ok(matching) = verify_password(&auth_data.password, &user.password_hash) {
      if matching {
        return Ok(user.into());
      }
    }
  }
  Err(ServiceError::Unauthorized)
}
