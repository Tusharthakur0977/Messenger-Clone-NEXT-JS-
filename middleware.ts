import { withAuth } from "next-auth/middleware";

// if the user is not authenticated then it will redirect him to sign in  page
export default withAuth({
  pages: {
    signIn: "/",
  },
});

// this array is used to protect the routes which we neeed to be authenticated
export const config = {
  matcher: ["/users/:path*"],
};
