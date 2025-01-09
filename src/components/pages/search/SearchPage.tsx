'use client'
import ShopCard from "@/components/common/ShopCard"
import { CategoryFilters } from "./category-filter"
import { SearchHeader } from "./search-header"
import { BusinessCard } from "./business-card"
import { useSearchShops } from "@/api/search/shop-search"
import PageLoading from "@/components/common/PageLoading"
import { NoSearchResults } from "./no-search-result"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import Header from "@/components/layout/Header"


export default function SearchPage() {
    const { data: shops, isLoading } = useSearchShops();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container p-4 mx-auto">
                <SearchHeader />

                <div className="flex gap-6 mt-6">
                    <CategoryFilters />
                    <div className="flex-1">
                        {isLoading ? (
                            <PageLoading />
                        ) : shops && shops.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {shops?.map((shop) => (
                                    <ShopCard organization={shop} key={shop.id} />
                                ))}
                            </div>
                        ) : (
                            <NoSearchResults />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

