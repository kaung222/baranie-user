'use client'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'



export function NoSearchResults() {
    const { deleteQuery } = useSetUrlParams()
    const handleClearSearch = () => {
        deleteQuery({ key: 'type' })
        deleteQuery({ key: 'search' })
        deleteQuery({ key: 'lat' })
        deleteQuery({ key: "long" })
    }
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Search className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-600 mb-6 max-w-md">
                We couldn&apos;t find any results .
                Please try a different search term or browse our categories.
            </p>
            <Button onClick={handleClearSearch} className="bg-pink-500 hover:bg-pink-600">
                Clear Search
            </Button>
        </div>
    )
}

