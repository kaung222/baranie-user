import { Scissors, Palette, Users, Heart } from 'lucide-react'
import Link from 'next/link'

const categories = [
    {
        icon: Scissors,
        name: "Haircuts & Styling",
        href: "/services/haircuts"
    },
    {
        icon: Heart,
        name: "Nail Services",
        href: "/services/nails"
    },
    {
        icon: Users,
        name: "Facials & Skincare",
        href: "/services/facials"
    },
    {
        icon: Palette,
        name: "Make up",
        href: "/services/makeup"
    }
]

export function Categories() {
    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {categories.map((category, index) => (
                <Link
                    key={index}
                    href={category.href}
                    className="flex flex-col items-center p-6 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <category.icon className="h-8 w-8 mb-3 text-pink-500" />
                    <span className="text-sm font-medium text-center">{category.name}</span>
                </Link>
            ))}
            <Link
                href="/services"
                className="flex flex-col border items-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <span className="text-sm font-medium">View All</span>
            </Link>
        </section>
    )
}

