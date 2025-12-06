import { examples } from "../db/schema.ts";
import { DuplicateEntryError } from "../error/duplicateEntryError.ts";
import { DrizzleBaseRepository } from "./drizzleBaseRepository.ts";

export interface ExampleRepository {
  create: (example: InsertExampleData, tx?: unknown) => Promise<void>;
}

type InsertExampleData = typeof examples.$inferInsert;

export class DrizzleExampleRepository extends DrizzleBaseRepository {
  public create = async (example: InsertExampleData, tx?: unknown): Promise<void> => {
    const conn = this.getConn(tx);

    try {
      await conn.insert(examples).values(example);
    } catch (error) {
      if (this.isDuplicateEntryError(error)) {
        throw new DuplicateEntryError(error.message);
      }
      throw error;
    }
  };
}
