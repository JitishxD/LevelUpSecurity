import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../services/auth";

import ParticleNew from "../Utils/ParticlesNew";
import { DeveloperIcon, MarketerIcon, StudentIcon } from '../assets/icons';

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser(); // Call API to destroy session on backend
    logout(); // Update the context state
    navigate("/auth/login"); // Redirect to login page
  };

  return (
    <nav>
      {isAuthenticated && (
        <div className="bg-gray-900 min-h-screen text-gray-300 font-sans">
          <ParticleNew />

          <div className="relative z-10 min-h-screen flex flex-col">
            <header className="absolute top-0 left-0 w-full p-4 sm:p-6 flex items-center justify-between">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                &larr; Back to Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-semibold py-2 px-4 border border-sky-500/30 rounded-lg transition-colors text-sm"
              >
                Sign Out
              </button>
            </header>

            <main className="flex-grow flex items-center justify-center p-4">
              <div className="container mx-auto max-w-6xl text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">One Size Doesn't Fit All.</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                  Your role defines your risks. We provide training that understands your unique challenges, just like a mechanic and a salesperson need different car manuals.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Developer Card */}
                  <Link to="/" className="group relative block h-80 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-blue-500/30"></div>
                    {/* Cover Content (Visible by default) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 p-6 transition-opacity duration-500 group-hover:opacity-0">
                      <DeveloperIcon className="w-16 h-16 text-white" />
                      <h2 className="mt-4 text-3xl font-bold text-white">Developers</h2>
                    </div>
                    {/* Hover Content (Hidden by default) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-sky-400">Technical Deep Dive</h3>
                      <p className="mt-2 text-center text-gray-300">
                        Learn to combat SQL injection, secure APIs, and manage vulnerable dependencies. Training built for those who build.
                      </p>
                    </div>
                  </Link>

                  {/* Marketer Card */}
                  <Link to="/" className="group relative block h-80 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30"></div>
                    {/* Cover Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 p-6 transition-opacity duration-500 group-hover:opacity-0">
                      <MarketerIcon className="w-16 h-16 text-white" />
                      <h2 className="mt-4 text-3xl font-bold text-white">Marketers</h2>
                    </div>
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-sky-400">Protecting the Brand</h3>
                      <p className="mt-2 text-center text-gray-300">
                        Master identifying sophisticated phishing, securing social media accounts, and protecting customer data from public-facing threats.
                      </p>
                    </div>
                  </Link>

                  {/* Student Card */}
                  <Link to="/" className="group relative block h-80 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30"></div>
                    {/* Cover Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 p-6 transition-opacity duration-500 group-hover:opacity-0">
                      <StudentIcon className="w-16 h-16 text-white" />
                      <h2 className="mt-4 text-3xl font-bold text-white">Students</h2>
                    </div>
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-sky-400">Building Smart Habits</h3>
                      <p className="mt-2 text-center text-gray-300">
                        Learn to protect your personal data on campus Wi-Fi, spot academic scams, and build a secure digital footprint for your future career.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </main>

            <footer className="w-full text-center p-4 text-gray-500">
              <p>&copy; {new Date().getFullYear()} LevelUpSecurity. All rights reserved.</p>
            </footer>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Home;
