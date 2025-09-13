import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UsersIcon, ShieldCheckIcon, ChartBarIcon } from "../assets/icons";
import ParticleNew from "../Utils/ParticlesNew";

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationClasses = `transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;

  return [ref, animationClasses];
};

export default function LearnMorePage() {
  const [heroRef, heroClasses] = useScrollAnimation();
  const [problemRef, problemClasses] = useScrollAnimation();
  const [solutionRef, solutionClasses] = useScrollAnimation();
  const [howItWorksRef, howItWorksClasses] = useScrollAnimation();
  const [ctaRef, ctaClasses] = useScrollAnimation();

  return (
    <div className="bg-gray-900 text-gray-300 font-sans overflow-x-hidden">
      <ParticleNew />

      <div className="relative z-10">
        <Link to="/" className="absolute top-5 left-5 text-gray-400 hover:text-white transition-colors z-20">
          &larr; Back to Home
        </Link>

        {/* --- Main Section --- */}
        <section ref={heroRef} className={`min-h-screen flex items-center justify-center text-center px-4 pt-20 pb-10 ${heroClasses}`}>
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">Rethinking Cybersecurity Education</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400">Moving beyond compliance checkboxes to build a truly resilient human firewall.</p>
          </div>
        </section>

        {/* --- The Problem Section --- */}
        <section ref={problemRef} className={`py-16 sm:py-24 px-4 bg-black/20 ${problemClasses}`}>
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Flaw in One-Size-Fits-All</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Most cybersecurity training is a necessary evil—a "tick-the-box" exercise that fails to account for the single most important variable: your employees. A marketing
              professional and an IT admin face vastly different threats, yet receive the same generic content. This leads to disengagement, "security fatigue," and ultimately, a
              weaker defense.
            </p>
          </div>
        </section>

        {/* --- Our Solution Section --- */}
        <section ref={solutionRef} className={`py-16 sm:py-24 px-4 ${solutionClasses}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">The LevelUpSecurity Difference</h2>
              <p className="mt-2 text-lg text-gray-400">Personalized, practical, and powerful.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <UsersIcon className="h-10 w-10 text-sky-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Role-Specific Learning</h3>
                <p className="text-gray-400">
                  Training modules tailored to the unique risks faced by different departments. Your finance team learns about invoice fraud while your developers focus on secure
                  coding.
                </p>
              </div>
              {/* Feature Card 2 */}
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <ShieldCheckIcon className="h-10 w-10 text-sky-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Engaging Simulations</h3>
                <p className="text-gray-400">
                  Go beyond boring videos with interactive phishing tests, business email compromise scenarios, and other real-world simulations that build muscle memory.
                </p>
              </div>
              {/* Feature Card 3 */}
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <ChartBarIcon className="h-10 w-10 text-sky-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Actionable Analytics</h3>
                <p className="text-gray-400">
                  A clear dashboard for leadership to track progress, identify high-risk departments or individuals, and measure the tangible improvement in your security posture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section ref={howItWorksRef} className={`py-16 sm:py-24 px-4 bg-black/20 ${howItWorksClasses}`}>
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">A Simple, Powerful Process</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-4 text-6xl font-black text-sky-500/30">01</div>
                <h3 className="text-2xl font-bold text-white pl-4 border-l-4 border-sky-500">Assess</h3>
                <p className="mt-2 text-gray-400 ml-5">
                  We start with a baseline assessment to understand your organization's unique threat landscape and current employee knowledge gaps.
                </p>
              </div>
              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-4 text-6xl font-black text-sky-500/30">02</div>
                <h3 className="text-2xl font-bold text-white pl-4 border-l-4 border-sky-500">Train</h3>
                <p className="mt-2 text-gray-400 ml-5">
                  Deploy personalized learning paths and simulations that are relevant, engaging, and designed to build lasting security habits.
                </p>
              </div>
              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-4 text-6xl font-black text-sky-500/30">03</div>
                <h3 className="text-2xl font-bold text-white pl-4 border-l-4 border-sky-500">Measure</h3>
                <p className="mt-2 text-gray-400 ml-5">Continuously track performance, identify areas for improvement, and demonstrate the ROI of a stronger human firewall.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section ref={ctaRef} className={`py-16 sm:py-24 px-4 ${ctaClasses}`}>
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Level Up Your Security?</h2>
            <p className="mt-4 text-lg text-gray-400">
              Stop wasting resources on ineffective training. See how personalized education can turn your biggest risk into your strongest asset.
            </p>
            <div className="mt-8">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                <Link to="/auth/signup">Start Now</Link>
              </button>
            </div>
          </div>
        </section>

        <footer className="py-8 px-4 border-t border-gray-800">
          <div className="container mx-auto text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} LevelUpSecurity. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
