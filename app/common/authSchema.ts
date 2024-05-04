import { z } from "zod";

const RoleSchema = z.union([
  z.literal("admin"),
  z.literal("cashier"),
  z.literal("customer"),
]);
export type Role = z.infer<typeof RoleSchema>;

export const authSchema = z.object({
  username: z
    .string()
    .min(3, "Must contain at least 3 chars")
    .max(24, "Must contain 24 chars max"),
  password: z
    .string()
    .min(6, "Must contain at least 6 chars")
    .max(12, "Must contain 12 chars max"),
  role: RoleSchema,
});

export type RegisterAccountAuth = z.infer<typeof authSchema>;

export const authSchemaWithoutRole = authSchema.omit({ role: true });

export type GetUserByUsernameAuth = z.infer<typeof authSchemaWithoutRole>;
