'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { userUpdateSchema } from "validation-schema/user-update.schema"
import { toast } from "@/hooks/use-toast"
import { ErrorResponse } from "@/types/response"

type UserUpdateType = z.infer<typeof userUpdateSchema>

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, UserUpdateType>({
        mutationFn: async (payload: UserUpdateType) => {
            return await ApiClient.patch('/users/profile', payload).then(res => res.data)
        },
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({
                queryKey: ['getProfile'],
                exact: false
            });
            return data
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        },
    })
}