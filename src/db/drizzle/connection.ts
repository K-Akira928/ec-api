import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import { dbConfig } from "../../config/db.ts";
import * as schema from "./schema.ts";

const connection = await createConnection({
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_DATABASE,
  connectionLimit: 3,
  namedPlaceholders: true,
});

export const db = drizzle(connection, { schema, mode: "default" });

export type DrizzleDb = typeof db;

export type DrizzleTx = Parameters<Parameters<DrizzleDb["transaction"]>[0]>[0];

export default db;
