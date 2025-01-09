import { Star } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface BusinessCardProps {
    name: string
    image: string
    rating: number
    category: string
    address: string
}

export function BusinessCard({ name, image, rating, category, address }: BusinessCardProps) {
    return (
        <div className="overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-36 sm:h-48">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm sm:text-base">{name}</h3>
                    <Badge variant="secondary" className="w-fit bg-black text-white text-xs">
                        {category}
                    </Badge>
                </div>
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{rating}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{address}</p>
            </div>
        </div>
    )
}

