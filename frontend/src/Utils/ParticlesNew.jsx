import { useEffect, useRef, useState } from 'react';


const ParticleNew = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-50"></canvas>;
};

export default ParticleNew;