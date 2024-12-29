import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Organization } from "@/types/organization"
import { OrgSchedule } from "@/types/org-schedule";
import { MemberForAll } from "@/types/member";
import { Category } from "@/types/category";

type ResponseType = {
    members: MemberForAll[]
    organization: Organization;
    related: Organization[],
    schedules: OrgSchedule[];
    services: Category[]
}

export const useGetDetailOrganizationBySlug = (slug: string) => {
    return useQuery<ResponseType>({
        queryKey: ["detailOrganizationBySlug", slug],
        queryFn: async () => {
            return await ApiClient.get(`/organizations/${slug}`).then(res => res.data)
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
    })
}