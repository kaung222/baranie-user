import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
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
        async session({ session, token, user }) {
            // You can add custom session logic here
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // You can add custom token logic here
            return token
        },
    },
})

export { handler as GET, handler as POST }

