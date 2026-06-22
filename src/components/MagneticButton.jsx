import { useRef } from "react";

const MagneticButton = ({ children, className = "", onClick }) => {
  const buttonRef = useRef(null);

  return (
    <div className="relative group">
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`
          relative p-3 rounded-2xl
          bg-black/40
          backdrop-blur-xl
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          hover:bg-black/60
          hover:border-blue-500/50
          hover:scale-105
          transition-all duration-300
          cursor-pointer
          ${className}
        `}
      >
        <div className="relative z-10">{children}</div>
      </button>
    </div>
  );
};
export default MagneticButton;