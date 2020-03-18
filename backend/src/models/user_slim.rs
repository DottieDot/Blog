use serde::{Deserialize, Serialize};

use super::User;

#[derive(Debug, Serialize, Deserialize)]
pub struct UserSlim {
    pub id: i32,
    pub email: String,
}

impl From<User> for UserSlim {
  fn from(user: User) -> Self {
    UserSlim { 
      id: user.id,
      email: user.email,
    }
  }
}
