export { auth as middleware } from "./auth-middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
