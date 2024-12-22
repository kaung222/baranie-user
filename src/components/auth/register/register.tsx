import Image from 'next/image'
import { SignUpForm } from './sign-up-form'

export default function RegisterPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative hidden lg:block">
                <Image
                    src="/img/login-girl.png"
                    alt="baranie"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Register account
                        </h1>
                    </div>

                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

