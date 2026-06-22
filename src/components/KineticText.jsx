import { useEffect, useRef } from "react";

const KineticText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll('.letter');
    if (!letters) return;

    letters.forEach((letter, index) => {
      letter.style.animation = `kineticFloat 0.6s ease-out ${index * 0.05}s forwards`;
      letter.style.opacity = '0';
      letter.style.transform = 'translateY(20px) rotateX(20deg)';
    });

    return () => {
      letters.forEach((letter) => {
        letter.style.animation = '';
        letter.style.opacity = '';
        letter.style.transform = '';
      });
    };
  }, [text]);

  return (
    <div ref={containerRef} className="flex items-center perspective-1000">
      {text.split("").map((letter, i) => (
        <span
          key={i}
          className={`
            letter inline-block text-xl
            font-bold bg-linear-to-r from-white to-gray-400
            bg-clip-text text-transparent
            relative
          `}
          style={{
            animation: `kineticFloat 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s forwards`,
            opacity: 0,
            transform: 'translateY(20px) rotateX(20deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {letter === " " ? "\u00A0" : letter}
          
          {/* Glow overlay */}
          <span className="absolute inset-0 opacity-0 transition-all duration-500 glow-effect pointer-events-none"></span>
          
          {/* Particle effects */}
          <span className="absolute inset-0 pointer-events-none particles">
            <span className="particle p1"></span>
            <span className="particle p2"></span>
            <span className="particle p3"></span>
            <span className="particle p4"></span>
            <span className="particle p5"></span>
          </span>
        </span>
      ))}

      
    </div>
  );
};

export default KineticText;