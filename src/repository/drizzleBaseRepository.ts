import { DrizzleQueryError } from "drizzle-orm";
import type { DrizzleDb, DrizzleTx } from "../db/connection.ts";

export class DrizzleBaseRepository {
  private db: DrizzleDb;

  constructor(db: DrizzleDb) {
    this.db = db;
  }

  protected getConn = (tx: unknown): DrizzleDb | DrizzleTx => {
    return (tx as DrizzleTx) ?? this.db;
  };

  protected isDuplicateEntryError = (error: unknown): error is DrizzleQueryError => {
    if (!(error instanceof DrizzleQueryError)) {
      return false;
    }

    if (!error.cause || typeof error.cause !== "object") {
      return false;
    }

    if ("errno" in error.cause && error.cause.errno === 1062) {
      return true;
    }

    if ("code" in error.cause && error.cause.code === "ER_DUP_ENTRY") {
      return true;
    }

    return false;
  };
}
