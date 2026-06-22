import { useState, useEffect } from "react";
import WindowControl from "../components/WindowControl";
import windowWrapper from "#hoc/windowWrapper";
import {
  Check,
  Hash,
  Search,
  Sparkles,
  GraduationCap,
  User,
} from "lucide-react";
import { layers, navigationTabs, techStack } from "#constants";
import { motion } from "framer-motion";

import CategoryDisplay from "#components/CategoryDisplay";
import StarRating from "#components/StarRating";
import RenderIcon from "#components/RenderIcon";

const Terminal = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [animatedCount, setAnimatedCount] = useState(0);

  const filteredData = techStack.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const getTechnologiesByLayer = (categories) => {
    return filteredData.filter((item) => categories.includes(item.category));
  };

  const totalTechnologies = filteredData.reduce(
    (acc, curr) => acc + curr.items.length,
    0,
  );
  const totalCategories = filteredData.length;

  const visibleLayers = activeFilter === "personalize" ? [] : layers;

  useEffect(() => {
    const target = totalTechnologies;
    let start = 0;
    const duration = 800;
    const steps = 30;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setAnimatedCount(target);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(start));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [totalTechnologies]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const personalizeItems = filteredData.filter(
    (item) => item.type === "personalize",
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* ===== HEADER ===== */}
      <div
        id="window-header"
        className="border-b border-slate-200 bg-white/90 backdrop-blur-md shrink-0"
      >
        <div className="flex items-center justify-between gap-4 px-6 py-3">
          <WindowControl target={"terminal"} />

          <h2 className="text-[11px] font-semibold text-slate-600 tracking-[0.2em] uppercase select-none flex items-center gap-2">
            Skill Matrix
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1 px-6 pb-4">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-1.5 text-[11px] font-semibold rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon size={13} strokeWidth={2} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="relative flex items-center gap-2 px-4 py-2 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/60 min-w-72 transition-all duration-300 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-100/50">
            <Search size={14} className="text-gray-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search courses..."
              readOnly
              className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-gray-700 placeholder:text-gray-400 cursor-default"
            />
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
        {/* ===== CREATIVE SUMMARY STATS ===== */}
        <div className="mb-10 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="flex items-start gap-6">
              <motion.div
                variants={itemVariants}
                className="shrink-0 flex flex-col gap-2"
              >
                <div className="flex items-start relative">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                    className="text-[80px] font-black leading-[0.8] select-none tabular-nums text-slate-900"
                  >
                    {String(animatedCount).padStart(2, "0")}
                  </motion.span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -top-1 -right-5"
                  >
                    <Sparkles size={16} className="text-yellow-400" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-3 pl-1">
                  <div className="w-8 h-0.5 bg-slate-300" />
                  <div className="flex items-center gap-2">
                    <GraduationCap
                      size={14}
                      className="text-slate-600"
                      strokeWidth={1.5}
                    />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-700">
                      Total Skills
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col justify-end pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#000000] tracking-tight text-left">
                      {activeFilter === "personalize" ? "Personal" : "Tech"}
                    </span>
                    <span className="text-2xl sm:text-3xl font-thin text-[#000000]/15">
                      +
                    </span>
                    <span className="text-3xl sm:text-4xl font-light text-[#000000]/40 tracking-tight">
                      {activeFilter === "personalize" ? "Soft" : "Stack"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-px bg-[#000000]/15" />
                    <span className="text-[8px] font-mono text-[#000000]/25 tracking-[0.2em] uppercase">
                      {activeFilter === "personalize" ? "eq" : "iq"}
                    </span>
                    <div className="w-6 h-px bg-[#000000]/15" />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-1.5 pl-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#000000]/40" />
                    <div className="w-6 h-px bg-[#000000]/15" />
                  </div>
                  <p className="text-sm sm:text-base text-[#000000]/40 font-light tracking-wide text-left">
                    {activeFilter === "personalize" ? (
                      <span className="flex items-center gap-2">
                        <span className="text-[#000000]/15">⌇</span>
                        where people &amp; purpose meet
                        <span className="text-[#000000]/15">⌇</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span className="text-[#000000]/15">⌇</span>
                        where ideas become reality
                        <span className="text-[#000000]/15">⌇</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <CategoryDisplay count={totalCategories} />
          </div>
        </div>

        {/* ===== CONTENT RENDER ===== */}
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Search size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium text-base">
              No technologies found
            </p>
          </div>
        ) : activeFilter === "personalize" ? (
          <div className="space-y-6">
            {filteredData.map(({ category, items, level }) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    <h3 className="text-sm font-bold text-slate-800">
                      {category}
                    </h3>
                  </div>
                  <StarRating level={level} />
                </div>
                <div className="w-full h-px bg-linear-to-r from-slate-200 via-slate-100 to-transparent" />
                <div className="flex flex-wrap gap-2 pl-8">
                  {items.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700"
                    >
                      {RenderIcon(item, 16)}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-12">
              {visibleLayers.map((layer) => {
                const layerTechs = getTechnologiesByLayer(layer.categories);

                if (layerTechs.length === 0) return null;

                return (
                  <section key={layer.id} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                        <layer.icon size={16} className="text-slate-700" />
                      </div>
                      <h2 className="text-start text-sm font-bold text-slate-800 tracking-wide">
                        {layer.title}
                      </h2>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    <div className="space-y-6 pl-4 border-l-2 border-slate-200">
                      {layerTechs.map(({ category, items, level }) => (
                        <div key={category} className="space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-slate-800 shadow-sm" />
                              <h3 className="text-sm font-bold text-slate-800">
                                {category}
                              </h3>
                            </div>
                            <StarRating level={level} />
                          </div>

                          <div className="w-full h-px bg-linear-to-r from-slate-200 via-slate-100 to-transparent" />

                          <div className="flex flex-wrap gap-2 pl-8">
                            {items.map((item, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200 text-sm font-medium text-slate-700"
                              >
                                {RenderIcon(item, 16)}
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {activeFilter === "all" && personalizeItems.length > 0 && (
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                    <User size={16} className="text-slate-700" />
                  </div>
                  <h2 className="text-start text-sm font-bold text-slate-800 tracking-wide">
                    Personal & Soft Skills
                  </h2>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <div className="space-y-6 pl-4 border-l-2 border-slate-200">
                  {personalizeItems.map(({ category, items }) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-800 shadow-sm" />
                        <h3 className="text-sm font-bold text-slate-800">
                          {category}
                        </h3>
                      </div>

                      <div className="w-full h-px bg-linear-to-r from-slate-200 via-slate-100 to-transparent" />

                      <div className="flex flex-wrap gap-2 pl-8">
                        {items.map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200 text-sm font-medium text-slate-700"
                          >
                            {RenderIcon(item, 16)}
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ===== FOOTER ===== */}
        <div className="mt-14 pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Hash size={12} />
                <span>{totalCategories} categories</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Hash size={12} />
                <span>{totalTechnologies} technologies</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
                <Check size={12} className="text-emerald-600" />
                Production Ready
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                v2.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");

export default TerminalWindow;
