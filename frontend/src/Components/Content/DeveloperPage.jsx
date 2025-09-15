import { Link } from "react-router-dom";
import ParticleNew from "../../Utils/ParticlesNew";

export default function DeveloperPage() {
    const threats = [
        {
            title: "Insecure Code & Injection Flaws",
            description: "Failing to sanitize user inputs can lead to SQL injection or Cross-Site Scripting (XSS), allowing attackers to steal data or execute malicious code in users' browsers.",
        },
        {
            title: "Vulnerable Dependencies",
            description: "Using outdated or compromised third-party libraries (e.g., from npm or Maven) can import critical vulnerabilities directly into your application without writing a single line of insecure code.",
        },
        {
            title: "API Security Flaws",
            description: "Poorly secured APIs can lead to data breaches. Common issues include broken object-level authorization, excessive data exposure, and a lack of rate limiting, inviting automated attacks.",
        },
        {
            title: "Leaked Secrets & Credentials",
            description: "Accidentally committing API keys, passwords, or other secrets to a public code repository like GitHub is a common mistake that gives attackers a direct key to your infrastructure.",
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
                            Cybersecurity for Developers
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                            Your code is the first line of defense. Understand the common pitfalls that can turn a feature into a vulnerability.
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
