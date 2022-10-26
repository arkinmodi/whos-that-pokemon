const { z } = require("zod");

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  PRISMA_ENABLED: z.string().default("false"),
});

module.exports.envSchema = envSchema;
