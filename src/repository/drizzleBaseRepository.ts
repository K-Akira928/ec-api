import type { DrizzleDb, DrizzleTx } from "../db/connection.ts";

export class DrizzleBaseRepository {
  private db: DrizzleDb;

  constructor(db: DrizzleDb) {
    this.db = db;
  }

  public getConn = (tx: unknown): DrizzleDb | DrizzleTx => {
    return (tx as DrizzleTx) ?? this.db;
  };
}
