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
  BlogResponse,
  BlogInsertable,
  UserSlim,
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

pub async fn get_post(
  info: web::Path<(i32,)>,
  pool: web::Data<Pool>
) -> Result<HttpResponse, ServiceError> {
  let res = web::block(move || query(info.0, pool)).await;

  match res {
    Ok(post) => {
      Ok(HttpResponse::Ok().json(post))
    }
    Err(err) => match err {
      BlockingError::Error(service_error) => Err(service_error),
      BlockingError::Canceled => Err(ServiceError::InternalServerError)
    },
  }
}

pub async fn create_post(
  pool: web::Data<Pool>
) -> Result<HttpResponse, ServiceError> {
  let res = web::block(move || create_blog(pool)).await;

  match res {
    Ok(post) => {
      Ok(HttpResponse::Ok().json(post))
    }
    Err(err) => match err {
      BlockingError::Error(service_error) => Err(service_error),
      BlockingError::Canceled => Err(ServiceError::InternalServerError)
    },
  }
}

fn create_blog(pool: web::Data<Pool>) -> Result<BlogSlim, ServiceError> {
  use crate::schema::blogs::dsl::{blogs, id};

  let conn: &MysqlConnection = &pool.get().unwrap();

  let blog = BlogInsertable::from_details("Test", "Test", UserSlim { id: 1, email: "user@example.com".to_string() });
  let success = diesel::insert_into(blogs)
    .values(&blog)
    .execute(conn);

  match success {
    Ok(_) => {
      Ok(blogs.order(id.desc()).first::<Blog>(conn).unwrap().into())
    },
    Err(_error) => Err(ServiceError::Conflict),
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

fn query(post_id: i32, pool: web::Data<Pool>) -> Result<BlogResponse, ServiceError> {
  use crate::schema::blogs::dsl::{blogs, id};

  let conn: &MysqlConnection = &pool.get().unwrap();

  let mut items = blogs
    .filter(id.eq(&post_id))
    .load::<Blog>(conn)?;

  if let Some(post) = items.pop() {
    return Ok(post.into());
  }
  Err(ServiceError::NotFound)
}
