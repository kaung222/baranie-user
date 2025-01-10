'use client'

import { SearchIcon, MapPin, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MapSearchInput from '@/components/common/map-search-input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Search() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [location, setLocation] = useState<{ lat: string | undefined, long: string | undefined }>({ lat: undefined, long: undefined })
    const handleSearch = () => {
        const searchParam = searchQuery ? `search=${searchQuery}` : ''
        const latParam = location.lat ? `lat=${location.lat}` : ''
        const longParam = location.long ? `long=${location.long}` : ''
        router.push(`/search?${searchParam}${latParam && `&${latParam}`}${longParam && `&${longParam}`}`)
    }
    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for shop name...."
                    className="border-0 focus-visible:ring-0 text-black"
                />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l text-black border-gray-200">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <MapSearchInput setMarkPosition={setLocation} />
            </div>
            <Button onClick={handleSearch} size="lg" className="bg-pink-500 hover:bg-pink-600">
                Search
            </Button>
        </div>
    )
}

