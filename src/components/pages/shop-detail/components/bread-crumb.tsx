import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    shopName: string
}

const BreadCrumb = ({ shopName }: Props) => {
    return (
        <div className=' w-full flex justify-between items-center px-3 md:px10] '>
            <div className="flex items-center text-nowrap">

                <Link
                    href={'/'}
                    className={cn(
                        'hover:text-foreground transition-colors',

                        'text-muted-foreground'
                    )}
                >
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className=' text-foreground font-medium '>
                    {shopName}
                </span>

            </div>
            <Button variant={'outline'} className=' rounded-full size-10 p-2 '>
                <Heart className=' w-6 h-6' />
            </Button>
        </div>
    )
}

export default BreadCrumb