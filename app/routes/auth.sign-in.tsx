import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { useLoaderData } from "@remix-run/react";

import { authSchema, type GetUserByUsernameAuth } from "~/common/authSchema";
import {
  USERNAME_PASSWORD_STRATEGY,
  authenticator,
} from "~/auth/authenticator.server";
import { Input } from "~/components/core/Input";
import { Button } from "~/components/core/Button";

const validator = withZod(authSchema);

export const loader: LoaderFunction = () => {
  const defaultValues: GetUserByUsernameAuth = {
    username: "",
    password: "",
  };
  return json({ defaultValues });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const fieldValues = await validator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);

  return await authenticator.authenticate(USERNAME_PASSWORD_STRATEGY, request, {
    successRedirect: "/platform",
    context: { formData },
  });
};

export default function SigninPage() {
  const { defaultValues } = useLoaderData<typeof loader>();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ValidatedForm
        className="w-96 space-y-4"
        method="POST"
        validator={validator}
        defaultValues={defaultValues}
      >
        <Input name="username" label="Username" placeholder="Your email..." />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Your password..."
        />
        <div className="flex items-center space-x-4">
          <Button type="submit" label="Login" modifier="primary" />
        </div>
      </ValidatedForm>
    </div>
  );
}
