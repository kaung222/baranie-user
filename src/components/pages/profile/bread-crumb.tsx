import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    section: string
}

const ProfileBreadcrumb = ({ section }: Props) => {
    return (
        <div className=' w-full flex justify-between items-center '>
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
                    {section}
                </span>

            </div>
        </div>
    )
}

export default ProfileBreadcrumb