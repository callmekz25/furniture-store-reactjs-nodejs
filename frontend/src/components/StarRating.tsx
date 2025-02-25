import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
const StarRating = () => {
  const [rating, setRating] = useState<number>(5);
  const handleClickRating = (index: number) => {
    setRating(index === rating ? 0 : index);
  };

  return (
    <div className="flex gap-2 cursor-pointer z-50">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button key={starIndex} onClick={() => handleClickRating(starIndex)}>
            <StarIcon
              className={`size-7 transition-colors ${
                starIndex <= rating
                  ? "text-yellow-300 fill-yellow-300"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
