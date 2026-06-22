import { Quote, Star } from "lucide-react"

const AboutContact = () => {
  return (
    <>
    <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-12 gap-4">
              {/* Left - Profile Card */}
              <div className="md:col-span-5">
                <div className="relative h-full rounded-3xl bg-[#393D44] p-8 flex flex-col items-center text-center overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-700" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-400/5 rounded-full blur-2xl" />
                  <div className="absolute inset-0 rounded-3xl p-1 bg-linear-to-br from-amber-400/20 via-transparent to-amber-400/20" />

                  <div className="relative z-10 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full text-[9px] font-bold text-amber-400 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Active
                    </span>
                  </div>

                  <div className="relative z-10 mb-5">
                    <div className="absolute -inset-3 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full bg-linear-to-br from-amber-400 to-amber-500 p-1 shadow-2xl shadow-amber-400/20">
                        <div className="w-full h-full rounded-full bg-[#393D44] p-1">
                          <img
                            src="/images/me/1.png"
                            className="w-full h-full rounded-full object-cover"
                            alt="Ali Shahbaz"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center ring-2 ring-[#393D44] shadow-lg shadow-amber-400/20">
                        <Star
                          size={13}
                          className="text-[#393D44] fill-[#393D44]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      Ali Shahbaz
                    </h2>
                    <p className="text-sm text-gray-400 font-medium">
                      Full-Stack JavaScript Developer
                    </p>
                  </div>

                  <div className="relative z-10 w-full space-y-2 mb-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-medium">
                        Years Experience
                      </span>
                      <span className="text-xl font-black text-white">4+</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-medium">
                        Projects Delivered
                      </span>
                      <span className="text-xl font-black text-white">10+</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-medium">
                        Client Satisfaction
                      </span>
                      <span className="text-xl font-black text-amber-400">
                        100%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - About Content */}
              <div className="md:col-span-7">
                <div className="h-full rounded-3xl bg-white border border-gray-200 p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                          <Quote size={16} className="text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          About Me
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 ml-10">
                        Building the future, one line at a time
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-amber-400"
                          style={{ opacity: 0.3 + i * 0.3 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">
                        Full-Stack JavaScript Developer
                      </span>{" "}
                      specializing in{" "}
                      <span className="font-semibold text-amber-600">
                        React.js, Next.js, and Node.js
                      </span>{" "}
                      with experience building scalable and high-performance web
                      applications. Skilled in designing clean, maintainable
                      front-end architectures and developing robust backend
                      systems using modern JavaScript ecosystems.
                    </p>

                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Focused on writing reusable components, optimizing
                      performance, and delivering seamless user experiences.
                      Experienced in translating complex requirements into
                      production-ready applications through both educational and
                      real-world projects.
                    </p>

                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Passionate about{" "}
                      <span className="font-semibold text-gray-900">
                        modern web technologies
                      </span>
                      , API-driven development, and building efficient, scalable
                      software solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default AboutContact