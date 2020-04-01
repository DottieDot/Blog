use actix_web::{
  error::BlockingError, web,
  HttpResponse,
};
use diesel::prelude::*;
use diesel::MysqlConnection;
use serde::Deserialize;
use std::fs::File;
use std::io::{Write, BufReader, BufRead, Error};
use rand::Rng;

use crate::models::{
  Pool,
  Blog,
  BlogSlim,
  BlogResponse,
  BlogInsertable,
  UserSlim,
};
use crate::errors::ServiceError;
use super::auth_controller::{
  LoggedUser
};

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

#[derive(Debug, Deserialize)]
pub struct BlogRequest {
  pub title: String,
  pub tags: String,
  pub summary: String,
  pub content: String
}

fn save_content(content: String) -> Result<String, std::io::Error> {
  let mut file_name = rand::thread_rng()
    .gen_ascii_chars()
    .take(10)
    .collect::<String>();

  file_name.push_str(".md");

  let mut file = File::create(format!("content/posts/{}", file_name.clone()))?;
  write!(file, "{}", content)?;

  Ok(file_name)
}

pub async fn create_post(
  data: web::Json<BlogRequest>,
  user: LoggedUser,
  pool: web::Data<Pool>
) -> Result<HttpResponse, ServiceError> {
  let file = save_content(data.content.clone())?;

  let blog = BlogInsertable::from_details(data.title.clone(), data.summary.clone(), data.tags.clone(), file, user);

  let res = web::block(move || create_blog(blog, pool)).await;

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

fn create_blog(
  details: BlogInsertable,
  pool: web::Data<Pool>
) -> Result<BlogSlim, ServiceError> {
  use crate::schema::blogs::dsl::{blogs, id};

  let conn: &MysqlConnection = &pool.get().unwrap();

  let success = diesel::insert_into(blogs)
    .values(&details)
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
