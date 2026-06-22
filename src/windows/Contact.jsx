import WindowControl from "../components/WindowControl";
import windowWrapper from "#hoc/windowWrapper";
import {
  MapPin,
  Heart,
  Coffee,
  Clock,
  Calendar,
  Sun,
  Moon,
  Cloud,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo } from "react";
import FeedBackForm from "#components/FeedBackForm";
import LocationContact from "#components/LocationContact";
import AboutContact from "#components/AboutContact";
import SocialContact from "#components/SocialContact";
import EmailContact from "#components/EmailContact";

const Contact = () => {
  const { currentTime, greeting, dayName, fullDate, timeIcon } = useMemo(() => {
    const tehranTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Tehran",
    });
    const date = new Date(tehranTime);
    const hour = date.getHours();

    let greeting;
    let timeIcon;
    if (hour < 12) {
      greeting = "Morning";
      timeIcon = <Sun size={16} className="text-gray-500" />;
    } else if (hour < 17) {
      greeting = "Afternoon";
      timeIcon = <Cloud size={16} className="text-gray-500" />;
    } else if (hour < 22) {
      greeting = "Evening";
      timeIcon = <Moon size={16} className="text-gray-500" />;
    } else {
      greeting = "Night";
      timeIcon = <Moon size={16} className="text-gray-500" />;
    }

    const currentTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const fullDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return {
      currentTime,
      greeting,
      dayName,
      fullDate,
      timeIcon,
    };
  }, []);

  return (
    <>
      {/* === window Header === */}
      <div id="window-header" className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-5 py-3 w-full">
          <div className="flex items-center gap-2">
            <WindowControl target={"contact"} />
          </div>
          <h2 className="text-[12px] font-bold text-gray-800 tracking-[0.2em] uppercase select-none">
            contact.US
          </h2>
          <div className="flex items-center gap-3">
            <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <PanelLeft size={15} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-0.5">
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <ChevronLeft size={15} strokeWidth={1.5} />
              </button>
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <ChevronRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-14">
          {/* === HERO === */}
          <div className="text-center space-y-6 py-4">
            <div className="inline-flex items-center gap-5 px-8 py-4 bg-gray-50 rounded-full border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Coffee size={24} className="text-amber-600" />
                </div>
                <div className="w-px h-8 bg-gray-200" />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {timeIcon}
                  <span className="text-[15px] font-semibold text-gray-700">
                    {greeting}
                  </span>
                </div>
                <span className="text-gray-300">·</span>
                <Clock size={16} className="text-gray-500" />
                <span className="text-[15px] font-mono font-bold text-gray-900 tabular-nums">
                  {currentTime}
                </span>
              </div>

              <div className="w-px h-8 bg-gray-200" />

              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-[15px] font-semibold text-gray-700">
                  {dayName}
                </span>
                <span className="text-gray-300">—</span>
                <span className="text-[14px] font-medium text-gray-500">
                  {fullDate}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
                Let's grab a
                <br />
                <span className="italic font-serif font-light text-gray-400 inline-flex items-center gap-2">
                  virtual coffee
                  <Coffee
                    size={40}
                    className="text-amber-500 inline-block ml-2 animate-bounce"
                    strokeWidth={1.5}
                  />
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                Got an idea? A project? Or just want to talk shop?
                <br />
                <span className="font-semibold text-gray-800">
                  I'm all ears.
                </span>
              </p>
            </div>
          </div>
          {/* === ABOUT + PROFILE COMBO === */}
          <AboutContact />
          {/* === EMAIL CARD === */}
          <EmailContact />
          {/* === SOCIALS - Redesigned === */}
          <SocialContact />
          {/* === FEEDBACK FORM === */}
          <FeedBackForm />
          {/* === LOCATION SECTION === */}
          <LocationContact currentTime={currentTime} greeting={greeting} />
          {/* === FOOTER === */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 text-[12px] text-gray-500 font-medium">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-default">
                <MapPin size={16} className="text-gray-500" />
                Tehran, IR — worldwide remote
              </span>
              <span className="hidden sm:block text-gray-300">·</span>
              <span className="flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-default">
                <Heart size={16} className="text-rose-400 fill-rose-400" />
                Open to exciting opportunities
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">V 1.0.0</span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="text-sm text-gray-500">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ContactWindow = windowWrapper(Contact, "contact");

export default ContactWindow;
