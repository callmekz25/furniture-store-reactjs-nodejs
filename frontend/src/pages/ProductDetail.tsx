import Layout from "@/layouts";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import Guard from "../assets/guard.webp";
import Refund from "../assets/refund.webp";
import Hotline from "../assets/hotline.webp";
import { useState } from "react";
import useProductBySlug from "@/hooks/useProductBySlug";

const ProductDetail = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const {
    data: product,
    isLoading,
    error,
  } = useProductBySlug("ghe-banh-thu-gian-ngoai-troi-barcelona-xam-nhat");

  const nextSlider = () => {
    if (product?.images && currentIndex < product.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlider = () => {
    if (product?.images && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="lg:px-[100px] px-6 pt-6 pb-32">
        <div className="flex gap-12">
          <div className="lg:w-[45%] flex flex-col gap-4">
            <div className="bg-gray-100 relative flex items-center justify-center">
              <button
                className={`absolute flex items-center justify-center left-5 z-10 top-1/2 -translate-y-1/2 bg-white size-10 rounded-full hover:bg-gray-300 shadow-lg transition-all duration-300 ${
                  currentIndex === 0 ? "hidden" : ""
                } `}
                onClick={() => prevSlider()}
              >
                <ArrowLeftIcon className="size-5" />
              </button>
              <div className="overflow-hidden flex">
                <div
                  className={` flex items-center transition-all duration-500 ease-in-out `}
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {product && product.images ? (
                    product.images.map((image: string) => (
                      <div
                        className="flex-shrink-0 w-full flex items-center justify-center"
                        key={image}
                      >
                        <img
                          src={image}
                          alt="Ảnh chính của sản phẩm"
                          className="object-contain size-full"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
              <button
                className={`absolute flex items-center justify-center right-5 z-10 top-1/2 -translate-y-1/2 bg-white shadow-lg size-10 rounded-full hover:bg-gray-300 transition-all duration-300 ${
                  currentIndex === product?.images.length - 1 ? "hidden" : ""
                } `}
                onClick={() => nextSlider()}
              >
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
            <div className="flex items-center gap-3  overflow-x-scroll scroll-hidden">
              {product && product.images ? (
                product.images.map((image: string, index: number) => (
                  <div
                    className={`border hover:cursor-pointer flex items-center justify-center p-3 border-gray-200 min-w-[120px] ${
                      currentIndex === index ? "border-red-500" : ""
                    }`}
                    key={image}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img
                      src={image}
                      alt="Ảnh từng sản phẩm"
                      className="object-cotain"
                    />
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          <div className="">
            <h3 className="text-2xl font-bold">{product.title}</h3>
            <div className="flex items-center gap-3 mt-2  text-sm font-normal">
              <div className="flex items-center gap-1">
                <span>Mã sản phẩm:</span>
                <span className="font-bold text-red-500">{product.sku}</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <span>Tình trạng:</span>
                <span className="font-bold text-red-500">
                  {product.status ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <span>Thương hiệu:</span>
                <span className="font-bold text-red-500 uppercase">
                  {product.brand}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-32 mt-4">
              <span className="text-sm font-semibold">Giá:</span>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-3xl text-red-500">
                  {product.price}
                </span>
                <span className=" text-lg line-through text-gray-400">
                  {product.fakePrice}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-20 mt-6">
              <span className="text-sm font-semibold">Số lượng:</span>
              <div className="flex items-center gap-4 justify-between border-2 border-gray-200 rounded px-3 py-1">
                <button>
                  <MinusIcon className="size-5" />
                </button>
                <span className="font-semibold">1</span>
                <button>
                  <PlusIcon className="size-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6 font-semibold">
              <button className="border transition-all duration-500 hover:opacity-80 border-black rounded px-4 py-2.5 flex items-center justify-center w-full">
                Thêm vào giỏ hàng
              </button>
              <button className="bg-black text-white transition-all duration-500 hover:opacity-80 rounded px-4 py-2.5 flex items-center justify-center w-full">
                Mua ngay
              </button>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={Guard}
                  alt="Bảo hành"
                  className="size-7  object-contain"
                />
                <span className="text-sm">1 Năm Bảo Hành</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={Refund}
                  alt="Bảo hành"
                  className="size-7  object-contain"
                />
                <span className="text-sm">
                  Hỗ trợ đổi trong 3 ngày cho sản phẩm nguyên giá
                </span>
              </div>
              <div className="flex items-center justify-end gap-2 flex-1">
                <img
                  src={Hotline}
                  alt="Bảo hành"
                  className="size-7 object-contain"
                />
                <span className="text-sm">
                  Hotline: <span className="font-bold">0899348258</span>
                </span>
              </div>
            </div>
            <div className="mt-6 ">
              <h3 className="font-bold text-xl">Mô tả sản phẩm</h3>
              <div
                className={`overflow-hidden text-sm transition-all duration-500 product-description  ease-out relative ${
                  isExpand ? "max-h-[1000px]" : "max-h-[250px]"
                } `}
              >
                <div
                  className="whitespace-pre-wrap mt-4 text-sm border-t border-gray-300 py-5"
                  dangerouslySetInnerHTML={{ __html: product?.descr }}
                />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  quos sint harum nesciunt ipsum, mollitia perspiciatis hic
                  asperiores tenetur officiis enim non, molestiae laboriosam!
                  Quisquam quia exercitationem facere esse quasi?Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Repellendus,
                  provident. Similique voluptates architecto blanditiis quasi
                  sint labore natus at officia quisquam, libero itaque magnam
                  deleniti corrupti soluta recusandae beatae rem. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Qui quos sint
                  harum nesciunt ipsum, mollitia perspiciatis hic asperiores
                  tenetur officiis enim non, molestiae laboriosam! Quisquam quia
                  exercitationem facere esse quasi?Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Repellendus, provident.
                  Similique voluptates architecto blanditiis quasi sint labore
                  natus at officia quisquam, libero itaque magnam deleniti
                  corrupti soluta recusandae beatae rem.
                </p>

                <div
                  className={`absolute bottom-0 transition-all duration-300 left-0 w-full h-20 bg-gradient-to-t from-white via-white/80 to-transparent ${
                    isExpand ? "opacity-0" : "opacity-100"
                  } `}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="flex items-center gap-2 border rounded border-black px-3 py-2 text-sm"
                  onClick={() => setIsExpand((prev) => !prev)}
                >
                  {isExpand ? (
                    <>
                      <MinusIcon className="size-4" />
                      Rút gọn nội dung
                    </>
                  ) : (
                    <>
                      <PlusIcon className="size-4" />
                      Xem thêm nội dung
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
