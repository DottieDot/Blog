use crate::schema::*;
use diesel::{Queryable, Insertable};
use serde::{Deserialize, Serialize};

use super::BlogSlim;
use super::UserSlim;

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct Blog {
    pub id: i32,
    pub user_id: i32,
    pub title: String,
    pub summary: String,
    pub tags: String,
    pub file_path: String,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable)]
#[table_name = "blogs"]
pub struct BlogInsertable {
  pub user_id: i32,
  pub title: String,
  pub file_path: String,
}

impl BlogInsertable {
  pub fn from_details<S: Into<String>>(title: S, content: S, user: UserSlim) -> Self {
    BlogInsertable {
      user_id: user.id,
      title: title.into(),
      file_path: content.into(),
    }
  }
}

impl From<Blog> for BlogSlim {
  fn from(blog: Blog) -> Self {
    BlogSlim {
      id: blog.id,
      title: blog.title,
      summary: blog.summary,
      created_at: blog.created_at,
    }
  }
}
