'use client'

import { SearchIcon, MapPin, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Search() {
    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search for treatments..."
                    className="border-0 focus-visible:ring-0 text-black"
                />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-gray-200">
                <MapPin className="h-5 w-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Choose location"
                    className="border-0 focus-visible:ring-0 text-black"
                />
            </div>
            {/* <div className="flex-1 flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-gray-200">
                <Calendar className="h-5 w-5 text-gray-400" />
                <Input
                    type="date"
                    className="border-0 focus-visible:ring-0"
                />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-gray-200">
                <Clock className="h-5 w-5 text-gray-400" />
                <Input
                    type="time"
                    className="border-0 focus-visible:ring-0"
                />
            </div> */}
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                Search
            </Button>
        </div>
    )
}

