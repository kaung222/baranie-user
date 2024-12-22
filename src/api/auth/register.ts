import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { RegisterSchema } from "validation-schema/register.schema"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/hooks/use-toast"

type PayloadType = z.infer<typeof RegisterSchema>

export const useRegister = () => {
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/auth/user-register', payload).then(res => res.data);
        },
        onSuccess(data, variables, context) {
            toast({ title: "Register successful!" });
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error

        },
    })
}