'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from 'validation-schema/login.schema'
import { z } from 'zod'
import { useLogin } from '@/api/auth/login'
import { useRouter } from 'next/navigation'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { useApiGoogleLogin } from '@/api/auth/login-google'

export function QuickLogin() {
    const { mutate, isPending } = useLogin();
    const { mutate: googleMutate } = useApiGoogleLogin()
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
        mutate(values, {
            onSuccess() {
                window.location.reload()
            }
        })
    }

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <FormInput
                                form={form}
                                name='email'
                                placeholder='Email'
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <FormInput
                                form={form}
                                name='password'
                                placeholder='Password'
                                type='password'
                            />
                        </div>
                        <Button disabled={isPending} type="submit" className="w-full h-12 bg-pink-500 hover:bg-pink-600">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        or
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        if (credentialResponse.credential) {
                            googleMutate({ token: credentialResponse.credential }, {
                                onSuccess() {
                                    window.location.reload()
                                }
                            })
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    )
}

