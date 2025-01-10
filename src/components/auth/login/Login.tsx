import Image from 'next/image'
import Link from 'next/link'
import { SignInForm } from './sign-in-form'

export default function SignUpPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative hidden lg:block">
                <Image
                    src="/img/login-girl.png"
                    alt="Spa treatment with avocado"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Baranie for customer
                        </h1>
                        <p className="text-muted-foreground">
                            Create an account or log in to manage your business.
                        </p>
                    </div>

                    <SignInForm />

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className=" text-center text-sm text-gray-600 ">
                            Don&apos;t have an account? Go to
                            <Link href="/register" className="font-medium text-brandColor hover:underline ">
                                &nbsp;register
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

