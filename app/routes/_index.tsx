import { LoaderFunction, type MetaFunction } from "@remix-run/node";
import { authenticator } from "~/auth/authenticator.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Hermex" },
    { name: "description", content: "Welcome to Hermex!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/cashier-home",
    failureRedirect: "/auth/sign-up",
  });
};
