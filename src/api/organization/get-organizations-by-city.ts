import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Organization } from "@/types/organization"

export const useGetOrganizationByCity = (city: string) => {
    return useQuery<Organization[]>({
        queryKey: ['getOrganizationByCity'],
        queryFn: async () => {
            return await ApiClient.get(`/organizations/in/${city}`).then(res => res.data)
        }
    })
}