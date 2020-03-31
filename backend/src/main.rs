#[macro_use]
extern crate diesel;

use actix_web::{web, App, HttpServer, middleware, HttpResponse};
use listenfd::ListenFd;
use actix_identity::{CookieIdentityPolicy, IdentityService};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use actix_cors::Cors;

mod controllers;
mod models;
mod errors;
mod schema;
mod util;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
  dotenv::dotenv().ok();
  std::env::set_var(
    "RUST_LOG",
    "simple-auth-server=debug,actix_web=info,actix_server=info",
  );
  env_logger::init();

  let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL");

  let manager = ConnectionManager::<MysqlConnection>::new(database_url);
  let pool: models::Pool = r2d2::Pool::builder()
      .build(manager)
      .expect("Failed to create pool.");
  let domain: String = std::env::var("DOMAIN").unwrap_or_else(|_| "localhost".to_string());

  println!("{}", std::env::var("CLIENT_ORIGIN").expect("CLIENT_ORIGIN"));

  let mut listenfd = ListenFd::from_env();
  let mut server = HttpServer::new(move || {
    App::new()
    .data(pool.clone())
    .wrap(
      Cors::new()
        .allowed_origin(std::env::var("CLIENT_ORIGIN").expect("CLIENT_ORIGIN").as_str())
        .finish(),
    )
    .wrap(middleware::Logger::default())
    .wrap(IdentityService::new(
      CookieIdentityPolicy::new(util::SECRET_KEY.as_bytes())
        .name("auth")
        .path("/")
        .domain(domain.as_str())
        .max_age_time(chrono::Duration::days(1))
        .secure(false),
    ))
    .service(
      web::resource("index.html")
        .route(web::get()).to(|| { HttpResponse::Ok().finish() }),
    )
    .service(
      web::scope("/api/v1")
        .service(
          web::resource("/auth")
            .route(web::post().to(controllers::auth_controller::login))
            .route(web::get().to(controllers::auth_controller::check_login))
            .route(web::delete().to(controllers::auth_controller::logout)),
        )
        .service(
          web::resource("/posts")
            .route(web::post().to(controllers::blog_controller::create_post))
            // .route(web::delete().to())
            .route(web::get().to(controllers::blog_controller::get_posts)),
        )
        .service(
          web::resource("/posts/{post_id}")
            .route(web::get().to(controllers::blog_controller::get_post)),
        ),
    )
  });

  server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
    server.listen(l)?
  } else {
    server.bind("127.0.0.1:8080")?
  };

  server.run().await
}
