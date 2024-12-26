import ProfileBreadcrumb from "@/components/pages/profile/bread-crumb";
import { ProfileShowcase } from "@/components/pages/profile/ProfilePage";

export default function Page() {
    return (
        <div className=" px-3 md:px-10 space-y-5 ">
            <ProfileBreadcrumb section="Profile" />
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">
                    Manage your profile details
                </p>
            </div>
            <ProfileShowcase />
        </div>
    )
}

