import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { shortName } from '@/lib/utils'
import { MemberForAll } from '@/types/member'
import { Users } from 'lucide-react'
import React from 'react'

type Props = {
    professional: MemberForAll;
    onClick: () => any;
    isSelected: boolean;
}

const ProfessionalCard = ({ professional, onClick, isSelected }: Props) => {

    return (
        <>
            <Card
                className={`cursor-pointer hover:border-primary transition-colors ${isSelected && "border-primary bg-brandColorLight/40"} `}
                onClick={onClick}
            >
                <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mb-4 flex items-center justify-center">
                        {professional.profilePictureUrl ? (
                            <Avatar className=' w-full h-full '>
                                <AvatarImage src={professional.profilePictureUrl} alt={shortName(professional.firstName)} className=' object-cover ' />
                                <AvatarFallback className=" ">{shortName(professional.firstName)}</AvatarFallback>
                            </Avatar>
                        ) : (
                            <Users className="w-8 h-8 text-muted-foreground" />
                        )}
                    </div>
                    <h3 className="font-medium mb-2">{professional.firstName} {professional.lastName}</h3>
                </CardContent>
            </Card>
        </>
    )
}

export default ProfessionalCard