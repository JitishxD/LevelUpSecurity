import { Link } from "react-router-dom";
import ParticleNew from "../../Utils/ParticlesNew";

export default function StudentPage() {
    const threats = [
        {
            title: "Unsecured Public Wi-Fi",
            description: "Campus, library, and coffee shop Wi-Fi networks are often unsecured. Attackers on the same network can intercept your data, a technique known as a 'Man-in-the-Middle' attack.",
        },
        {
            title: "Academic & Financial Scams",
            description: "Be wary of emails about scholarships, student loan forgiveness, or university account issues. These are common phishing tactics to steal your personal information and login credentials.",
        },
        {
            title: "Malware in 'Free' Downloads",
            description: "Downloading pirated textbooks, software, or files from untrusted sources is a primary way malware and ransomware infect your devices, potentially locking you out of your schoolwork.",
        },
        {
            title: "Digital Footprint & Privacy",
            description: "What you post online now can impact your future career. Learning to manage your privacy settings and cultivate a professional digital footprint is a crucial life skill.",
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
                            Cybersecurity for Students
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                           Your digital life is just beginning. Build the smart, secure habits that will protect you through college and beyond.
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
