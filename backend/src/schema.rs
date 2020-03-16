table! {
  users (email) {
      email -> Varchar,
      password_hash -> Varchar,
      created_at -> Timestamp,
  }
}

allow_tables_to_appear_in_same_query!(users,);