import "dotenv/config";
import z from "zod";

const appEnvSchema = z.object({
  APP_ENV: z.enum(["local", "test", "dev", "stg", "prod"]),
  APP_PORT: z.coerce.number().default(3000),
});

export const appConfig = appEnvSchema.parse(process.env);
