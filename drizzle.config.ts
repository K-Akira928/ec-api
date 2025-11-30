import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/infrastructure/db/drizzle/schema.ts",
  out: "./src/infrastructure/db/drizzle",
  dbCredentials: {
    user: "ec_api",
    password: "cwdeMjdpH9k7Eb6C7wvg",
    host: "db",
    port: 3306,
    database: "ec_api",
  },
});
