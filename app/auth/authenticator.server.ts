import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { sessionStorage } from "~/auth/storage.server";
import { Role } from "~/common/authSchema";
import { getAccountByUserName } from "~/domain/account.server";

interface User {
  userId: number;
  username: string;
  role: Role;
}

export const USERNAME_PASSWORD_STRATEGY = "username-password-strategy";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ context }) => {
    if (!context?.formData) {
      throw new Error("FormData must be provided in the Context");
    }

    const formData = context.formData as FormData;

    const _username = formData.get("username");
    const password = formData.get("password");

    const result = await getAccountByUserName({ _username, password });

    if (!result.success) {
      throw new Error("Failed to authenticate user");
    }

    const { username, id, role } = result.data;
    const castedRole = role as Role;

    return { username, userId: id, role: castedRole };
  }),
  USERNAME_PASSWORD_STRATEGY
);
