'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PencilIcon, Mail, Phone, Cake, User2 } from 'lucide-react'
import { ProfileForm } from './ProfileEditForm'
import { useGetProfile } from '@/api/user/get-profile'
import PageLoading from '@/components/common/PageLoading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'




export function ProfileShowcase() {
    const [isEditing, setIsEditing] = useState(false);
    const { data: user, isLoading } = useGetProfile();

    if (isEditing) {
        return (
            <div className="relative">
                <Button
                    variant="brandOutline"
                    className="absolute right-0 -top-14"
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </Button>
                {isLoading ? (
                    <PageLoading />
                ) : user && (
                    <ProfileForm
                        initialData={user}
                        handleClose={() => setIsEditing(false)}
                    />
                )}
            </div>
        )
    }

    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : user && (
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full overflow-hidden">
                                            <Avatar className=' w-full h-full '>
                                                <AvatarImage src={user.profilePicture} alt={shortName(user.firstName)} className=' object-cover ' />
                                                <AvatarFallback className=" ">{shortName(user.firstName)}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                                        <Badge variant="secondary">{user.gender}</Badge>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-5 w-5" />
                                    <h3 className="font-medium">Email Address</h3>
                                </div>
                                <p className="text-sm">{user.email}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-5 w-5" />
                                    <h3 className="font-medium">Phone Number</h3>
                                </div>
                                <p className="text-sm">{user.phone || 'Not provided'}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Cake className="h-5 w-5" />
                                    <h3 className="font-medium">Date of Birth</h3>
                                </div>
                                <p className="text-sm">{user.dob || 'Not provided'}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User2 className="h-5 w-5" />
                                    <h3 className="font-medium">Gender</h3>
                                </div>
                                <p className="text-sm">{user.gender}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </>
    )
}

