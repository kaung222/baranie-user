import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Linkedin, TwitterIcon as TikTok } from 'lucide-react'

const businessLinks = [
    { name: "For Partners", href: `https://management.baranie.com/` },
    { name: "Pricing", href: "/pricing" },
    { name: "Support", href: "/contact" },
]

const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
]

const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: TikTok, href: "#" },
    { icon: Youtube, href: "#" },
]

export function Footer() {
    return (
        <footer className="border-t mt-24">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold mb-4">For business</h3>
                        <ul className="space-y-2">
                            {businessLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-foreground" target="_blank">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Social Media</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <link.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    Copyright © {new Date().getFullYear()}. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

