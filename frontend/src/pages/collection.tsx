import useProductsByCollectionOrCategory from "@/hooks/useProductsByCollectionOrCategory";
import Layout from "@/layouts";
import { useParams, useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ArrowDownAz } from "lucide-react";
import CardProduct from "@/components/cardProduct";
import SideBarFilter from "@/components/sideBarFilter";
import { useEffect, useState } from "react";
const Collection = () => {
  const { slug } = useParams<string>();
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useProductsByCollectionOrCategory(
    slug,
    searchParams
  );
  const [suppliers, setSuppliers] = useState<[string] | []>([]);
  // Dùng state vì suppliers nằm trong response của api nên nếu search query params thay đổi thì response thay đổi làm re-render props của sidebar không cần thiết
  useEffect(() => {
    if (data?.suppliers) {
      setSuppliers(data.suppliers);
    }
  }, [data?.suppliers]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data?.products]);
  return (
    <Layout>
      <section className="break-point flex flex-wrap min-h-svh ">
        {/* Phần filter */}

        <SideBarFilter suppliers={suppliers} />

        {/* Phần hiển thị sản phẩm */}
        <div className="lg:flex-[0_0_75%] lg:max-w-[75%] flex-[0_0_100%] max-w-full lg:py-10 py-3 lg:px-4 px-1">
          {/* Phần sắp xếp */}
          {isLoading ? (
            <p>Loading Products...</p>
          ) : (
            <>
              <div className="flex items-center justify-between lg:px-0 px-3">
                <p className="flex items-center lg:gap-5 gap-1 flex-wrap">
                  <span className="text-[24px] font-bold text-red-700">
                    {data.type.name}
                  </span>
                  <span className="text-sm font-normal">
                    <span className="font-bold">{data.products.length}</span>{" "}
                    sản phẩm
                  </span>
                </p>
                <div className="lg:flex hidden items-center gap-10 bg-white px-2.5 text-[13px] font-semibold h-[38px] border border-gray-200">
                  <div className="flex items-center gap-2">
                    <ArrowDownAz className="size-5" />
                    <span>Sắp xếp</span>
                  </div>
                  <ChevronDownIcon className="size-4" />
                </div>
              </div>
              <div className="flex flex-wrap mt-4 lg:gap-y-4 gap-y-1 md:gap-y-4 ">
                {data && data.products.length > 0
                  ? data.products.map((product) => {
                      return (
                        <div
                          className="lg:flex-[0_0_20%] lg:px-1.5 px-[2px] md:px-2 lg:max-w-[20%] flex-[0_0_50%] max-w-[50%]"
                          key={product._id}
                        >
                          <CardProduct product={product} />
                        </div>
                      );
                    })
                  : "No data"}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Collection;
