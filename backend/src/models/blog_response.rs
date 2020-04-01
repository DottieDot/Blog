use serde::Serialize;

use super::Blog;

#[derive(Debug, Serialize)]
pub struct BlogResponse  {
  pub id: i32,
  pub title: String,
  pub summary: String,
  pub content: String,
  pub tags: String,
  pub created_at: chrono::NaiveDateTime,
  pub updated_at: chrono::NaiveDateTime,
}

impl From<Blog> for BlogResponse {
  fn from(blog: Blog) -> Self {
    let file = std::fs::read_to_string(format!("content/posts/{}", blog.file_path));
    let content = file.unwrap_or("".to_string());

    BlogResponse {
      id: blog.id,
      title: blog.title,
      summary: blog.summary,
      content: content,
      tags: blog.tags,
      created_at: blog.created_at,
      updated_at: blog.updated_at,
    }
  }
}
