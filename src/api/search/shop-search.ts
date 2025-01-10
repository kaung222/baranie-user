'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { Organization } from "@/types/organization"
import { useQueryString } from "@/lib/hooks/useQueryString"

export const useSearchShops = () => {
    const { getQuery } = useSetUrlParams()
    const lat = getQuery('lat');
    const long = getQuery('long')
    const search = getQuery('search')
    const type = getQuery('type') && getQuery('type') == 'All' ? '' : getQuery('type');
    const params = useQueryString({ search, types: type, lat, long });
    return useQuery<Organization[]>({
        queryKey: ['searchShops', lat, long, search, type],
        queryFn: async () => {
            return await ApiClient.get('/search/organizations', {
                params: params
            }).then(res => res.data)
        }
    })
}