import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Newsletter() {
    return (
        <section className="bg-pink-500 rounded-lg text-white p-12 text-center">
            <h2 className="text-3xl font-bold mb-2">Step Into Radiance,</h2>
            <h3 className="text-3xl font-bold mb-6">Rediscover Confidence</h3>
            <p className="max-w-2xl mx-auto mb-8">
                Your journey to perfect beauty begins here. Experience personalized services to your
                unique needs, designed to bring out the best version of you.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
                <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Button variant="secondary" className="bg-white text-pink-500 hover:bg-white/90">
                    Send
                </Button>
            </div>
        </section>
    )
}

