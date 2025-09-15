import { Link } from "react-router-dom";
import ParticleNew from "../../Utils/ParticlesNew";

export default function MarketerPage() {
    const threats = [
        {
            title: "Phishing & Social Engineering",
            description: "Marketers are high-value targets for spear-phishing attacks. Attackers create convincing fake emails to steal credentials for social media, ad platforms, or internal company accounts.",
        },
        {
            title: "Social Media Account Takeover",
            description: "If an attacker gains control of your company's official social media accounts, they can cause immense brand damage by posting malicious links, scams, or offensive content.",
        },
        {
            title: "Data Privacy & Compliance Risks",
            description: "Improperly handling customer data lists for email campaigns can lead to privacy violations (like GDPR or CCPA) and hefty fines, not to mention a loss of customer trust.",
        },
        {
            title: "Brand Impersonation",
            description: "Attackers create fake social media profiles or websites that mimic your brand to scam customers, phish for information, or tarnish your reputation. Knowing how to spot and report them is key.",
        }
    ];

    return (
        <div className="bg-gray-900 min-h-screen text-gray-300 font-sans">
            <ParticleNew />

            <div className="relative z-10 min-h-screen flex flex-col p-4 sm:p-6">
                <header className="w-full max-w-7xl mx-auto">
                    <Link to="/home" className="text-gray-400 hover:text-white transition-colors">
                        &larr; Back to Roles
                    </Link>
                </header>

                <main className="flex-grow flex items-center justify-center">
                    <div className="container mx-auto max-w-5xl text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                            Cybersecurity for Marketers
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                           Your voice shapes the brand. Learn how to protect your platforms and your audience from digital threats.
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            {threats.map((threat, index) => (
                                <div key={index} className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
                                    <h3 className="text-xl font-bold text-sky-400">{threat.title}</h3>
                                    <p className="mt-2 text-gray-300">{threat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
