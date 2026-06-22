import { Heart, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const DropdownMenu = ({ items, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isVisible
            ? "bg-black/85 backdrop-blur-lg"
            : "bg-black/0 backdrop-blur-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`
            relative w-full max-w-4xl
            bg-linear-to-br from-[#1e2128] to-[#2a2e36]
            rounded-3xl
            shadow-[0_50px_150px_rgba(0,0,0,0.9)]
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}
            flex flex-col
            overflow-hidden
            border border-[#4a5059]/40
          `}
          style={{
            height: "65vh",
            minHeight: "500px",
            maxHeight: "680px",
          }}
        >
          {/* Header */}
          <div className="relative px-8 py-6 border-b border-[#4a5059]/30 shrink-0 bg-linear-to-r from-[#1e2128] to-[#282d35]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#3d434d] to-[#2c3038] flex items-center justify-center ring-2 ring-[#4a5059]">
                    <Heart
                      size={22}
                      className="text-[#f0f2f5]"
                      fill="#f0f2f5"
                      fillOpacity="0.15"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#6abf9e] ring-2 ring-[#1e2128]" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-[#f0f2f5] tracking-tight">
                    Connect With Me
                  </h1>
                  <p className="text-sm text-[#a8b0b8] mt-0.5 flex items-center gap-2">
                    <span>Choose your preferred platform</span>
                    <span className="w-1 h-1 rounded-full bg-[#5a626a]" />
                    <span className="text-xs text-[#7a828a]">
                      {items.length} channels
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-[#2c3038] flex items-center justify-center hover:bg-[#3d434d] transition-all hover:scale-105 ring-1 ring-[#3d434d] hover:ring-[#4a5059]"
              >
                <X size={18} className="text-[#c8d0d8]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Left Column */}
            <div className="w-[30%] p-6 bg-[#252a32]/60 border-r border-[#4a5059]/20 flex flex-col">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-[#3d434d] to-[#2c3038] flex items-center justify-center ring-1 ring-[#4a5059] mx-auto">
                  <MessageCircle
                    size={36}
                    className="text-[#f0f2f5]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f0f2f5]">
                    Quick Chat
                  </h3>
                  <p className="text-sm text-[#b0b8c0] mt-1 leading-relaxed">
                    Get instant responses on any platform
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm px-3 py-2 rounded-xl bg-[#282d35]/60">
                    <span className="text-[#a8b0b8]">Response time</span>
                    <span className="text-[#6abf9e] font-medium">
                      &lt; 5 min
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm px-3 py-2 rounded-xl bg-[#282d35]/60">
                    <span className="text-[#a8b0b8]">Active now</span>
                    <span className="text-[#f0f2f5] font-medium">Yes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Platform List */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-2">
                {items.map((item, i) => {
                  const IconComponent = item.icon;
                  const label = item?.label || "Unknown";
                  const description = item?.description || "";
                  const link = item?.link || "#";
                  const color = item?.color || "hover:border-[#4a5059]/30";

                  return (
                    <a
                      key={item?.id || i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        item?.action?.();
                        onClose();
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                      className={`
                        group flex items-center gap-4 p-4 rounded-2xl
                        transition-all duration-300
                        cursor-pointer relative
                        border border-transparent
                        ${color}
                        ${activeIndex === i ? "bg-[#2c313a] ring-1 ring-[#4a5059] scale-[1.02]" : "hover:bg-[#2c313a]/50 hover:scale-[1.01]"}
                      `}
                      style={{
                        animationDelay: `${i * 40}ms`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                          ? "translateX(0)"
                          : "translateX(-10px)",
                        transition: `all 300ms ease-out ${i * 40}ms`,
                      }}
                    >
                      {/* Platform Icon */}
                      <div className="w-12 h-12 rounded-xl bg-[#2c3038] flex items-center justify-center shrink-0 ring-1 ring-[#3d434d] group-hover:ring-[#4a5059] transition-all group-hover:scale-110">
                        <IconComponent
                          size={22}
                          className={`
                            transition-colors duration-300
                            ${activeIndex === i ? "text-[#f0f2f5]" : "text-[#c8d0d8]"}
                          `}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Info - Improved description visibility */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm font-semibold transition-colors duration-300 ${activeIndex === i ? "text-white" : "text-[#e8ecf1]"}`}
                        >
                          {label}
                        </h4>
                        {/* Description with much better contrast */}
                        <p
                          className={`
                          text-sm mt-1 transition-all duration-300
                          leading-relaxed
                          ${
                            activeIndex === i
                              ? "text-[#d0d8e0] opacity-100"
                              : "text-[#b0b8c0] opacity-90"
                          }
                          line-clamp-2
                        `}
                        >
                          {description || "No description available"}
                        </p>
                      </div>

                      {/* Badge & Arrow */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#2c3038] text-[#a8b0b8] ring-1 ring-[#3d434d] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                          open
                        </span>
                        <ArrowUpRight
                          size={16}
                          className={`transition-all duration-300 ${activeIndex === i ? "text-[#f0f2f5] translate-x-0 opacity-100" : "text-[#5a626a] -translate-x-1 opacity-0"}`}
                        />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-3.5 border-t border-[#4a5059]/30 shrink-0 bg-[#282d35] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#9aa2aa]">Press</span>
              <kbd className="px-2 py-1 rounded-lg bg-[#2c3038] text-xs text-[#c8d0d8] ring-1 ring-[#3d434d] font-mono">
                ESC
              </kbd>
              <span className="text-sm text-[#9aa2aa]">to close</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#9aa2aa]">
              <span>Secure connection</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6abf9e]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;