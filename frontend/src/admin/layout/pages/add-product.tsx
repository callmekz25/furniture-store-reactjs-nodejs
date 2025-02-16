import { useState } from "react";
import LayoutAdmin from "..";

const AddProduct = () => {
  return (
    <LayoutAdmin>
      <div className="bg-[#f6f6f6] px-4 py-8 w-[85%] flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg border-2 border-gray-200">
          <div className=" px-5 py-4 flex flex-col gap-5 font-semibold text-[14px]"></div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AddProduct;
