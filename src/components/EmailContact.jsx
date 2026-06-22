import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

const EmailContact = () => {
  const [copied, setCopied] = useState(false);

  const email = "mr.alishahbaz.1379@gmail.com";
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      <div
        onClick={handleCopyEmail}
        className="relative rounded-3xl bg-linear-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-amber-400 p-10 cursor-pointer transition-all duration-500 group overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl group-hover:bg-amber-400/10 transition-all duration-700" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl group-hover:bg-amber-400/10 transition-all duration-700" />

        <div className="absolute inset-0 opacity-[0.03]">
          <div className="grid grid-cols-8 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border-r border-gray-900" />
            ))}
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]">
                <Mail size={32} className="text-amber-600" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Direct Line
              </p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 break-all font-mono tracking-tight">
                {email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              {copied ? (
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-emerald-700 bg-emerald-50 px-5 py-2.5 rounded-xl border border-emerald-200">
                  <Check size={18} strokeWidth={2.5} />
                  Copied! 🚀
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 group-hover:text-amber-600 transition-all duration-300">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-amber-100 transition-colors shadow-sm">
                    <Copy
                      size={16}
                      className="group-hover:text-amber-600 transition-colors"
                      strokeWidth={1.5}
                    />
                  </span>
                  Click to copy
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-4 pt-4 border-t border-gray-200/50 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-gray-400">
              Available for hire
            </span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-[10px] font-medium text-gray-400">
            Response within 24 hours
          </span>
        </div>
      </div>
    </>
  );
};

export default EmailContact;
