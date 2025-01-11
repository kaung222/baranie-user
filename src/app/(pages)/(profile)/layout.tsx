import Header from "@/components/layout/Header"
import { Sidebar } from "@/components/pages/profile/SideBar"


export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className=" h-[calc(100vh-60px)] bg-background">
            <Header />
            <div className="flex h-full">
                <Sidebar />
                <main className="flex-1 h-full py-10 overflow-auto ">
                    {children}
                </main>
            </div>
        </div>
    )
}

