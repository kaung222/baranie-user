import Header from "@/components/layout/Header"
import { Sidebar } from "@/components/pages/profile/SideBar"


export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

