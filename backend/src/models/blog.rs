use crate::schema::*;
use diesel::{Queryable, Insertable};
use serde::{Deserialize, Serialize};

use super::BlogSlim;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "blogs"]
pub struct Blog {
    pub id: i32,
    pub user_id: i32,
    pub title: String,
    pub file_path: String,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

impl From<Blog> for BlogSlim {
  fn from(blog: Blog) -> Self {
    BlogSlim {
      id: blog.id,
      title: blog.title,
      created_at: blog.created_at,
    }
  }
}
