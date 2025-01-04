'use client'
import { ArrowLeft, X } from "lucide-react";
import { Breadcrumb } from "./services-select/bread-crumb";
import { CartSummary } from "./services-select/cart-summery";
import { ServiceCategories } from "./services-select/service-categories";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useGetDetailOrganization } from "@/api/organization/get-detail-organization";
import { Organization } from '@/types/organization';
import { ProfessionalSelect } from "./professional-select/professional-select";
import { DateTimeSelector } from "./select-date-time/data-time-select";
import { PaymentSelect } from "./payment-method/payment-select";
import { useGetOrganizationServices } from "@/api/organization/get-organization-services";
import { useGetOrganizationMembers } from "@/api/organization/get-org-members";
import { useGetProfile } from "@/api/user/get-profile";
import { useGetDetailOrganizationBySlug } from "@/api/organization/get-detail-organization-bySlug";

type Props = {
    children: React.ReactNode
}
export default function BookingPage({ children }: Props) {
    const router = useRouter();
    const { shopId } = useParams()
    // const { data: categories } = useGetOrganizationServices(String(shopId));
    // const { data: members } = useGetOrganizationMembers(String(shopId));
    // const { data: Organization } = useGetDetailOrganization(String(shopId));
    const { data: result } = useGetDetailOrganizationBySlug(String(shopId))
    const { data: profile } = useGetProfile()
    return (
        <div className="min-h-screen w-full bg-background">
            <div className=" w-full h-[80px] sticky top-0 left-0 z-20 border-b bg-white flex justify-between items-center px-3 md:px-10">
                <span onClick={() => router.back()} className=" px-4 py-2 rounded-lg hover:bg-gray-100 ">
                    <ArrowLeft className=" size-6 " />
                </span>
                <span onClick={() => router.push(`/shops/${result?.organization?.slug}`)} className=" px-4 py-2 rounded-lg hover:bg-gray-100 ">
                    <X className=" w-6 h-6 " />
                </span>
            </div>
            <div className=" px-3 md:px-10 py-6">
                <Breadcrumb slug={result?.organization?.slug || ''} shopName={result?.organization?.name || ''} />
                <div className="flex gap-6 ">
                    <div className=" w-full md:w-[60%] ">
                        {children}
                    </div>
                    <div className=" hidden md:block md:w-[40%] p-5 ">
                        {result?.services && result.members && profile && (
                            <CartSummary orgId={result.organization.id} user={profile} services={result.services?.flatMap(c => c.services)} professionals={result.members} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

