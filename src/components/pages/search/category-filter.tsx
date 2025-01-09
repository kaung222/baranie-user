'use client'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from 'lucide-react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'


export const typesArray = [
    { name: 'Haircuts & styling', value: 'Haircut Styling' },
    { name: 'Nail Services', value: 'Nails' },
    { name: 'Eye brow & lashes', value: 'Eyebrows & eyelashes' },
    { name: 'Facials & Skincare', value: 'Facials & Skincare' },
    { name: 'Injectable & fillers', value: 'Injectable' },
    { name: 'Makeup', value: 'Makeup' },
    { name: 'Barbering', value: 'Barbering' },
    { name: 'Massage', value: 'massage' },
    { name: 'Hair extension', value: 'Hair extension' },
    { name: 'Hair Removal', value: 'Hair removal' },
    { name: 'Tattoo & piercing', value: 'Tattoo & piercing' },
    { name: 'Fitness', value: 'Fitness' },
    { name: 'Others', value: 'Others' },
];

// const sortOptions = [
//     'Recommended',
//     'Trending',
//     'Nearest',
//     'Top-rated'
// ]

export function CategoryFilters() {
    const { getQuery, setQuery } = useSetUrlParams()
    const type = getQuery('type') || 'All'

    return (
        <>
            {/* Mobile Filter Button */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden fixed bottom-4 right-4 z-50">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <div className="py-4">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-4 text-sm font-semibold">Category</h3>
                                <RadioGroup defaultValue={type} value={type} onValueChange={(e) => setQuery({ key: 'type', value: e })}>
                                    <div className="flex items-center space-x-2 py-1">
                                        <RadioGroupItem value="All" id='all' />
                                        <Label htmlFor='all'>All</Label>
                                    </div>
                                    {typesArray.map((category, index) => (
                                        <div key={index} className="flex items-center space-x-2 py-1">
                                            <RadioGroupItem value={category.value} id={category.value} />
                                            <Label htmlFor={category.value}>{category.name}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            {/* 
                            <div>
                                <h3 className="mb-4 text-sm font-semibold">Sort by</h3>
                                {sortOptions.map((option) => (
                                    <div key={option} className="flex items-center space-x-2 py-1">
                                        <Checkbox id={option} />
                                        <Label htmlFor={option}>{option}</Label>
                                    </div>
                                ))}
                            </div> */}

                            {/* <div>
                                <h3 className="mb-4 text-sm font-semibold">Price</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input placeholder="Min" type="number" />
                                        <Input placeholder="Max" type="number" />
                                    </div>
                                    <Button className="w-full bg-pink-500 hover:bg-pink-600">
                                        Apply
                                    </Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 p-6 bg-white rounded-lg">
                <div className="space-y-6">
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Category</h3>
                        <RadioGroup defaultValue={type} value={type} onValueChange={(e) => setQuery({ key: 'type', value: e })}>
                            <div className="flex items-center space-x-2 py-1">
                                <RadioGroupItem value="All" id='all' />
                                <Label htmlFor='all'>All</Label>
                            </div>
                            {typesArray.map((category, index) => (
                                <div key={index} className="flex items-center space-x-2 py-1">
                                    <RadioGroupItem value={category.value} id={category.value} />
                                    <Label htmlFor={category.value}>{category.name}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* <div>
                        <h3 className="mb-4 text-sm font-semibold">Sort by</h3>
                        {sortOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2 py-1">
                                <Checkbox id={option} />
                                <Label htmlFor={option}>{option}</Label>
                            </div>
                        ))}
                    </div> */}

                    {/* <div>
                        <h3 className="mb-4 text-sm font-semibold">Price</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input placeholder="Min" type="number" />
                                <Input placeholder="Max" type="number" />
                            </div>
                            <Button className="w-full bg-pink-500 hover:bg-pink-600">
                                Apply
                            </Button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

