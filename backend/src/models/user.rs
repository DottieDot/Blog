use crate::schema::*;
use diesel::{Queryable, Insertable};
use serde::{Deserialize, Serialize};

use super::UserSlim;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "users"]
pub struct User {
    pub email: String,
    pub password_hash: String,
    pub created_at: chrono::NaiveDateTime,
}

impl From<User> for UserSlim {
  fn from(user: User) -> Self {
    UserSlim { email: user.email }
  }
}
