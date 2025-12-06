import { defineConfig } from "drizzle-kit";
import { dbConfig } from "./src/config/db.ts";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migration",
  dbCredentials: {
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    database: dbConfig.DB_DATABASE,
  },
});
