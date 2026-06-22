import dayjs from "dayjs";

const TimeDisplay = () => {
  return (
    <>
      {/* Time Display */}
      <div className="ml-1.5 relative group">
        <div className="px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 cursor-default overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/5 group-hover:to-white/5 transition-all duration-700" />

          <div className="relative flex items-center gap-3.5">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-mono font-bold text-white group-hover:text-white/90 transition-all duration-300">
                {dayjs().format("hh")}
              </span>
              <span className="text-lg font-mono font-light text-white/30 group-hover:text-white/50 transition-colors duration-300">
                :
              </span>
              <span className="text-xl font-mono font-bold text-white group-hover:text-white/90 transition-all duration-300">
                {dayjs().format("mm")}
              </span>
              <span className="text-[11px] font-mono font-medium text-white/30 group-hover:text-white/50 transition-colors duration-300 ml-0.5">
                {dayjs().format("A")}
              </span>
            </div>

            <div className="hidden sm:block w-px h-7 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />

            <div className="hidden md:flex flex-col">
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/30 group-hover:text-white/50 transition-colors duration-300">
                {dayjs().format("dddd")}
              </span>
              <span className="text-[11px] font-mono font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                {dayjs().format("MMM D, YYYY")}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 ml-0.5">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-emerald-400/70 group-hover:text-emerald-400 transition-colors duration-300">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeDisplay;