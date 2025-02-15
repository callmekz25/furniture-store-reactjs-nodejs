import { useState } from "react";
import LayoutAdmin from "..";
import Input from "../../../components/input";
const AddProduct = () => {
  const [s, setS] = useState<string>("");
  const [a, setA] = useState<number>(1);

  return (
    <LayoutAdmin>
      <div className="bg-[#f6f6f6] px-4 py-8 w-[85%] flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg border-2 border-gray-200">
          <div className=" px-5 py-4 flex flex-col gap-5 font-semibold text-[14px]">
            <Input
              label="Tiêu đề"
              id="product"
              type="text"
              setChange={setS}
              change={s}
            />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AddProduct;
