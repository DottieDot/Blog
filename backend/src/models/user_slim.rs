use crate::schema::*;
use diesel::{Queryable, Insertable};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserSlim {
    pub email: String
}
