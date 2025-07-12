import IProduct from "@/interfaces/product/product.interface";
import { useEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

const ProductTabs = ({ product }: { product: IProduct }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = contentRef.current;
    if (el && el.scrollHeight > 260) {
      setIsOverflow(true);
    }
  }, []);

  return (
    <div className="mt-4 bg-white px-4 py-2 ">
      <ul className="flex items-center gap-10 border-b border-gray-300 py-3">
        <li className={`font-semibold text-md color-red`}>Mô tả sản phẩm</li>
      </ul>
      <div
        className={`overflow-hidden min-w-full py-4 text-sm transition-all duration-500 product-description  ease-out relative ${
          isExpand ? "max-h-[1500px]" : "max-h-[260px]"
        } `}
      >
        {product?.descr ? (
          <div
            ref={contentRef}
            className="whitespace-pre-wrap text-sm"
            dangerouslySetInnerHTML={{ __html: product.descr }}
          />
        ) : (
          <span className="text-sm">Chưa có mô tả cho sản phẩm này</span>
        )}
        <div
          className={`absolute bottom-0 transition-all duration-300 left-0 w-full h-20 bg-gradient-to-t from-white via-white/80 to-transparent ${
            isExpand || !isOverflow ? "opacity-0 hidden" : "opacity-100 block"
          }  `}
        />
      </div>
      {isOverflow && (
        <div className="flex items-center justify-center">
          <button
            className={`flex transition-all duration-300 hover:bg-red-700 hover:text-white items-center color-red gap-2 border rounded border-red-600 px-3 py-1.5 text-sm`}
            onClick={() => setIsExpand(!isExpand)}
          >
            {isExpand ? (
              <>
                <MinusIcon className="size-4" />
                Rút gọn
              </>
            ) : (
              <>
                <PlusIcon className="size-4" />
                Hiển thị thêm
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
