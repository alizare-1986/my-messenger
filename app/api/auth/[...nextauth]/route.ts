import NextAuth from "next-auth/next";
import authOptions from "./options";

const authOption= authOptions

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
