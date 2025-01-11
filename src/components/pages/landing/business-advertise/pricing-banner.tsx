import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PricingBanner() {
    return (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Start Managing Your Business Today</h3>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <p className="text-gray-600">
                                    <span className="font-semibold">Free Forever Locally:</span> Use our management system on your local device with no limitations
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <p className="text-gray-600">
                                    <span className="font-semibold">1 Month Free Online Access:</span> Try all online booking and cloud features free for 30 days
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                        {/* <Button size="lg" variant="outline">
                            Download Free Version
                        </Button> */}
                        <Button onClick={() => window.open('https://management.baranie.com/', '_blank')} size="lg" className="bg-pink-500 hover:bg-pink-600">
                            Start your business
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

