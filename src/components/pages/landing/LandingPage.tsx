'use client'
import Image from 'next/image'
import { Search } from './components/search'
import { Categories } from './components/categories'
import { Testimonials } from './components/testimonials'
import { Newsletter } from './components/newsletter'
import { Footer } from './components/footer'
import LogoWithBrand from '@/components/common/LogoWithBrand'
import { Button } from '@/components/ui/button'
import { useGetAllOrganizations } from '@/api/organization/get-organizations'
import PageLoading from '@/components/common/PageLoading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown } from 'lucide-react'
import { shortName } from '@/lib/utils'
import ProfileDropdown from '@/components/layout/ProfileDropdown'
import Link from 'next/link'
import { useLocalstorage } from '@/lib/helpers'
import { User } from '@/types/user'
import LoginLayout from '@/components/layout/LoginLayout'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProfile } from '@/api/user/get-profile'
import Header from '@/components/layout/Header'
import { ShopGrid } from './components/new-shop-list'
import { useEffect, useState } from 'react'


export default function LandingPage() {
    const { data, isLoading } = useGetAllOrganizations();

    const [location, setLocation] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({ latitude: null, longitude: null });

    const [error, setError] = useState<string | null>(null);
    console.log(location)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            (err) => {
                setError(err.message);
            }
        );
    }, []);


    return (
        <div className="min-h-screen">
            <Header />
            <header className="relative">
                <div className="relative h-[560px]">
                    <Image
                        src="/img/hero.png"
                        alt="Beauty treatment background"
                        fill
                        className="object-cover object-top brightness-75"
                        priority
                    />
                    <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                            Beauty & Wellness Near You
                        </h1>
                        <p className="text-center text-lg mb-8 max-w-2xl">
                            Discover trusted beauty and wellness professionals near you, offering personalized services
                            so that you look and feel your best.
                        </p>
                        <Search />
                    </div>
                </div>
            </header>

            {isLoading ? (
                <PageLoading />
            ) : data && (
                <main className=" px-3 md:px-10 py-12 space-y-16">
                    {/* <Categories /> */}

                    <section>
                        <h2 className="text-2xl font-semibold mb-8">New to Baranie</h2>
                        <ShopGrid organizations={data.records} />
                    </section>

                    {/* <section>
                        <h2 className="text-2xl font-semibold mb-8">Trending</h2>
                        <ServiceGrid organizations={data.records} />
                    </section> */}

                    <Testimonials />
                    <Newsletter />
                </main>
            )}

            <Footer />
        </div>
    )
}
