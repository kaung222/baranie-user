import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/signup',
    },
    callbacks: {
        async jwt({ token, account }) {
            // Persist the access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            //@ts-ignore
            session.accessToken = token.accessToken
            return session
        },
    },
    // Use JWT strategy for session handling
    session: {
        strategy: "jwt",
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

