import useProductsByCollectionOrCategory from "@/hooks/useProductsByCollectionOrCategory";
import Layout from "@/layouts";
import { useParams, useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ArrowDownAz } from "lucide-react";
import CardProduct from "@/components/cardProduct";
import SideBarFilter from "@/components/sideBarFilter";

const Collection = () => {
  const { slug } = useParams<string>();
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useProductsByCollectionOrCategory(
    slug,
    searchParams
  );
  console.log(data);

  return (
    <Layout>
      <section className="break-point flex flex-wrap">
        {/* Phần filter */}
        <SideBarFilter />
        {/* Phần hiển thị sản phẩm */}
        <div className="lg:flex-[0_0_75%] lg:max-w-[75%] flex-[0_0_100%] max-w-full py-10 px-4">
          {/* Phần sắp xếp */}
          {isLoading ? (
            <p>Loading Products...</p>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-5">
                  <span className="text-[24px] font-bold text-red-700">
                    {data.type.name}
                  </span>
                  <span className="text-sm font-normal">
                    <span className="font-bold">{data.products.length}</span>{" "}
                    sản phẩm
                  </span>
                </p>
                <div className="flex items-center gap-10 bg-white px-2.5 text-[13px] font-semibold h-[38px] border border-gray-200">
                  <div className="flex items-center gap-2">
                    <ArrowDownAz className="size-5" />
                    <span>Sắp xếp</span>
                  </div>
                  <ChevronDownIcon className="size-4" />
                </div>
              </div>
              <div className="flex flex-wrap mt-4 gap-y-4">
                {data && data.products.length > 0
                  ? data.products.map((product) => {
                      return (
                        <div
                          className="lg:flex-[0_0_20%] px-1.5 lg:max-w-[20%] flex-[0_0_50%] max-w-[50%]"
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
