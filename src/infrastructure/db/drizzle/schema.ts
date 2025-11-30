import {
  bigint,
  index, // 追加
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex, // 追加
  varchar,
} from "drizzle-orm/mysql-core";

// 顧客テーブル
export const clients = mysqlTable(
  "clients",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    // email で検索を高速化＆重複禁止
    uniqueIndex("clients_email_idx").on(table.email),
  ]
);

// 商品テーブル
export const products = mysqlTable(
  "products",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: int("price").notNull(),
    stock: int("stock").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    // 名前で検索する場合に備えてインデックス作成
    index("products_name_idx").on(table.name),
  ]
);

// 注文テーブル
export const orders = mysqlTable(
  "orders",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    clientId: bigint("client_id", { mode: "number" })
      .notNull()
      .references(() => clients.id),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    totalAmount: int("total_amount").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    // クライアントIDで検索（注文履歴取得など）
    index("orders_client_id_idx").on(table.clientId),
    // ステータスで絞り込み（未発送一覧など）
    index("orders_status_idx").on(table.status),
  ]
);

// 注文明細テーブル
export const orderItems = mysqlTable(
  "order_items",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    orderId: bigint("order_id", { mode: "number" })
      .notNull()
      .references(() => orders.id),
    productId: bigint("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id),
    quantity: int("quantity").notNull(),
    priceAtPurchase: int("price_at_purchase").notNull(),
  },
  (table) => [
    // オーダーIDで紐づく明細を一括取得するため
    index("order_items_order_id_idx").on(table.orderId),
  ]
);
