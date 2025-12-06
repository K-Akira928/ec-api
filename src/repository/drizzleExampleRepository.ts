import { examples } from "../db/schema.ts";
import { DrizzleBaseRepository } from "./drizzleBaseRepository.ts";

type InsertExampleData = typeof examples.$inferInsert;

export class DrizzleExampleRepository extends DrizzleBaseRepository {
  public create = async (example: InsertExampleData, tx?: unknown): Promise<void> => {
    const conn = this.getConn(tx);

    await conn.insert(examples).values(example);
  };
}
