import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      userid?: number;
    } & DefaultSession["user"]
  }
  interface User {
    username?: string;
    userid?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    userid?: number;
  }
}