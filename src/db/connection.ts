import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import { type Connection, createConnection } from "mysql2/promise";
import { dbConfig } from "../config/db.ts";
import * as schema from "./schema.ts";

let connection: Connection | null = null;
let dbInstance: (MySql2Database<typeof schema> & { $client: Connection }) | null = null;

export const getConn = async (): Promise<Connection> => {
  if (!connection) {
    connection = await createConnection({
      host: dbConfig.DB_HOST,
      user: dbConfig.DB_USER,
      password: dbConfig.DB_PASSWORD,
      database: dbConfig.DB_DATABASE,
      connectionLimit: 3,
      namedPlaceholders: true,
    });
  }
  return connection;
};

export const closeConn = async (): Promise<void> => {
  if (connection) {
    await connection.end();
    connection = null;
    dbInstance = null;
  }
};

export const getDb = async () => {
  if (!dbInstance) {
    dbInstance = drizzle(await getConn(), { schema, mode: "default" });
  }
  return dbInstance;
};

export type DrizzleDb = Awaited<ReturnType<typeof getDb>>;

export type DrizzleTx = Parameters<Parameters<DrizzleDb["transaction"]>[0]>[0];
