'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"


export function Breadcrumb() {
    const { shopId } = useParams()
    const steps = [
        { name: 'Home', href: '/' },
        { name: 'The Style Studio', href: `/shop/${shopId}` },
        { name: 'Services', href: `/shop/${shopId}/booking` },
        { name: 'Professionals', href: `/shop/${shopId}/staff` },
        { name: 'Date & Time', href: '/the-style-studio/date-time' },
        { name: 'Confirm', href: '/the-style-studio/confirm' },
    ]
    const pathname = usePathname()
    console.log(pathname)
    const currentStepIndex = steps.findIndex(step => step.href === pathname)

    return (
        <nav
            style={{ msOverflowStyle: "none", scrollbarWidth: 'none' }}
            className="flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto flex-nowrap"
        >
            {steps.map((step, index) => {
                const isActive = index === currentStepIndex
                const isDisabled = index > currentStepIndex

                return (
                    <div key={step.name} className="flex items-center text-nowrap">
                        {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                        {isDisabled ? (
                            <span className="text-muted-foreground/40 cursor-not-allowed">
                                {step.name}
                            </span>
                        ) : (
                            <Link
                                href={step.href}
                                className={cn(
                                    'hover:text-foreground transition-colors',
                                    isActive && 'text-foreground font-medium',
                                    !isActive && 'text-muted-foreground'
                                )}
                            >
                                {step.name}
                            </Link>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}

