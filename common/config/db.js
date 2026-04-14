import pg from "pg";

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true }
});

// export const pool = new pg.Pool({
//   host: "localhost",
//   port: 5433,
//   user: "postgres",
//   password: "postgres",
//   database: "sql_class_2_db",
//   max: 20,
//   connectionTimeoutMillis: 0,
//   idleTimeoutMillis: 0,
// });