import { motion } from "framer-motion";

const CategoryDisplay = ({ count }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative flex items-center gap-4"
    >
      <div className="relative h-12 w-px bg-slate-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-300 animate-pulse" />
      </div>

      <div className="flex items-start gap-3">
        <div className="relative">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="text-3xl font-black text-slate-900 tabular-nums leading-none"
          >
            {String(count).padStart(2, "0")}
          </motion.span>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute -bottom-1 left-0 h-0.5 bg-slate-400 rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 leading-none">
            Categories
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-3 h-px bg-slate-300" />
            <span className="text-[9px] text-slate-400 font-medium">
              domains
            </span>
            <div className="w-3 h-px bg-slate-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default CategoryDisplay