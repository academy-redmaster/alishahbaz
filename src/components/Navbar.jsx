import { useState, useEffect } from "react";
import { navLinks, socialItems } from "#constants";
import { Share2, Maximize2, Minimize2, Bot } from "lucide-react";
import useWindowStore from "#store/window";
import MagneticButton from "./MagneticButton";
import KineticText from "./KineticText";
import AISearchModal from "./AISearchModal";
import DropdownMenu from "./DropdownMenu";
import TimeDisplay from "./TimeDisplay";
import { FaGithubAlt } from "react-icons/fa";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { openWindow } = useWindowStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsDropdownOpen(false);
        setIsSocialOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fullscreen tracking
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      <nav className="fixed top-3 left-3 right-3 z-50">
        <div className="relative bg-[#393D44] backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-visible">
          <div className="relative flex justify-between items-center px-5 py-2.5">
            {/* Left Section */}
            <div className="flex items-center gap-3.5">
              {/* Logo Button */}
              <div className="relative">
                <MagneticButton
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`
                    transition-all duration-300
                    ${isDropdownOpen ? "bg-white/10 border-white/30" : ""}
                  `}
                >
                  <img
                    src="/images/logo.svg"
                    alt="logo"
                    className="w-5.5 h-5.5 invert"
                  />
                </MagneticButton>
              </div>

              {/* Title */}
              <div className="hidden sm:block">
                <KineticText text="Ali Shahbaz" />
              </div>

              {/* Navigation Links */}
              <ul className="hidden lg:flex items-center gap-1 ml-5">
                {navLinks.map((item) => (
                  <li
                    key={item.id}
                    className="relative"
                    onClick={() => openWindow(item.type)}
                  >
                    <button className="relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border border-transparent text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/5 group">
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Fullscreen Button */}
              <div className="hidden sm:block">
                <MagneticButton
                  onClick={toggleFullscreen}
                  className="hover:border-white/20"
                >
                  {isFullscreen ? (
                    <Maximize2
                      size={19}
                      className="text-white/70 group-hover:text-white transition-colors"
                    />
                  ) : (
                    <Minimize2
                      size={19}
                      className="text-white/70 group-hover:text-white transition-colors"
                    />
                  )}
                </MagneticButton>
              </div>

              {/* Social Media Button */}
              <MagneticButton
                onClick={() => setIsSocialOpen(!isSocialOpen)}
                className={`
                  hover:border-white/20
                  transition-all duration-300
                  ${isSocialOpen ? "bg-white/10 border-white/30" : ""}
                `}
              >
                <Share2
                  size={19}
                  className="text-white/70 group-hover:text-white transition-colors"
                />
              </MagneticButton>

              {/* Search Button */}
              <MagneticButton
                onClick={() => setIsSearchOpen(true)}
                className="hover:border-white/20"
              >
                <Bot
                  size={19}
                  className="text-white/70 group-hover:text-white transition-colors"
                />
              </MagneticButton>

              {/* Github Button */}
              <MagneticButton
                onClick={() => console.log("github clicked")}
                className="hover:border-white/20"
              >
                <a href="https://github.com/academy-redmaster" target="_blank">
                  <FaGithubAlt
                    size={19}
                    className="text-white/70 group-hover:text-white transition-colors"
                  />
                </a>
              </MagneticButton>

              <TimeDisplay />
            </div>
          </div>
        </div>
      </nav>

      {/* Social Media Dropdown */}
      {isSocialOpen && (
        <DropdownMenu
          items={socialItems}
          onClose={() => setIsSocialOpen(false)}
        />
      )}

      {/* Search Modal */}
      <AISearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
