import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("studiospace");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      const password = String(ctx.body?.password ?? "");
      if (!/[A-Z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must have an uppercase letter.",
        });
      }
      if (!/[a-z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must have a lowercase letter.",
        });
      }
    }),
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: "7d",
      },
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
