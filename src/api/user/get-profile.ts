import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { User } from "@/types/user"

export const useGetProfile = () => {
    return useQuery<User>({
        queryKey: ['getProfile'],
        queryFn: async () => {
            return await ApiClient.get('/users/info/profile').then(res => res.data)
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false
    })
}