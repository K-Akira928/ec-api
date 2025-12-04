import type { DrizzleDb, DrizzleTx } from "../config/db.ts";

export class DrizzleBaseRepository {
  private db: DrizzleDb;

  constructor(db: DrizzleDb) {
    this.db = db;
  }

  public getConn = (tx: unknown): DrizzleDb | DrizzleTx => {
    return (tx as DrizzleTx) ?? this.db;
  };
}
