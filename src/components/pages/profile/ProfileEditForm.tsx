'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarIcon, Loader2, PencilIcon } from 'lucide-react'
import { User } from '@/types/user'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userUpdateSchema } from 'validation-schema/user-update.schema'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import FormInput from '@/components/common/FormInput'
import FormDate from '@/components/common/FormDate'
import FormSelect from '@/components/common/FormSelect'
import { useUpdateProfile } from '@/api/user/update-profile'
import FormInputFileCrop from '@/components/common/FormInputFileCrop'
import FormInputPhone from '@/components/common/FormInputPhone'



interface ProfileFormProps {
    initialData: User
    handleClose: () => void
}

export function ProfileForm({ initialData, handleClose }: ProfileFormProps) {
    const { mutate, isPending } = useUpdateProfile()
    const form = useForm({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            firstName: initialData.firstName,
            lastName: initialData.lastName,
            phone: initialData.phone || undefined,
            dob: initialData.dob || undefined,
            gender: initialData.gender || undefined,
            profilePicture: initialData.profilePicture || undefined
        }
    });

    const profileImage = form.watch("profilePicture")


    const handleUpdate = (values: z.infer<typeof userUpdateSchema>) => {
        mutate(values, {
            onSuccess(data, variables, context) {
                handleClose()
            },
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    <Image
                                        src={profileImage || '/img/profile-empty.jpg'}
                                        alt="Profile picture"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                                <Label
                                    htmlFor='profile'
                                    className="absolute bottom-0 right-0 rounded-full bg-gray-100 size-8 p-2 "
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </Label>
                            </div>
                        </div>
                        <FormInputFileCrop
                            form={form}
                            name='profilePicture'
                            id='profile'
                            aspectRatio={1 / 1}
                        />

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <FormInput
                                        form={form}
                                        name='firstName'
                                        label='First Name'
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <FormInput
                                        form={form}
                                        label='Last Name'
                                        name='lastName'
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <FormInputPhone
                                    form={form}
                                    name="phone"
                                    label='Phone Number'
                                />
                            </div>

                            <div className="space-y-2">
                                <FormInput
                                    form={form}
                                    name='dob'
                                    label='Date of birth'
                                    type='date'
                                />
                            </div>

                            <div className="space-y-2">
                                <FormSelect
                                    form={form}
                                    name='gender'
                                    label='Gender'
                                    options={[{ name: "Male", value: "male" }, { name: "Female", value: 'female' }, { name: "Other", value: "none" }]}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="submit" variant="brandDefault" >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                changing...
                            </>
                        ) : (
                            'Save change'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

