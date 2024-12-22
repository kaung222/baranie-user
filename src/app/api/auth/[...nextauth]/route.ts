
import { ApiClient } from "@/api/ApiClient"
import { useGoogleLogin } from "@/api/auth/login-google"
import { User } from "@/types/user"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.access_token) {
                token.accessToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        },
    },
    // Use JWT strategy for session handling
    // session: {
    //     strategy: "jwt",
    // },
    pages: {
        signIn: '/signup',
    },
})

export { handler as GET, handler as POST }


