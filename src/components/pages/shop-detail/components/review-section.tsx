import { Star } from 'lucide-react'
import Image from 'next/image'

const reviews = [
    {
        id: 1,
        author: 'Zara J.',
        rating: 5,
        date: 'Today at 4:30 pm',
        content:
            'My stay was perfect from start to finish! The check-in was smooth, the room was clean and well serviced, and the staff went out of their way to make me feel welcome. The location is great for exploring restaurants and sights. Would absolutely stay again!',
        avatar: '/avatar-1.jpg',
    },
    {
        id: 2,
        author: 'Charlie D.',
        rating: 5,
        date: '2 days ago at 3:15 pm',
        content:
            'This place was ideal for our family. Plenty of space, a well-equipped kitchen, and a great pool area that kept the kids busy. The staff was so helpful, and we are already planning our next trip here!',
        avatar: '/avatar-2.jpg',
    },
]

export function ReviewSection() {
    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">5.0</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Image
                                src={review.avatar}
                                alt={review.author}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className="font-medium">{review.author}</h3>
                                <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                        </div>
                        <div className="flex mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                        </div>
                        <p className="text-sm">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

