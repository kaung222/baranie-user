'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, Calendar, Heart, ShoppingBag, Settings } from 'lucide-react'

const navigation = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Appointment', href: '/appointment', icon: Calendar },
    { name: 'Favorites', href: '/favorites', icon: Heart },
    { name: 'Product orders', href: '/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 min-h-[calc(100vh-73px)] border-r bg-gray-50/40">
            <nav className="space-y-1 p-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg',
                            pathname === item.href
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
}

