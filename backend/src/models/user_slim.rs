use crate::schema::*;
use diesel::{Queryable, Insertable};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "users"]
pub struct UserSlim {
    pub email: String
}