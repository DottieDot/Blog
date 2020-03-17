use actix_web::{
  error::BlockingError, web,
  HttpResponse,
};
use diesel::prelude::*;
use diesel::MysqlConnection;

use crate::models::{
  Pool,
  Blog,
  BlogSlim,
};
use crate::errors::ServiceError;

pub async fn get_posts(
  pool: web::Data<Pool>
) -> Result<HttpResponse, ServiceError> {
  let res = web::block(move || query_blogs(pool)).await;

  match res {
    Ok(posts) => {
      Ok(HttpResponse::Ok().json(posts))
    }
    Err(err) => match err {
      BlockingError::Error(service_error) => Err(service_error),
      BlockingError::Canceled => Err(ServiceError::InternalServerError)
    },
  }
}

fn query_blogs(pool: web::Data<Pool>) -> Result<Vec<BlogSlim>, ServiceError> {
  use crate::schema::blogs::dsl::{blogs};

  let conn: &MysqlConnection = &pool.get().unwrap();

  let items = blogs
    .load::<Blog>(conn);

  match items {
    Ok(posts) => Ok(posts.into_iter().map(Blog::into).collect::<Vec<BlogSlim>>()),
    Err(_error) => Err(ServiceError::InternalServerError),
  }
}
