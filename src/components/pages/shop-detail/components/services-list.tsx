'use client'
import ServiceCard from '@/components/common/ServiceCard'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Category } from '@/types/category'
import { useParams } from 'next/navigation'



type Props = {
    categories: Category[];
    orgId: string;
}

export function
    ServicesList({ categories, orgId }: Props) {
    const { shopId } = useParams()
    return (
        <>
            {
                categories && (
                    <div className="space-y-6">
                        <h1 className=' font-bold text-xl '>Services</h1>
                        <Tabs defaultValue={categories[0]?.name} className="">
                            <TabsList className="flex gap-2 justify-start items-center sticky top-[60px] bg-white z-10 py-2">
                                {categories.map(category => (
                                    <TabsTrigger key={category.id} value={category.name}>{category.name}</TabsTrigger>
                                ))}
                            </TabsList>
                            {categories.map((category, index) => (
                                <TabsContent key={index} value={category.name}>
                                    <div className=' w-full space-y-5'>
                                        {category.services.map((service) => (
                                            <ServiceCard preItems={[]} orgSlug={String(shopId)} key={service.id} service={service} />
                                        ))}

                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                )
            }
        </>
    )
}

