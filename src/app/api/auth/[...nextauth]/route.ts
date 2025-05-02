import { connectDB } from "@/lib/mongodb";
import credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/user";

const handler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
          await connectDB();
          const user = await User.findOne({
              email: credentials?.email,
          }).select("+password");

          if (!user) throw new Error("Email not registered");

          const passwordMatch = await bcrypt.compare(
              credentials!.password,
              user.password
          );

          if (!passwordMatch) throw new Error("Wrong Password");
          return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks:{
    jwt: async ({ token, user }) =>{

      if (user) {
        token.uid = user;
      }

      return token
    },
    session: async ({ session, token }) => {
        const { email, fullname, name } = token.uid as { email: string, fullname: string, name: string }
        const userSession = { ...session, user: {
          fullname: fullname || name,
          email: email,
        }}

      return userSession;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login"
  }
}
);
export { handler as GET, handler as POST };