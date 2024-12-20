'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
    {
        id: 1,
        name: "Sophie R",
        text: "I found and booked my facial appointment in minutes! The website is easy to navigate, and I loved being able to see reviews and prices upfront. My esthetician was fantastic, and my skin has never looked better!",
        image: "/avatar-1.jpg"
    },
    // ... more testimonials
]

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <section className="relative">
            <h2 className="text-2xl font-semibold mb-8">Client Experiences</h2>
            <div className="flex overflow-hidden">
                {testimonials.map((testimonial, index) => (
                    <Card
                        key={index}
                        className={` flex-shrink-0 transition-transform w-full max-w-[480px] duration-300 transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium">{testimonial.name}</h3>
                                </div>
                            </div>
                            <p className="text-muted-foreground">{testimonial.text}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentIndex((prev) => Math.min(testimonials.length - 1, prev + 1))}
                    disabled={currentIndex === testimonials.length - 1}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </section>
    )
}

