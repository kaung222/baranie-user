import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Organization } from "@/types/organization"
import { OrgSchedule } from "@/types/org-schedule";

type ResponseType = {
    organization: Organization;
    related: any[],
    schedules: OrgSchedule[]
}

export const useGetDetailOrganization = (id: string) => {
    return useQuery<ResponseType>({
        queryKey: ["detailOrganization", id],
        queryFn: async () => {
            return await ApiClient.get(`/organizations/${id}`).then(res => res.data)
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
    })
}