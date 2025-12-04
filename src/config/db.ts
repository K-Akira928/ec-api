import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";
import z from "zod";
import * as schema from "../db/drizzle/schema.ts";

const dbEnvSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  DB_PORT: z.coerce.number().default(3306),
});

export const dbConfig = dbEnvSchema.parse(process.env);

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
