import { Calendar, BarChart3, Users2, Wallet, Clock, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { PricingBanner } from './pricing-banner'

const features = [
    {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "Manage appointments, staff schedules, and walk-ins efficiently"
    },
    {
        icon: BarChart3,
        title: "Business Analytics",
        description: "Track performance, revenue, and customer insights"
    },
    {
        icon: Users2,
        title: "Staff Management",
        description: "Handle team schedules, assignments, and performance"
    },
    {
        icon: Wallet,
        title: "Payment Processing",
        description: "Accept payments and manage transactions seamlessly"
    },
    {
        icon: Clock,
        title: "Automated Reminders",
        description: "Reduce no-shows with automated notifications"
    },
    {
        icon: Settings,
        title: "Customizable Settings",
        description: "Tailor the system to your business needs"
    }
]

export function BusinessFeatures() {
    return (
        <div className="bg-gray-50 py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold mb-4">
                        Powerful Tools for Your Beauty Business
                    </h2>
                    <p className="text-lg text-gray-600">
                        Everything you need to manage and grow your beauty or wellness business, available for free local use
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div className="order-2 lg:order-1">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <Card key={index} className="bg-white">
                                    <CardContent className="p-6">
                                        <feature.icon className="w-8 h-8 text-pink-500 mb-4" />
                                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20225747-6Y8SsOTtOVqHIRe2xRaeGG2RC4walF.png'}`}
                                alt="Calendar Dashboard"
                                width={800}
                                height={600}
                                className="w-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                    </div>
                </div>

                <PricingBanner />

                {/* <div className="mt-16 text-center">
                    <h3 className="text-xl font-semibold mb-6">Want to see it in action?</h3>
                    <Button size="lg" variant="outline">
                        Schedule a Demo
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                        Get a personalized walkthrough of all features
                    </p>
                </div> */}
            </div>
        </div>
    )
}

