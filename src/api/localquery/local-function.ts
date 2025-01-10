import { useLocalstorage } from "@/lib/helpers"
import { Organization } from "@/types/organization";
import { useEffect, useState } from "react";


export const useFavoriteShops = () => {
    const { getData, setData } = useLocalstorage()
    const [shops, setShops] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const shops: Organization[] = getData('favorite_shops') || [];
        setShops(shops);
        setIsLoading(false)
    }, [])

    const addFavoriteShops = async (shop: Organization) => {
        setIsLoading(true)
        const favoriteShops: Organization[] = getData('favorite_shops') || [];
        const newFavoriteShops = [shop, ...favoriteShops]
        setData("favorite_shops", newFavoriteShops);
        setShops(newFavoriteShops);
        setIsLoading(false)
    }

    const deleteFavoriteShops = async (shop: Organization) => {
        setIsLoading(true);
        const favoriteShops: Organization[] = getData('favorite_shops') || [];
        const newFavoriteShops = favoriteShops.filter((preShop) => shop.id != preShop.id)
        setData("favorite_shops", newFavoriteShops);
        setShops(newFavoriteShops);
        setIsLoading(false);
    }

    return {
        shops,
        addFavoriteShops,
        deleteFavoriteShops,
        isLoading
    }

}



export const useRecentShops = () => {
    const { getData, setData } = useLocalstorage()
    const [shops, setShops] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const shops: Organization[] = getData('recent_shops') || [];
        setShops(shops);
        setIsLoading(false)
    }, [])

    const addRecentShops = async (shop: Organization) => {
        setIsLoading(true)
        const recentShop: Organization[] = getData('recent_shops') || [];
        const checkedShops = recentShop.filter(preShop => preShop.id != shop.id)
        const newRecentShop = [shop, ...checkedShops]
        setData("recent_shops", newRecentShop);
        setShops(newRecentShop);
        setIsLoading(false)
    }

    const deleteRecentShops = async (shop: Organization) => {
        setIsLoading(true);
        const recentShop: Organization[] = getData('recent_shops') || [];
        const newRecentShop = recentShop.filter((preShop) => shop.id != preShop.id)
        setData("recent_shops", newRecentShop);
        setShops(newRecentShop);
        setIsLoading(false);
    }

    return {
        shops,
        addRecentShops,
        deleteRecentShops,
        isLoading
    }

}

