import Image from 'next/image'
import { SignUpForm } from './sign-up-form'
import Link from 'next/link'

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
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className=" text-center text-sm text-gray-600 ">
                            Already have an account? Go to
                            <Link href="/login" className="font-medium text-brandColor hover:underline ">
                                &nbsp;login
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

