import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { Session } from "next-auth"

export function useAuth() {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session?.accessToken) {
            document.cookie = `access_token=${session.accessToken}; path=/; secure; HttpOnly; SameSite=Strict`
        }
    }, [session])

    return {
        session: session as Session & { accessToken?: string },
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
    }
}

