import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        email: { label: "e-mail", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await mongooseConnect();

        if (!credentials?.password || !credentials.email) {
          throw new Error("Missing fields!");
        }

        const user = await User.find({ email: credentials.email });

        if (!user[0]) {
          throw new Error("User not found!");
        }

        if (user && !user[0].password) {
          throw new Error("Sign in with different account!(google/github)");
        }

        const valid = await bcrypt.compare(
          credentials.password,
          user[0].password
        );

        if (!valid) {
          throw new Error("Incorrect password!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return { ...user[0], ...token };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session && token._doc) {
        session.user = {
          name: token._doc.name || "",
          email: token._doc.email || "",
          image: token._doc.image || "",
          id: token._doc._id,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
