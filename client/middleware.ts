export { default } from "next-auth/middleware";
//export default middleware for authentication

export const config = {
  matcher: ["/admin/:path*"],
};
