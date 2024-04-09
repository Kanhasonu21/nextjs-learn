import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDV from '../../../libs/mongoose';
import NextAuth from "next-auth/next";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await connectMongoDV()
        try {
          const { email, password } = credentials;
          const payload = {
            email,
            password
          }
          const PortalURI = process.env.NEXT_PUBLIC_PORTAL_URI;
          const loginInfo = await fetch(`${PortalURI}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify(payload),
          })
          const { data: { token } } = await loginInfo.json()
          return { token }
        } catch (err) {
          throw new Error(err)
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
