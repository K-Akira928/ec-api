import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("dbConfig", () => {
  // 元の環境変数をバックアップ
  const originalEnv = process.env;

  beforeEach(() => {
    // テストごとにモジュールのキャッシュをクリア（再インポートさせるため）
    vi.resetModules();
    // 環境変数をリセット
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("正常な値が設定されている場合、正しくパースされること", async () => {
    // テスト用の環境変数をセット
    process.env.DB_HOST = "localhost";
    process.env.DB_USER = "user";
    process.env.DB_PASSWORD = "pass";
    process.env.DB_DATABASE = "mydb";
    process.env.DB_PORT = "5000";

    const { dbConfig } = await import("./db.ts");

    expect(dbConfig).toEqual({
      DB_HOST: "localhost",
      DB_USER: "user",
      DB_PASSWORD: "pass",
      DB_DATABASE: "mydb",
      DB_PORT: 5000,
    });
  });

  it("DB_PORTがない場合、デフォルト値3306が使われること", async () => {
    process.env.DB_HOST = "localhost";
    process.env.DB_USER = "user";
    process.env.DB_PASSWORD = "pass";
    process.env.DB_DATABASE = "mydb";
    delete process.env.DB_PORT;

    const { dbConfig } = await import("./db.ts");
    expect(dbConfig.DB_PORT).toBe(3306);
  });

  it("必須項目が足りない場合、エラーになること", async () => {
    process.env = {};

    // インポート時にエラーが投げられることを期待
    await expect(import("./db.ts")).rejects.toThrow();
  });
});
