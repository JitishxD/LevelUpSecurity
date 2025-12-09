import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ParticleBackground from "../Utils/ParticleBackground";
import { LockIcon, GoogleIcon } from "../assets/icons";
import { loginUser, registerUser } from "../services/auth"; // Assuming your auth.js is in a services folder
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook

export default function AuthPage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); // Get auth state and login function from context

  // Component State
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // Effect to sync component view with URL mode
  useEffect(() => {
    if (mode === "signup") {
      setIsLoginView(false);
    } else if (mode === "login") {
      setIsLoginView(true);
    } else {
      navigate("/auth/login");
    }
    setError(null); // Clear errors when switching views
  }, [mode, navigate]);

  const toggleView = () => {
    const newMode = isLoginView ? "signup" : "login";
    navigate(`/auth/${newMode}`);
  };

  // Handle input changes and update state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser refresh
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (isLoginView) {
        response = await loginUser(formData.email, formData.password);
      } else {
        response = await registerUser(formData.name, formData.email, formData.password);
      }

      // The backend should return a clear success indicator
      if (response && response.success) {
        login(); // Update the global auth state
        navigate("/home"); // Redirect to home page on success
      } else {
        // Set error message from the backend response, or a default one
        setError(response.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your connection.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans text-gray-300 p-4">
      <ParticleBackground />

      <Link to="/" className="absolute top-5 left-5 text-gray-400 hover:text-white transition-colors z-20">
        &larr; Back to Home
      </Link>

      <div className="w-full max-w-md bg-gray-800/60 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-lg border border-gray-700/50 z-10">

        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-700 p-2 sm:p-3 rounded-full mb-4">
            <LockIcon className="w-7 h-7 sm:w-8 sm:h-8 text-sky-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">{isLoginView ? "Welcome Back" : "Create Account"}</h2>
          <p className="text-gray-400 mt-1 text-center">{isLoginView ? "Sign in to continue your journey" : "Get started with your new account"}</p>
        </div>

        {/* We now use our handleSubmit function */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLoginView && (
            <div>
              <label className="text-sm font-medium text-gray-400" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full p-3 bg-gray-900/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-400" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full p-3 bg-gray-900/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full p-3 bg-gray-900/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete={isLoginView ? "current-password" : "new-password"}
              required
            />
          </div>

          {/* Forgot Password and remenber me */}
          {isLoginView && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-sky-500 focus:ring-sky-500" />
                <label htmlFor="remember" className="ml-2 text-gray-400">
                  Remember me
                </label>
              </div>
              <a href="#" className="font-medium text-sky-500 hover:text-sky-400">
                Forgot password?
              </a>
            </div>
          )}

          {/* Display API Error Messages */}
          {error && <div className="text-sm text-red-400 bg-red-900/30 p-3 rounded-lg text-center">{error}</div>}

          <div>
            <button
              type="submit"
              className="cursor-pointer w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-sky-800 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isLoginView ? "Sign In" : "Create Account"}
            </button>
          </div>
        </form>

        <div>
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 text-sm text-gray-500">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex-1 flex items-center justify-center p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600 transition">
              <GoogleIcon />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            {isLoginView ? "New to our platform?" : "Already have an account?"}
            <button onClick={toggleView} className="font-medium text-sky-500 hover:text-sky-400 ml-2 focus:outline-none">
              {isLoginView ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
