import { StarIcon } from "@heroicons/react/24/outline";

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}
const StarRating = ({ rating = 5, onChange }: StarRatingProps) => {
  const handleClickRating = (index: number, e: MouseEvent) => {
    e.preventDefault();
    onChange(index === rating ? 0 : index); // Nếu bấm lại thì reset về 0
  };

  return (
    <div className="flex gap-2 cursor-pointer z-50">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button
            key={starIndex}
            onClick={(e) => handleClickRating(starIndex, e)}
          >
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
