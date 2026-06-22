import { Star, StarHalf } from "lucide-react";
const StarRating = ({ level }) => {
  const getStars = (lvl) => {
    const map = { Expert: 5, Advanced: 4, Intermediate: 3, Learning: 2 };
    return map[lvl] || 0;
  };

  const totalStars = getStars(level);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= totalStars;
        const isHalf = star === Math.ceil(totalStars) && totalStars % 1 !== 0;

        return (
          <div key={star} className="relative">
            {isFull ? (
              <Star
                size={14}
                className="fill-yellow-400 text-yellow-400"
                strokeWidth={1.5}
              />
            ) : isHalf ? (
              <StarHalf
                size={14}
                className="fill-yellow-400 text-yellow-400"
                strokeWidth={1.5}
              />
            ) : (
              <Star size={14} className="text-slate-200" strokeWidth={1.5} />
            )}
          </div>
        );
      })}
      <span className="text-[10px] font-medium text-slate-400 ml-1">
        {totalStars}/5
      </span>
    </div>
  );
};

export default StarRating;
