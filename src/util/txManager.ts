import type { DrizzleDb } from "../db/connection.ts";

export interface TxManager {
  runInTx: <T>(callback: (tx: unknown) => Promise<T>) => Promise<T>;
}

export class DrizzleTxManager implements TxManager {
  private db: DrizzleDb;

  constructor(db: DrizzleDb) {
    this.db = db;
  }

  public runInTx = async <T>(callback: (tx: unknown) => Promise<T>): Promise<T> => {
    return await this.db.transaction(async (tx) => {
      return await callback(tx);
    });
  };
}
