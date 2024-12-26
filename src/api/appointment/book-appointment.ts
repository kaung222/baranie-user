import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { BookingSchema } from "validation-schema/appointment.schema"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/hooks/use-toast"

type BookingType = z.infer<typeof BookingSchema>

export const useBookAppointment = () => {
    return useMutation<any, ErrorResponse, BookingType>({
        mutationFn: async (payload: BookingType) => {
            return await ApiClient.post('/appointments', payload).then(res => res.data);
        },
        onSuccess(data, variables, context) {
            toast({ title: "Your appointment book successfully!" })
            return data
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        },
    })
}