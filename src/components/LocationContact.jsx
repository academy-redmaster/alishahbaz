import {
  ArrowUpRight,
  Clock,
  CoffeeIcon,
  Compass,
  Globe,
  MapPin,
  Monitor,
  Plane,
  Sun,
  Wifi,
} from "lucide-react";
import Card from "./Card";

const LocationContact = ({ currentTime, greeting }) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-200">
            <Compass size={12} className="text-amber-600" />
            <span className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.2em]">
              Where to find me
            </span>
          </div>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        {/* Map Card */}
        <Card
          href="https://maps.google.com/?q=Tehran,Iran"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:shadow-2xl"
        >
          <div className="relative bg-linear-to-br from-gray-900 to-gray-800">
            <div className="relative h-64">
              <div className="absolute inset-0 opacity-[0.08]">
                <div className="grid grid-cols-8 h-full">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="border-r border-white" />
                  ))}
                </div>
                <div className="grid grid-rows-5 h-full absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b border-white" />
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-16 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 animate-ping" />
                    <div className="absolute inset-4 rounded-full border-2 border-amber-400/30 animate-pulse" />
                    <div className="absolute inset-8 rounded-full bg-amber-400/10 backdrop-blur-sm flex items-center justify-center">
                      <MapPin
                        size={40}
                        className="text-amber-400"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-4">
                <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gray-900/90 backdrop-blur-md rounded-full border border-amber-400/30 shadow-xl mx-auto">
                  <MapPin size={18} className="text-amber-400" />
                  <span className="text-base md:text-lg font-bold text-white tracking-wide">
                    Tehran, Iran
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-amber-400/60 group-hover:text-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-400">
                  Live Location
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-linear-to-t from-gray-900/90 to-transparent">
              <span className="text-[11px] text-gray-400 flex items-center gap-2">
                <Globe size={20} className="text-amber-400/60" />
                Click to open in Google Maps
              </span>
              <span className="text-[11px] text-gray-500">📍 Tehran</span>
            </div>
          </div>
        </Card>
        {/* 3 Info Cards - Location with gap */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-linear-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 p-5 hover:shadow-lg hover:border-amber-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-500" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-amber-200/50 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <MapPin size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">
                    Based In
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    Tehran, Iran
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available worldwide</span>
              </div>
            </div>
          </Card>

          <Card className="bg-linear-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 p-5 hover:shadow-lg hover:border-amber-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-500" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-amber-200/50 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <Clock size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">
                    Timezone
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    IRST (UTC+3:30)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sun size={14} className="text-amber-500" />
                <span>
                  {currentTime} — {greeting}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-linear-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 p-5 hover:shadow-lg hover:border-amber-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-500" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-amber-200/50 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <Monitor size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">
                    Work Style
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    Remote First
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Wifi size={14} className="text-amber-500" />
                <span>Flexible · 9AM — 6PM</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-2">
            <Plane size={20} className="text-gray-500" />
            <span className="text-[16px] text-gray-600">Remote worldwide</span>
          </div>
          <span className="w-px h-6 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <CoffeeIcon size={20} className="text-gray-500" />
            <span className="text-[16px] text-gray-600">
              Always available for a chat
            </span>
          </div>
          <span className="w-px h-6 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-gray-500" />
            <span className="text-[16px] text-gray-600">
              Open to relocation
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationContact;
