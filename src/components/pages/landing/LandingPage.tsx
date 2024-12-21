'use client'
import Image from 'next/image'
import { Search } from './components/search'
import { Categories } from './components/categories'
import { ServiceGrid } from './components/new-shop-list'
import { Testimonials } from './components/testimonials'
import { Newsletter } from './components/newsletter'
import { Footer } from './components/footer'
import LogoWithBrand from '@/components/common/LogoWithBrand'
import { Button } from '@/components/ui/button'
import { useGetAllOrganizations } from '@/api/organization/get-organizations'
import PageLoading from '@/components/common/PageLoading'
import { useAuth } from '@/lib/hooks/useAuth'


export default function LandingPage() {
    const { data, isLoading } = useGetAllOrganizations();
    const { session, isAuthenticated } = useAuth()
    console.log(session, isAuthenticated)
    return (
        <div className="min-h-screen">
            <nav className=" h-[80px] sticky top-0 left-0 z-20 border-b bg-white flex justify-between items-center px-3 md:px-10 py-6">
                <LogoWithBrand />
                <div>

                </div>
                <Button variant={"outline"} className="">Login</Button>
            </nav>
            <header className="relative">
                <div className="relative h-[560px]">
                    <Image
                        src="/img/hero.png"
                        alt="Beauty treatment background"
                        fill
                        className="object-cover object-top brightness-75"
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
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
                    <Categories />

                    <section>
                        <h2 className="text-2xl font-semibold mb-8">New to Baranie</h2>
                        <ServiceGrid organizations={data.records} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-8">Trending</h2>
                        <ServiceGrid organizations={data.records} />
                    </section>

                    <Testimonials />
                    <Newsletter />
                </main>
            )}

            <Footer />
        </div>
    )
}

const recommendedServices = [
    {
        id: 1,
        name: "Radiant Glow Clinic",
        rating: 6.7,
        category: "Facials & Skincare",
        image: "/clinic-1.jpg",
        location: "48 Paya Road, Kampung Township, Yangon"
    },
    // ... more services
]

const trendingServices = [
    {
        id: 1,
        name: "The Gentlemen's Parlor",
        rating: 6.7,
        category: "Haircuts",
        image: "/parlor-1.jpg",
        location: "42 Merchant Road, Pabedan Township, Yangon"
    },
    // ... more services
]

