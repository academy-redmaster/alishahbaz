import { ArrowUpRight, Sparkles } from "lucide-react";
import Card from "./Card";
import { socialItems } from "#constants";

const SocialContact = () => {
  return (
    <>
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-200">
            <Sparkles size={11} className="text-amber-500" />
            <span className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.2em]">
              Find me online
            </span>
          </div>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {socialItems.map(({ id, icon: Icon, label, description, link }) => {
            const iconColors = {
              1: "text-red-500 group-hover:text-amber-500",
              2: "text-emerald-500 group-hover:text-amber-500",
              3: "text-blue-600 group-hover:text-amber-500",
              4: "text-pink-600 group-hover:text-amber-500",
              5: "text-sky-500 group-hover:text-amber-500",
              6: "text-violet-600 group-hover:text-amber-500",
            };

            const bgColors = {
              1: "bg-red-50 group-hover:bg-amber-50",
              2: "bg-emerald-50 group-hover:bg-amber-50",
              3: "bg-blue-50 group-hover:bg-amber-50",
              4: "bg-pink-50 group-hover:bg-amber-50",
              5: "bg-sky-50 group-hover:bg-amber-50",
              6: "bg-violet-50 group-hover:bg-amber-50",
            };

            return (
              <Card
                key={id}
                href={link}
                target={id === 1 || id === 2 ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 hover:border-amber-400 p-5 hover:shadow-lg hover:shadow-amber-100/20"
              >
                <div className="relative flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${bgColors[id]} flex items-center justify-center transition-all duration-300 shrink-0`}
                  >
                    <Icon
                      size={22}
                      className={`${iconColors[id]} transition-all duration-300 group-hover:scale-110`}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {label}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-amber-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <ArrowUpRight
                          size={14}
                          className="text-gray-400 group-hover:text-amber-500 transition-all duration-200"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5 group-hover:text-gray-700 transition-colors">
                      {description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialContact;
