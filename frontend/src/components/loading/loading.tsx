import { memo } from "react";

const Loading = ({ isBgColor = true }: { isBgColor?: boolean }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isBgColor ? "bg-white" : ""
      }`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default memo(Loading);
