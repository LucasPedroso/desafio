import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    role: string;
  }

  interface NextAuthRequest extends NextRequest {
    auth: Session | null;
  }
}
