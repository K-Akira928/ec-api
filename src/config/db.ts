import "dotenv/config";
import z from "zod";

const dbEnvSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  DB_PORT: z.coerce.number().default(3306),
});

export const dbConfig = dbEnvSchema.parse(process.env);
