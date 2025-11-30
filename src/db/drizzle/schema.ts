import { boolean, mysqlTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const examples = mysqlTable(
  "examples",
  {
    // 自動採番(UUID)のプライマリキー
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),

    // 名前
    name: varchar("name", { length: 100 }).notNull(),

    // ニックネームはnullを許容
    nickname: varchar("nickname", { length: 100 }),

    // 活性フラグはデフォルトでtrue
    isActive: boolean("is_active").default(true).notNull(),

    // 作成日時と更新日時
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    // 名前にインデックスを貼る
    uniqueIndex("example_name_idx").on(table.name),
  ]
);
