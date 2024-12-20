import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Category } from "@/types/category"

export const useGetOrganizationServices = (id: string) => {
    return useQuery<Category[]>({
        queryKey: ['organizationServices'],
        queryFn: async () => {
            return await ApiClient.get(`/organizations/${id}/categories`).then(res => res.data)
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false
    })
}