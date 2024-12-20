import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Organization } from "@/types/organization"
import { PagonationMetadata } from "@/types/_metadata"

type ResponseType = {
    records: Organization[];
    _metadata: PagonationMetadata
}

export const useGetAllOrganizations = () => {
    return useQuery<ResponseType>({
        queryKey: ['allOrganizations'],
        queryFn: async () => {
            return await ApiClient.get('/organizations', {
                params: {
                    Search: '',
                    page: '1'
                }
            }).then(res => res.data)
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false
    })
}