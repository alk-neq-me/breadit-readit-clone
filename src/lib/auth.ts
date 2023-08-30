import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { nanoid } from 'nanoid';
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({token, session}) {
      if (token) {
        // @ts-ignore
        session.user.id = token.id
        // @ts-ignore
        session.user.name = token.name
        // @ts-ignore
        session.user.email = token.email
        // @ts-ignore
        session.user.image = token.picture
        // @ts-ignore
        session.user.username = token.username
      }
      return session
    },
    async jwt({token, user}) {
      const db_user = await db.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!db_user) {
        token.id = user!.id
        return token
      }

      if (!db_user.username) {
        await db.user.update({
          where: {
            id: db_user.id
          },
          data: {
            username: nanoid(10)
          }
        })
      }

      return {
        id: db_user.id,
        name: db_user.name,
        email: db_user.email,
        username: db_user.username,
      }
    },

    redirect() {
      return "/"
    }
  }
}


export const getAuthSession = () => getServerSession(authOptions)
