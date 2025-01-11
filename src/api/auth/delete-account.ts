import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { ErrorResponse } from "@/types/response"

type PayloadType = {
    id: string
}

export const useDeleteAccount = () => {
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.delete(`/users/my-account`).then(res => res.data)
        },
        // onSuccess(data, variables, context) {
        //     return data
        // },
        // onError(error, variables, context) {
        //     toast({ title: error.response?.data.message, variant: "destructive" })
        //     return error
        // },
    })
}