use diesel::{r2d2::ConnectionManager, MysqlConnection};

mod user;
mod user_slim;

pub type Pool = r2d2::Pool<ConnectionManager<MysqlConnection>>;

pub type User = user::User;
pub type UserSlim = user_slim::UserSlim;