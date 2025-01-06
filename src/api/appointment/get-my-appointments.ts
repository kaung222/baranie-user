import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { PagonationMetadata } from "@/types/_metadata"
import { AppointmentForAll } from "@/types/appointment";

type ResponseType = {
    _metadata: PagonationMetadata;
    records: AppointmentForAll[]
}

export const useGetMyAppointments = () => {
    return useQuery<ResponseType>({
        queryKey: ['myAppointments'],
        queryFn: async () => {
            return await ApiClient.get('/users/my/appointments').then(res => res.data)
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false
    })
}