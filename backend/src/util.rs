use bcrypt;

lazy_static::lazy_static! {
  pub static ref SECRET_KEY: String = std::env::var("SECRET_KEY").unwrap_or_else(|_| "0123".repeat(8));
}

// Cost of 14 should be good, PHP's default is 10
pub fn hash_password(password: &str) -> bcrypt::BcryptResult<String> {
  bcrypt::hash(password, 14)
}

pub fn verify_password(password: &str, hash: &str) -> bcrypt::BcryptResult<bool> {
  bcrypt::verify(password, hash)
}
