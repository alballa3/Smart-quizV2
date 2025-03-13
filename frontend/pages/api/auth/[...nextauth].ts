import { connectionDB } from "@/lib/mongos";
import userModel from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export interface User {
  email: string;
  name: string;
}
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const { email, password } = credentials as unknown as {
          email: string;
          password: string;
        };
        await connectionDB()
        const user = await userModel.findOne({ email: email });

        if (!user || !user.comparePassword(password)) {
          throw new Error("Invalid email or password");
        }

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});
