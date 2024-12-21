'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle email/password signup logic here
        console.log('Sign up with:', email, password)
    }

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/dashboard' })
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="h-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2 relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="h-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <EyeIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-pink-500 hover:bg-pink-600">
                        Continue
                    </Button>
                </div>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        or
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={handleGoogleSignIn}
                >
                    <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                    >
                        <path
                            fill="#4285f4"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        />
                    </svg>
                    Continue with Google
                </Button>
            </div>
        </div>
    )
}

