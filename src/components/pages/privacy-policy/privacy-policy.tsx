import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

const PrivacyPolicy = () => {
    return (
        <ScrollArea className="overflow-y-auto">
            {/* Existing Privacy Policy content here */}
            <p>This is some sample privacy policy text.</p>
            <p>More sample text goes here.</p>
            <p>And even more sample text.</p>

            <p className="mt-4">
                This Privacy Policy is part of our <Link href="/terms-of-service" className="text-pink-500 hover:underline">Terms of Service</Link>, which govern your use of our services.
            </p>

        </ScrollArea>
    );
};

export default PrivacyPolicy;

