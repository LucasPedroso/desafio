import { SignInError } from "@auth/core/errors";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { ZodError } from "zod";
import { db } from "./lib/db";
import { signInSchema } from "./lib/zod";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Digite seu email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials,
          );

          const user: User | null = await db.user.findUnique({
            where: { email, password },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              image: true,
            },
          });

          if (!user) {
            throw new SignInError("User not found.");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          if (error instanceof SignInError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token, newSession, user, trigger }) {
      if (token) session.user.role = token.role;
      return session;
    },
    signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
