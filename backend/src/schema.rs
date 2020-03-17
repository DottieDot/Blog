table! {
  users {
      id -> Integer,
      email -> Varchar,
      password_hash -> Varchar,
      created_at -> Timestamp,
  }
}

table! {
  blogs {
    id -> Integer,
    user_id -> Integer,
    title -> Varchar,
    file_path -> Varchar,
    created_at -> Timestamp,
    updated_at -> Timestamp,
  }
}

allow_tables_to_appear_in_same_query!(users,);