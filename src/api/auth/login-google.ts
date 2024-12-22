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

type PayloadType = {
    token: string
}

type LoginResponseType = {
    message: string;
    accessToken: string;
    user: any;
}


export const useGoogleLogin = () => {
    const { setData } = useLocalstorage()
    return useMutation<LoginResponseType, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/auth/google-login', payload).then(res => res.data);
        },
        onSuccess(data, variables, context) {
            toast({ title: "Google Login successful!" });
            setData("accessToken", data.accessToken);
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error

        },
    })
}