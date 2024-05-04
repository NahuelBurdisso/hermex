import { InputError, makeDomainFunction } from "domain-functions";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { hash, verify } from "argon2";

import { authSchema, authSchemaWithoutRole } from "~/common/authSchema";
import { db } from "~/db/config.server";
import { users } from "~/db/schema.server";

export const createAccount = makeDomainFunction(authSchema)(async (data) => {
  const result = db
    .select()
    .from(users)
    .where(eq(users.username, data.username))
    .get();

  if (result) {
    throw new InputError("Username already taken", "username");
  }

  const { password, ...rest } = data;

  const hashedPassword = await hash(password);

  const newUser: InferInsertModel<typeof users> = {
    ...rest,
    password: hashedPassword,
    createdAt: new Date(),
  };

  const record = db.insert(users).values(newUser).returning().get();

  if (!record || !record.id) {
    throw new Error("Unable to register a new user");
  }

  return record;
});

export const getAccountByUserName = makeDomainFunction(authSchemaWithoutRole)(
  async (data) => {
    const result = db
      .select()
      .from(users)
      .where(eq(users.username, data.username))
      .get();

    if (!result || !result.username) {
      throw new InputError("User does not exist", "username");
    }

    const isValidPassword = await verify(result.password, data.password);

    if (!isValidPassword) {
      throw new InputError("Password is not valid", "password");
    }

    return result;
  }
);
