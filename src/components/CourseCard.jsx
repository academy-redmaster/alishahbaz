import {
  ArrowUpRight,
  Award,
  BookOpen,
  Clock,
  Play,
  User2,
} from "lucide-react";
import { useState } from "react";

const CourseCard = ({ course }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isHovered = hoveredCard === course.id;

  return (
    <div
      className="group/card relative"
      onMouseEnter={() => setHoveredCard(course.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <article
        className={`
          relative flex flex-col h-full
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${isHovered ? "-translate-y-1.5 shadow-lg shadow-gray-200/40" : ""}
        `}
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="aspect-4/3 bg-gray-100">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}

            {!imageError ? (
              <img
                src={course.image}
                alt={course.title}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`
                  w-full h-full object-cover
                  transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                  ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                  ${isHovered ? "scale-[1.03]" : "scale-100"}
                `}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <BookOpen
                  size={32}
                  className="text-gray-300"
                />
              </div>
            )}

            <div
              className={`
                absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent
                transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${isHovered ? "opacity-100" : "opacity-0"}
              `}
            />

            <div
              className={`
                absolute top-3 left-3
                flex items-center gap-1.5
                px-3 py-1.5
                rounded-xl
                bg-white/95 backdrop-blur-md
                border border-gray-200/60
                shadow-sm
                transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${isHovered ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}
              `}
            >
              <span className="text-[11px] font-semibold text-gray-700">
                {course.platform}
              </span>
            </div>

            {course.completed && (
              <div
                className={`
                  absolute top-3 right-3
                  flex items-center gap-1
                  px-2.5 py-1.5
                  rounded-xl
                  bg-white/95 backdrop-blur-md
                  border border-gray-200/60
                  shadow-sm
                  transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                  ${isHovered ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}
                `}
              >
                <Award size={12} className="text-gray-700" />
                <span className="text-[11px] font-bold text-gray-700">
                  Done
                </span>
              </div>
            )}

            <div
              className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}
              `}
            >
              <div
                className={`
                  w-14 h-14 rounded-full
                  bg-white
                  flex items-center justify-center
                  shadow-2xl shadow-black/20
                  transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                  ${isHovered ? "scale-100" : "scale-75"}
                `}
              >
                <Play
                  size={22}
                  className="text-gray-900 ml-0.5"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
              {course.title}
            </h3>
            {course.date && (
              <span className="text-xs font-medium text-gray-500">
                {course.date}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
              <User2 size={13} className="text-gray-400" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {course.instructor}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">
              {course.platform}
            </span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-600">
                  {course.duration}
                </span>
              </div>
            </div>

            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-1.5
                text-xs font-bold
                px-4 py-2 rounded-full
                transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                bg-gray-100 text-gray-600
                group-hover/card:bg-gray-900 group-hover/card:text-white
                group-hover/card:shadow-lg group-hover/card:shadow-gray-900/20
              `}
            >
              <span>View Course</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CourseCard;