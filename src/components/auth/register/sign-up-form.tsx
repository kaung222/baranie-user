'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/common/FormInput'
import { RegisterSchema } from 'validation-schema/register.schema'
import { z } from 'zod'
import { useRegister } from '@/api/auth/register'

export function SignUpForm() {
    const { mutate } = useRegister()
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });


    const handleRegister = async (values: z.infer<typeof RegisterSchema>) => {
        console.log(values)
        mutate(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <FormInput
                            form={form}
                            name='firstName'
                            label='First name'
                            placeholder='Enter your first name'
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <FormInput
                            form={form}
                            name='lastName'
                            label='Last name'
                            placeholder='Enter your last name'
                        />
                    </div>
                    <div>
                        <FormInput
                            form={form}
                            name='email'
                            label='Email'
                            placeholder='Enter your email'
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <FormInput
                            form={form}
                            name='password'
                            label='Password'
                            placeholder='Enter your password'
                            type='password'
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <FormInput
                            form={form}
                            name='confirmPassword'
                            label='Confirm password'
                            placeholder='Enter your password'
                            type='password'
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <FormInput
                            form={form}
                            name='phone'
                            label='Mobile number'
                            type='tel'
                            placeholder='Enter your mobile number'
                        />
                    </div>

                    {/* <div className="flex items-start space-x-2">
                    <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                    />
                    <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to the{' '}
                        <Link href="/privacy-policy" className="text-primary hover:underline">
                            Privacy policy
                        </Link>
                        ,{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/business-terms" className="text-primary hover:underline">
                            Terms of Business
                        </Link>
                    </Label>
                </div> */}
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 bg-pink-500 hover:bg-pink-600"
                >
                    Create account
                </Button>
            </form>
        </Form>
    )
}

