import { Organization } from "@/types/organization"

type Props = {
    organization: Organization
}

export function AboutSection({ organization }: Props) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-4">About</h2>
                <p className="text-sm leading-relaxed">
                    {organization.notes}
                </p>
            </div>
            <div className="h-[300px] md:h-[500px] rounded-lg overflow-hidden">
                <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d69679.47657377459!2d${organization.longitude}!3d${organization.latitude}!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d${organization.latitude}!2d${organization.longitude}!5e0!3m2!1sen!2sus!4v1734656484346!5m2!1sen!2sus`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </div>
    )
}

