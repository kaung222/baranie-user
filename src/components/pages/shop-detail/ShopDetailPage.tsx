'use client'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ChevronDown, Clock, MapPin, Phone } from 'lucide-react'
import { Gallery } from './components/gallery'
import { OpeningHours } from './components/opening-hours'
import { ServicesList } from './components/services-list'
import { TeamSection } from './components/team-section'
import { ReviewSection } from './components/review-section'
import { AboutSection } from './components/about-section'
import { RelatedBusinesses } from './components/related-business'
import { useGetDetailOrganization } from '@/api/organization/get-detail-organization'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useParams, useRouter } from 'next/navigation'
import LogoWithBrand from '@/components/common/LogoWithBrand'
import { Card } from '@/components/ui/card'
import PageLoading from '@/components/common/PageLoading'
import { Footer } from '../landing/components/footer'
import ProfileDropdown from '@/components/layout/ProfileDropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import Link from 'next/link'
import { useLocalstorage } from '@/lib/helpers'
import { User } from '@/types/user'
import LoginLayout from '@/components/layout/LoginLayout'
import { useGetProfile } from '@/api/user/get-profile'
import { Skeleton } from '@/components/ui/skeleton'

export default function ShopDetails() {
    const { getQuery } = useSetUrlParams()
    const router = useRouter()
    const { shopId } = useParams()
    const { data: organization, isLoading } = useGetDetailOrganization(String(shopId))
    const { data: profile, isLoading: loadingProfile } = useGetProfile()
    const { getData } = useLocalstorage()
    const accessToken = getData('accessToken');
    const user: User | null = getData('user');

    return (
        <div className="min-h-screen bg-background">
            <header className="flex sticky top-0 left-0 z-20 bg-white items-center justify-between py-6 px-3 md:px-10 h-[60px] border-b">
                <div onClick={() => router.push('/')} className=" cursor-pointer">
                    <LogoWithBrand />
                </div>
                {loadingProfile ? (
                    <div className="h-12 p-1 flex rounded-[24px] items-center gap-2 border">
                        {/* Avatar Skeleton */}
                        <Skeleton className="w-10 h-10 rounded-full" />

                        {/* User Name Skeleton */}
                        <Skeleton className="h-4 w-20 rounded-md" />

                        {/* Chevron Skeleton */}
                        <Skeleton className="w-4 h-4 rounded-md" />
                    </div>
                ) : (
                    profile ? (
                        <ProfileDropdown user={profile} />
                    ) : (
                        <LoginLayout />
                    )
                )}
            </header>

            {isLoading ? (
                <PageLoading />
            ) : organization && (
                <main className=" px-3 md:px-10 py-6">
                    <Gallery organization={organization.organization} />

                    <div className=' w-full flex gap '>
                        <div className=' w-[60%] '>
                            <div className="mt-6 space-y-2">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-2xl font-semibold">{organization.organization?.name}</h1>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[...Array(Math.floor(organization.organization.rating))].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-4 h-4 fill-primary"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm font-medium">{organization.organization.rating}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {organization.organization.address}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className=' mt-10 space-y-10'>
                                <ServicesList />
                                <OpeningHours schedules={organization.schedules} />
                                <TeamSection members={organization.members} />
                                {/* <ReviewSection /> */}
                                <AboutSection organization={organization.organization} />
                            </div>

                            {/* <Tabs defaultValue="services" className="mt-8">
                                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                                    <TabsTrigger
                                        value="services"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                                    >
                                        Services
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="about"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                                    >
                                        About
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="services" className="mt-6">
                                    
                                </TabsContent>
                                <TabsContent value="about">
                                </TabsContent>
                            </Tabs> */}
                        </div>
                        <div className=' w-[40%] p-10 '>
                            <div className=' sticky top-20 '>
                                <Card className=' p-5 w-full max-w-[350px] mx-auto shadow-dialog '>
                                    <div className=' flex flex-col gap-[10px] mb-8 '>
                                        <div className=' flex items-center gap-2 text-sm text-gray-600 '>
                                            <Clock className=' w-4 h-4 ' />
                                            <div>9:00 AM to 8:00 PM</div>
                                        </div>
                                        <div className=' flex items-center gap-2 text-sm text-gray-600 '>
                                            <Phone className=' w-4 h-4 ' />
                                            <div>09 123 456 789</div>
                                        </div>
                                        <div className=' flex items-center gap-2  text-sm text-gray-600'>
                                            <MapPin className=' w-4 h-4 ' />
                                            <div>32 Inya Road, Bahan Township, Yangon</div>
                                        </div>
                                    </div>
                                    <Button variant={"brandDefault"} className=' w-full'>
                                        Book now
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </div>

                    <RelatedBusinesses relatedOrgs={organization.related} />
                    <Footer />
                </main>
            )}
        </div>
    )
}

