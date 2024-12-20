'use client'

import Image from 'next/image'
import { Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'

const professionals = [
    {
        id: 'any',
        name: 'Any professional',
        price: 'from MMK 50',
        image: null,
    },
    {
        id: 'per-service',
        name: 'Select professional per service',
        price: 'from MMK 50',
        image: null,
    },
    {
        id: 'sean',
        name: 'Sean',
        price: 'from MMK 50',
        image: '/professionals/sean.jpg',
    },
    {
        id: 'benson',
        name: 'Benson',
        price: 'from MMK 55',
        image: '/professionals/benson.jpg',
    },
    {
        id: 'sara',
        name: 'Sara',
        price: 'from MMK 60',
        image: '/professionals/sara.jpg',
    },
    {
        id: 'chue',
        name: 'Chue',
        price: 'from MMK 60',
        image: '/professionals/chue.jpg',
    },
    {
        id: 'jeion',
        name: 'Jeion',
        price: 'from MMK 70',
        image: '/professionals/jeion.jpg',
    },
]

export function ProfessionalSelect() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {professionals.map((professional) => (
                <Card
                    key={professional.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mb-4 flex items-center justify-center">
                            {professional.image ? (
                                <Avatar className=' w-full h-full '>
                                    <AvatarImage src={professional.image} alt={shortName(professional.name)} className=' object-cover ' />
                                    <AvatarFallback className=" ">{shortName(professional.name)}</AvatarFallback>
                                </Avatar>
                                // <Image
                                //     src={professional.image}
                                //     alt={professional.name}
                                //     width={80}
                                //     height={80}
                                //     className="w-full h-full object-cover"
                                // />
                            ) : (
                                <Users className="w-8 h-8 text-muted-foreground" />
                            )}
                        </div>
                        <h3 className="font-medium mb-2">{professional.name}</h3>
                        <p className="text-sm text-muted-foreground">{professional.price}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

