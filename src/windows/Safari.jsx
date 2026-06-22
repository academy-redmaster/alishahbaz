import CourseCard from "#components/CourseCard";
import WindowControl from "../components/WindowControl";
import { courses } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import { motion } from "framer-motion";
import {
  Search,
  ShieldHalf,
  Share,
  Plus,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  GraduationCap,
  Download,
  Sparkles,
  Layers,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

const Safari = () => {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = courses.length / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= courses.length) {
        setAnimatedCount(courses.length);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* === HEADER WITH GLASSMORPHISM === */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        id="window-header"
        className="border-b border-white/20 bg-white/80 backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="flex items-center justify-between px-5 py-3 w-full">
          <div className="flex items-center gap-2">
            <WindowControl target={"safari"} />
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-200"
            >
              <PanelLeft size={16} strokeWidth={1.5} />
            </motion.button>

            <div className="flex items-center gap-0.5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 transition-all duration-200"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 transition-all duration-200"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </motion.button>
            </div>

            <div className="relative flex items-center gap-2 px-4 py-2 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/60 min-w-72 transition-all duration-300 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-100/50">
              <Search size={14} className="text-gray-400" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search courses..."
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-gray-700 placeholder:text-gray-400 cursor-default"
              />
              <div className="w-px h-5 bg-gray-200" />
              <ShieldHalf
                size={14}
                className="text-blue-400"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex items-center gap-1">
              {[
                { icon: Download, label: "Download" },
                { icon: Share, label: "Share" },
                { icon: Plus, label: "Add" },
              ].map(({ icon: Icon, label }, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.08, rotate: idx === 2 ? 90 : 0 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 transition-all duration-200 relative group"
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* === CONTENT === */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-linear-to-br from-white via-gray-50/30 to-blue-50/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
          {/* === HERO HEADER === */}
          <motion.div
            variants={itemVariants}
            className="relative pb-12 border-b border-gray-200/50"
          >
            {/* Decorative linear blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-linear-to-tr from-emerald-400/5 to-cyan-400/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative">
              {/* Left: Animated Counter */}
              <motion.div
                variants={itemVariants}
                className="shrink-0 hidden md:flex flex-col gap-3"
              >
                <div className="flex items-start relative">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                    className="text-[120px] font-black leading-[0.8] select-none tabular-nums text-black"
                  >
                    {String(animatedCount).padStart(2, "0")}
                  </motion.span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -top-2 -right-6"
                  >
                    <Sparkles size={20} className="text-yellow-400" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-3 pl-1">
                  <div className="w-8 h-0.5 bg-linear-to-r from-blue-400 to-purple-400" />
                  <div className="flex items-center gap-2">
                    <GraduationCap
                      size={14}
                      className="text-blue-500"
                      strokeWidth={1.5}
                    />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Total Courses
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Counter */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 md:hidden"
              >
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-5xl font-black text-black"
                >
                  {String(animatedCount).padStart(2, "0")}
                </motion.span>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <GraduationCap
                      size={12}
                      className="text-blue-500"
                      strokeWidth={1.5}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Total Courses
                    </span>
                  </div>
                  <div className="w-10 h-px bg-linear-to-r from-blue-400 to-purple-400" />
                </div>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-end gap-6 pt-0 md:pt-2 flex-1"
              >
                <div className="space-y-5">
                  <div className="relative">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
                    >
                      <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                        Courses & Certifications
                      </span>
                    </motion.h1>

                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 12 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -top-3 -right-2 hidden md:flex items-center justify-center w-16 h-16 rounded-full border-2 border-blue-200/50 bg-linear-to-br from-blue-50 to-purple-50 shadow-lg select-none"
                    >
                      <span className="text-[8px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 leading-tight text-center">
                        Verified
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-3 pl-1"
                  >
                    <p className="text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">
                      A curated collection of professional courses and
                      certifications completed across leading platforms and
                      specialized domains.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="font-medium">
                          Updated: {courses[0]?.date || "Recently"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                          <Layers size={12} />
                          {courses.length} Courses
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">
                          <Clock size={12} />
                          2024-2025
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* === GRID === */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>

          {/* === FOOTER DECORATION === */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center pt-8"
          >
            <div className="flex items-center gap-8 text-xs text-gray-400">
              <span>✨ {courses.length} courses</span>
              <span className="w-px h-4 bg-gray-200" />
              <span>
                📚 {courses.filter((c) => c.level === "Advanced").length}{" "}
                advanced
              </span>
              <span className="w-px h-4 bg-gray-200" />
              <span>
                🎯 {courses.filter((c) => c.level === "Beginner").length}{" "}
                beginner
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const SafariWindow = windowWrapper(Safari, "safari");
export default SafariWindow;