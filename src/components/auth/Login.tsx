import Image from 'next/image'
import Link from 'next/link'
import { SignUpForm } from './sign-up-form'

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

                    <SignUpForm />

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Are you a customer looking to book an appointment?{' '}
                            <Link
                                href="/professional/signup"
                                className="text-primary hover:text-primary/90 font-medium"
                            >
                                Go to Baranie for professional
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

