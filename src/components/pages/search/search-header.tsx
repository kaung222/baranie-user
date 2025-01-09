'use client'
import { Search, MapPin, Calendar, Clock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import MapSearchInput from '@/components/common/map-search-input'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function SearchHeader() {
    const { setQuery, getQuery } = useSetUrlParams();
    const [searchQuery, setSearchQuery] = useState(getQuery('search') || '')
    const [location, setLocation] = useState<{ lat: string | undefined, long: string | undefined }>({ lat: '', long: '' });


    // const handleSearch = useDebouncedCallback((query: string) => {
    //     setQuery({ key: 'search', value: searchQuery })
    // }, 500);

    const handleSearch = () => {
        setQuery({ key: 'search', value: searchQuery })
        setQuery({ key: 'lat', value: location.lat || '' })
        setQuery({ key: 'long', value: location.long || '' })
    }

    return (
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm md:flex-row max-w-[700px] mx-auto ">
            <div className="flex items-center flex-1 min-w-0 relative">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <Input
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        // handleSearch(e.target.value)
                    }}
                    type="text"
                    placeholder="Search for shop name..."
                    className="border-0 focus-visible:ring-0"
                />
                {searchQuery && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setSearchQuery('')}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>
            <div className="hidden w-px h-6 bg-gray-200 md:block" />
            <div className="flex items-center flex-1 min-w-0">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <MapSearchInput setMarkPosition={setLocation} />
            </div>
            <Button onClick={() => handleSearch()} className="w-full md:w-auto px-8 bg-pink-500 hover:bg-pink-600">Search</Button>
        </div>
    )
}

