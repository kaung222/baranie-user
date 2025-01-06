
import ShopCard from '@/components/common/ShopCard'
import { Organization } from '@/types/organization'


interface ServiceGridProps {
    organizations: Organization[]
}

export function ShopGrid({ organizations }: ServiceGridProps) {
    return (
        <div className="flex overflow-x-auto gap-6">
            {organizations.map((organization, index) => (
                <ShopCard key={index} organization={organization} />
            ))}
        </div>
    )
}

