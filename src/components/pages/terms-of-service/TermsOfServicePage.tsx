import { ScrollArea } from "@/components/ui/scroll-area"

export function TermsOfService() {
    return (
        <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
            <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <h3 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h3>
            <p className="mb-4">
                By accessing or using the Baranie beauty marketplace service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>

            <h3 className="text-xl font-semibold mb-2">2. Description of Service</h3>
            <p className="mb-4">
                Baranie provides a platform for users to discover and book beauty and wellness services. We do not provide these services directly but facilitate connections between users and service providers.
            </p>

            <h3 className="text-xl font-semibold mb-2">3. User Accounts</h3>
            <p className="mb-4">
                You may need to create an account to use some features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>

            <h3 className="text-xl font-semibold mb-2">4. User Conduct</h3>
            <p className="mb-4">
                You agree not to use the service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You may not use the service to distribute spam, chain letters, or other unsolicited communications.
            </p>

            <h3 className="text-xl font-semibold mb-2">5. Service Providers</h3>
            <p className="mb-4">
                Service providers listed on Baranie are independent contractors and not employees of Baranie. We are not responsible for the quality, safety, or legality of their services.
            </p>

            <h3 className="text-xl font-semibold mb-2">6. Payments and Refunds</h3>
            <p className="mb-4">
                Payments for services are processed through our platform. Refund policies may vary by service provider. Please review the refund policy before booking a service.
            </p>

            <h3 className="text-xl font-semibold mb-2">7. Privacy</h3>
            <p className="mb-4">
                Your use of the service is also governed by our Privacy Policy, which can be found [link to privacy policy].
            </p>

            <h3 className="text-xl font-semibold mb-2">8. Modifications to the Service</h3>
            <p className="mb-4">
                We reserve the right to modify or discontinue the service with or without notice at any time.
            </p>

            <h3 className="text-xl font-semibold mb-2">9. Termination</h3>
            <p className="mb-4">
                We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason.
            </p>

            <h3 className="text-xl font-semibold mb-2">10. Limitation of Liability</h3>
            <p className="mb-4">
                To the maximum extent permitted by law, Baranie shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>

            <h3 className="text-xl font-semibold mb-2">11. Governing Law</h3>
            <p className="mb-4">
                These Terms shall be governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold mb-2">12. Contact Information</h3>
            <p className="mb-4">
                If you have any questions about these Terms, please contact us at [contact email].
            </p>
        </ScrollArea>
    )
}

