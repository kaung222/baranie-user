import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Category } from "@/types/category"
import { MemberForAll } from "@/types/member"

export const useGetOrganizationMembers = (id: string) => {
    return useQuery<MemberForAll[]>({
        queryKey: ['organizationMembers'],
        queryFn: async () => {
            return await ApiClient.get(`/organizations/${id}/team`).then(res => res.data)
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false
    })
}