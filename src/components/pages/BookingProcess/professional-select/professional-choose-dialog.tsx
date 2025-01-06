'use client'
import { useGetProfessionalOfServices } from '@/api/professionals/get-professionals-of-services';
import ControllableDialog from '@/components/common/control-dialog'
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import React, { useState } from 'react'
import ProfessionalCard from './professional-card';
import CircleLoading from '@/components/layout/circle-loading';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

type Props = {
    trackIndex: number;
    preProfessionalId?: string;
    children: React.ReactNode;
}
type BookItem = {
    sv: string;
    pf: string;
}

const ProfessionalChooseDialog = ({ trackIndex, children, preProfessionalId }: Props) => {
    const { getQuery, setQuery } = useSetUrlParams()
    const preItems: BookItem[] = JSON.parse(getQuery('items') || '[]');
    const selectedProfessional = getQuery("staff");
    const { data: professionals, isLoading } = useGetProfessionalOfServices(preItems.filter((item, index) => index == trackIndex).flatMap(i => i.sv));
    const [open, setOpen] = useState(false);

    const handleProfessionalChange = (professionalId: string) => {
        const changedItems = preItems.map((item, index) => index == trackIndex ? ({ sv: item.sv, pf: professionalId }) : item)
        setQuery({ key: 'items', value: JSON.stringify(changedItems) });
        setOpen(false)
    }
    return (
        <>
            <ControllableDialog open={open} setOpen={setOpen} trigger={(children)} title='Select professional'>
                <div className=' w-full h-full max-h-[400px] overflow-auto '>
                    <div className='grid grid-cols-1 sm:grid-cols-2  gap-4'>
                        <Card
                            className={`cursor-pointer hover:border-primary transition-colors ${preProfessionalId == 'any' && "border-primary bg-brandColorLight/40"} `}
                            onClick={() => handleProfessionalChange('any')}
                        >
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mb-4 flex items-center justify-center">
                                    <Users className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-medium mb-2">Any Professional</h3>
                            </CardContent>
                        </Card>
                        {isLoading ? (
                            <CircleLoading />
                        ) : professionals && (
                            professionals.map((professional) => (
                                <ProfessionalCard key={professional.id} professional={professional} isSelected={preProfessionalId == professional.id} onClick={() => handleProfessionalChange(professional.id)} />
                            ))
                        )}
                    </div>
                </div>
            </ControllableDialog>
        </>
    )
}

export default ProfessionalChooseDialog