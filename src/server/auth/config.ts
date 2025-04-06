import { db } from "@/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema/index";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
// Define the schema for credentials validation
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    DiscordProvider,
    Google,
    ...(process.env.VERCEL_ENV === "production"
      ? []
      : [
          Credentials({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              // Validate credentials
              const parsedCredentials =
                credentialsSchema.safeParse(credentials);

              if (!parsedCredentials.success) {
                return null;
              }

              const { email, password } = parsedCredentials.data;

              // Find user by email
              const [user] = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1);

              if (!user?.password) {
                return null;
              }

              // Verify password
              const passwordMatch = password === user.password;

              if (!passwordMatch) {
                return null;
              }

              return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
              };
            },
          }),
        ]),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  // if  VERCEL_ENV is production, use the following cookies
  cookies:
    process.env.VERCEL_ENV === "preview"
      ? {
          sessionToken: {
            name: "__Secure-next-auth.session-token",
            options: {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              domain: ".aishareshare.com",
              secure: true,
            },
          },
        }
      : {},
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  jwt: {
    async encode({ token }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return token?.sessionId as unknown as string;
    },
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    jwt: async ({ account, token, user }) => {
      if (account?.provider === "credentials") {
        const sessionToken = uuidv4();
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);

        const session = await DrizzleAdapter(db, {
          usersTable: users,
          accountsTable: accounts,
          sessionsTable: sessions,
          verificationTokensTable: verificationTokens,
        }).createSession?.({
          userId: user.id!,
          sessionToken,
          expires,
        });
        token.sessionId = session?.sessionToken;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;
