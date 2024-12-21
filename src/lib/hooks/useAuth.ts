import { useSession } from "next-auth/react"
import { useEffect } from "react"

export function useAuth() {
    const { data: session, status } = useSession()

    useEffect(() => {
        //@ts-ignore
        if (session?.accessToken) {
            // Store the access token in an HTTP-only cookie
            //@ts-ignore
            document.cookie = `access_token=${session.accessToken}; path=/; secure; HttpOnly; SameSite=Strict`
        }
    }, [session])

    return {
        session,
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
    }
}

