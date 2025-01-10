import PrivacyPolicy from "@/components/pages/privacy-policy/privacy-policy"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 bg-white border-b">
                <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pink-500 rounded-full" />
                        <span className="text-xl font-semibold text-pink-500">BARANIE</span>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost">Back to Home</Button>
                    </Link>
                </div>
            </header>

            <main className="container px-4 py-8 mx-auto">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
                    <PrivacyPolicy />
                    <div className="mt-6 text-center">
                        <Link href="/">
                            <Button className="bg-pink-500 hover:bg-pink-600">I Understand</Button>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t mt-8">
                <div className="container px-4 py-6 mx-auto text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Baranie. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

