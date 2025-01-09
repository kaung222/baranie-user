'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { Organization } from "@/types/organization"

export const useSearchShops = () => {
    const { getQuery } = useSetUrlParams()
    const lat = getQuery('lat') || '';
    const long = getQuery('long')
    const search = getQuery('search')
    const type = getQuery('type') && getQuery('type') == 'All' ? '' : getQuery('type');
    return useQuery<Organization[]>({
        queryKey: ['searchShops', lat, long, search, type],
        queryFn: async () => {
            return await ApiClient.get('/search/organizations', {
                params: {
                    search,
                    types: type,
                    lat,
                    long
                }
            }).then(res => res.data)
        }
    })
}