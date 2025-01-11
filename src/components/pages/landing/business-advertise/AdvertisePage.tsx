import { BusinessFeatures } from "./business-feature";
import { BusinessStats } from "./business-stats";
import { ComparisonTable } from "./comparison-table";


export default function BusinessPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Grow Your Beauty Business with Baranie
                    </h1>
                    <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                        Free to use locally, with 1 month free trial for online booking features
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <BusinessFeatures />

            {/* Comparison Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">Compare Versions</h2>
                        <p className="text-lg text-gray-600">
                            Choose the version that best fits your business needs
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <ComparisonTable />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            {/* <BusinessStats /> */}
        </div>
    )
}

