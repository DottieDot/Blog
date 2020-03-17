use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct BlogSlim {
    pub id: i32,
    pub title: String,
    pub created_at: chrono::NaiveDateTime,
}
