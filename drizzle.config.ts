import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/drizzle/schema.ts",
  out: "./src/db/drizzle/migration",
  dbCredentials: {
    user: "ec_api",
    password: "cwdeMjdpH9k7Eb6C7wvg",
    host: "db",
    port: 3306,
    database: "ec_api",
  },
});
