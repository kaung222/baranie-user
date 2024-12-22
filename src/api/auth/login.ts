'use client'
import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { RegisterSchema } from "validation-schema/register.schema"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/hooks/use-toast"
import { LoginSchema } from "validation-schema/login.schema"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { useLocalstorage } from "@/lib/helpers"

type PayloadType = z.infer<typeof LoginSchema>

type LoginResponseType = {
    message: string;
    accessToken: string;
    user: any;
}


export const useLogin = () => {
    const { setData } = useLocalstorage()
    return useMutation<LoginResponseType, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/auth/user-login', payload).then(res => res.data);
        },
        onSuccess(data, variables, context) {
            toast({ title: "Login successful!" });
            setData("accessToken", data.accessToken);
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error

        },
    })
}