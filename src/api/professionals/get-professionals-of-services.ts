import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { MemberForAll } from "@/types/member"

export const useGetProfessionalOfServices = (serviceIds: string[]) => {
    return useQuery<MemberForAll[]>({
        queryKey: ['getMembersOfServices', serviceIds],
        queryFn: async () => {
            return await ApiClient.get(`/members/of/services`, {
                params: {
                    serviceIds: serviceIds
                }
            }).then(res => res.data)
        }
    })
}