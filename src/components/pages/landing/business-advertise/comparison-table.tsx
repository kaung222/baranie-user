import { Check, X } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const features = [
    {
        name: "Appointment Management",
        free: true,
        online: true,
    },
    {
        name: "Staff Scheduling",
        free: true,
        online: true,
    },
    {
        name: "Basic Analytics",
        free: true,
        online: true,
    },
    {
        name: "Online Booking",
        free: false,
        online: true,
    },
    {
        name: "Cloud Sync",
        free: false,
        online: true,
    },
    {
        name: "Customer App Access",
        free: false,
        online: true,
    },
    {
        name: "SMS Reminders",
        free: false,
        online: true,
    },
    {
        name: "Advanced Analytics",
        free: false,
        online: true,
    }
]

export function ComparisonTable() {
    return (
        <div className="rounded-lg border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Feature</TableHead>
                        <TableHead className="text-center">Free Local Version</TableHead>
                        <TableHead className="text-center">Public Version</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {features.map((feature) => (
                        <TableRow key={feature.name}>
                            <TableCell>{feature.name}</TableCell>
                            <TableCell className="text-center">
                                {feature.free ? (
                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                ) : (
                                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                {feature.online ? (
                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                ) : (
                                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

