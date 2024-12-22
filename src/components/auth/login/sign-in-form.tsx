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

export function SignInForm() {
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
                router.push('/');
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
                {/* <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={() => handleGoogleLogin()}
                >
                    <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                    >
                        <path
                            fill="#4285f4"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        />
                    </svg>
                    Continue with Google
                </Button> */}
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        if (credentialResponse.credential) {
                            googleMutate({ token: credentialResponse.credential })
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

