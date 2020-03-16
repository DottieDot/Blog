use actix_identity::Identity;
use actix_web::{
  error::BlockingError, web,
  HttpResponse,
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

#[derive(Debug, Deserialize)]
pub struct AuthData {
  pub email: String,
  pub password: String,
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
