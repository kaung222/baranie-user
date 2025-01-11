import { Calendar, Search, Star, Clock } from 'lucide-react'

const steps = [
    {
        icon: Search,
        title: "Discover",
        description: "Find the perfect service from our wide range of beauty and wellness options"
    },
    {
        icon: Calendar,
        title: "Book",
        description: "Choose your preferred time slot and book instantly"
    },
    {
        icon: Clock,
        title: "Experience",
        description: "Enjoy your service at the scheduled time"
    },
    {
        icon: Star,
        title: "Review",
        description: "Share your experience and help others make informed decisions"
    }
]

export function HowItWorks() {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
                <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100">
                        <step.icon className="w-8 h-8 text-pink-500" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                </div>
            ))}
        </div>
    )
}

