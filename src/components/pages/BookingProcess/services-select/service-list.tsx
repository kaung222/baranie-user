'use client'

import { Plus } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Category } from '@/types/category'
import ServiceCard from '@/components/common/ServiceCard'



interface ServiceListProps {
    allCategories: Category[]
}

export function ServiceList({ allCategories }: ServiceListProps) {
    return (
        <>
            <div className=" flex flex-col gap-8 ">
                {allCategories?.map((category, index) => (
                    <div key={index} className="mb-6 ">
                        <div style={{ scrollMarginTop: '140px' }} id={category.id.toString()} className="flex justify-between items-center mb-2">
                            <h2 style={{ color: `${category.colorCode}` }} className={`text-2xl font-semibold capitalize `}>{category.name}</h2>
                        </div>
                        <div className=' grid grid-cols-1 gap-3 '>
                            {category.services && category.services.length > 0 ? (
                                category.services?.map((service) => (
                                    <ServiceCard key={service.id} service={service} />
                                ))
                            ) : (
                                <h3>No Service served by this business!</h3>
                            )}
                        </div>

                    </div>

                ))}
            </div>
        </>
    )
}

