import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/auth/authenticator.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { role } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/auth/sign-in",
  });

  if (role === "cashier") {
    return redirect("/platform/cashier/home");
  }
  if (role === "customer") {
    return redirect("/platform/customer/home");
  }

  return redirect("/auth/sign-in");
};
