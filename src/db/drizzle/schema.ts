import { relations } from "drizzle-orm";
import { boolean, mysqlTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

// --- 以下テーブル定義 ---

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

export const exampleMetadata = mysqlTable("example_metadata", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),

  exampleId: varchar("example_id", { length: 36 }).notNull(),

  value: varchar("value", { length: 255 }),

  // 作成日時と更新日時
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// --- 以下リレーション定義 ---

export const examplesRelations = relations(examples, ({ many }) => ({
  metadata: many(exampleMetadata),
}));

export const exampleMetadataRelations = relations(exampleMetadata, ({ one }) => ({
  example: one(examples, {
    fields: [exampleMetadata.exampleId],
    references: [examples.id],
  }),
}));
