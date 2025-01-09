"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Banknote, Building, Clock, Home, Hospital, Landmark, Leaf, MapPin, Plane, Search, Store, Train, X } from "lucide-react"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"



type SearchResultsType = {
    addresstype: string;
    class: string;
    display_name: string;
    lat: string;
    lon: string;
    name: string;
    place_id: number;
    place_rank: number;
    type: string;
}

type Props = {
    setMarkPosition: React.Dispatch<React.SetStateAction<{ lat: string | undefined, long: string | undefined }>>;

}

export default function MapSearchInput({ setMarkPosition }: Props) {
    const [query, setQuery] = useState("");
    const { setQuery: setUrlQuery, deleteQuery } = useSetUrlParams()
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);


    // Function to search for locations using Nominatim API
    const searchLocation = async (query: string) => {
        if (query.length > 2) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();
            setSearchResults(data);
        }
    };



    const getIcon = (type: SearchResultsType["type"]) => {
        switch (type) {
            case "history":
                return <Clock className="h-5 w-5 text-gray-400" />;
            case "location":
                return <MapPin className="h-5 w-5 text-gray-400" />;
            case "search":
                return <Search className="h-5 w-5 text-gray-400" />;
            case "building":
                return <Building className="h-5 w-5 text-gray-400" />;
            case "park":
                return <Leaf className="h-5 w-5 text-green-500" />;
            case "station":
                return <Train className="h-5 w-5 text-blue-500" />;
            case "store":
                return <Store className="h-5 w-5 text-orange-500" />;
            case "house":
                return <Home className="h-5 w-5 text-gray-500" />;
            case "monument":
                return <Landmark className="h-5 w-5 text-gray-500" />;
            case "airport":
                return <Plane className="h-5 w-5 text-gray-400" />;
            case "bank":
                return <Banknote className="h-5 w-5 text-gray-400" />;
            case "hospital":
                return <Hospital className="h-5 w-5 text-red-500" />;
            default:
                return <MapPin className="h-5 w-5 text-gray-400" />; // Default to MapPin if no match
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        searchLocation(e.target.value)
        setIsSearching(true)
    }

    const handleResultClick = (result: SearchResultsType) => {
        setQuery(result.display_name)
        setMarkPosition({ lat: String(result.lat), long: String(result.lon) })
        setUrlQuery({ key: 'lat', value: result.lat })
        setUrlQuery({ key: 'long', value: result.lon })
        setIsSearching(false);
    }

    const handleClearClick = () => {
        setQuery("")
        setIsSearching(false)
        deleteQuery({ key: "lat" })
        deleteQuery({ key: 'long' })
    }

    return (

        <div className="relative w-full">
            <div className="relative w-full">
                <Input
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsSearching(true)}
                    onBlur={() => {
                        if (query.length > 1) {
                            setIsSearching(false)
                        }
                    }}
                    className="border-0 focus-visible:ring-0 w-full"
                    placeholder="Search Google Maps"
                />
                {query && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={handleClearClick}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg overflow-hidden z-10">
                    {searchResults.slice(0, 4).map((result) => (
                        <button
                            key={result.lat}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => handleResultClick(result)}
                        >
                            {getIcon(result.type)}
                            <div>
                                <div className="font-medium">{result.display_name}</div>
                                {result.name && (
                                    <div className="text-sm text-gray-500">{result.name}</div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>

    )
}