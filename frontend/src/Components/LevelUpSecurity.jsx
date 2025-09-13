import React, { useState, useEffect, useRef } from 'react';
import {SunIcon, MoonIcon, ShieldCheckIcon, UserGroupIcon, PuzzleIcon} from '../assets/icons'

// --- Particle Background Component ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Particle {
      constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dirX = -this.dirX;
        if (this.y > canvas.height || this.y < 0) this.dirY = -this.dirY;
        this.x += this.dirX;
        this.y += this.dirY;
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 0.4) - 0.2;
        let dirY = (Math.random() * 0.4) - 0.2;
        let color = 'rgba(12, 186, 255, 0.5)';
        particles.push(new Particle(x, y, dirX, dirY, size, color));
      }
    };
    
    const connect = () => {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                    + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(14, 165, 233, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', () => {
          resizeCanvas();
          init();
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0"></canvas>;
};


// --- Main App Component ---

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const featuresRef = useRef(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Trigger animations on initial load
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Set up observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const FeatureCard = ({ icon, title, children, delay }) => (
    <div
      className={`bg-white/5 dark:bg-gray-800/40 p-6 rounded-xl border border-white/10 dark:border-gray-700/50 shadow-lg backdrop-blur-sm transform hover:-translate-y-2 transition-all duration-500 ${
        featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: delay }}
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sky-500 text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-400 dark:text-gray-300">{children}</p>
    </div>
  );

  return (
    <div className="bg-gray-900 dark:bg-gray-900 text-gray-300 font-sans transition-colors duration-300 overflow-x-hidden">
      
      <ParticleBackground />
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-900 to-sky-900/40 dark:from-gray-900 dark:to-black opacity-50 z-0"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* --- Header --- */}
        <header className={`container mx-auto px-6 py-4 flex justify-between items-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-2xl font-bold text-white">
            LevelUp<span className="text-sky-400">Security</span>
          </div>
          <nav className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors">
              {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            <button className="hidden md:block text-white hover:text-sky-400 transition-colors">Log In</button>
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
              Sign Up
            </button>
          </nav>
        </header>

        {/* --- Main Section --- */}
        <main className="flex-grow flex items-center">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Stop "Tick-the-Box" Security Training.
              </h1>
              <p className={`text-lg md:text-xl text-gray-400 dark:text-gray-300 mb-8 transition-all duration-700 ease-out delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Generic training fails. LevelUpSecurity provides relevant, role-specific cybersecurity education that turns your employees from a liability into your first line of defense.
              </p>
              <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 w-full sm:w-auto px-6 md:px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  Request a Demo
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 w-full sm:w-auto px-6 md:px-8 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* --- Features Section --- */}
      <section id="features" ref={featuresRef} className="py-16 md:py-20 bg-gray-900/50 dark:bg-black/20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why LevelUpSecurity?</h2>
            <p className="text-lg text-gray-400 mt-2">Move beyond one-size-fits-all awareness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              delay="100ms"
              icon={<UserGroupIcon className="w-6 h-6"/>}
              title="Role-Specific Paths"
            >
              From marketing to IT, our training adapts to the unique threats each employee faces, making learning relevant and effective.
            </FeatureCard>
            <FeatureCard
              delay="200ms"
              icon={<PuzzleIcon className="w-6 h-6"/>}
              title="Engaging & Interactive"
            >
              Say goodbye to security fatigue. Our gamified modules and real-world simulations keep employees engaged and vigilant.
            </FeatureCard>
            <FeatureCard
              delay="300ms"
              icon={<ShieldCheckIcon className="w-6 h-6"/>}
              title="Reduce Human Error"
            >
              Empower your team to recognize and report threats. Proactive education is the most powerful shield against cyberattacks.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 dark:bg-gray-900 border-t border-white/10 dark:border-gray-800">
        <div className="container mx-auto px-6 py-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} LevelUpSecurity. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}