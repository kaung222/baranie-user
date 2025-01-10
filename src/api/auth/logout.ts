'use client'
import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export const useLogout = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async () => {
            return await ApiClient.post(`/auth/logout`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Log out success!" });
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            router.push('/login')
        },
    })
}