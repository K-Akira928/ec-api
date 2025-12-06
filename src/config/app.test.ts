import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("appConfig", () => {
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
    process.env.APP_ENV = "test";
    process.env.APP_PORT = "3000";
    process.env.APP_URL = "http://localhost:3000";

    const { appConfig } = await import("./app.ts");

    expect(appConfig).toEqual({
      APP_ENV: "test",
      APP_PORT: 3000,
      APP_URL: "http://localhost:3000",
    });
  });

  it("APP_PORTがない場合、デフォルト値3000が使われること", async () => {
    process.env.APP_ENV = "test";
    process.env.APP_PORT = "5000";
    process.env.APP_URL = "http://localhost:3000";
    delete process.env.APP_PORT;

    const { appConfig } = await import("./app.ts");
    expect(appConfig.APP_PORT).toBe(3000);
  });

  it("必須項目が足りない場合、エラーになること", async () => {
    process.env = {};

    // インポート時にエラーが投げられることを期待
    await expect(import("./app.ts")).rejects.toThrow();
  });
});
