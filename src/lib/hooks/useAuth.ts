import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import { Session } from "next-auth"
import { ApiClient } from "@/api/ApiClient"
import { User } from "@/types/user"
import { useRouter } from "next/navigation"

export function useAuth() {
    const { data: session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (session?.accessToken) {
            document.cookie = `access_token=${session.accessToken}; path=/; secure; HttpOnly; SameSite=Strict`
            fetchCustomToken(session.accessToken)

        }
    }, [session])
    async function fetchCustomToken(googleToken: string) {
        try {
            const response = await ApiClient.post<{ accessToken: string, user: User }>(`/auth/google-login`, { token: googleToken })
            if (response.data) {
                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
                localStorage.setItem("user", JSON.stringify(response.data.user))
                router.push('/')
            } else {
                console.error('Failed to fetch custom token');
            }
        } catch (error) {
            console.error('Error fetching custom token:', error);
        }
    }

    const login = () => signIn('google')
    const logout = () => {
        signOut()
        localStorage.removeItem('accessToken')
    }


    return {
        session: session as Session & { accessToken?: string },
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
        login,
        logout
    }
}

