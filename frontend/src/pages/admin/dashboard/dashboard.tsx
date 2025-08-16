import OverviewCard from "@/components/admin/overviewCard";
import Loading from "@/components/loading/loading";
import { useGetUser } from "@/hooks/use-account";
import { useGetProducts } from "@/hooks/use-product";
import { useGetSummary } from "@/hooks/use-summary";
import { EditIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { data, isLoading } = useGetUser();
  const { data: products, isLoading: ilp } = useGetProducts(
    ["_id", "title", "createdAt", "updatedAt", "publish"],
    undefined,
    5
  );
  const { data: productsOutStock, isLoading: ilpot } = useGetProducts(
    ["_id", "title", "createdAt", "updatedAt", "publish"],
    { quantity: 10 },
    5
  );
  const { data: summary, isLoading: ils } = useGetSummary();

  if (isLoading || ilp || ilpot) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen">
      <h3 className=" font-bold text-2xl">Xin chào {data?.name}</h3>
      <div className="flex items-center gap-4 mt-10">
        <OverviewCard
          title="Tổng số đơn đặt hàng"
          descr="Tổng số đơn đặt hàng trên website"
          total={summary?.totalOrders}
          loading={ils}
        />
        <OverviewCard
          title="Tổng số sản phẩm"
          descr="Tổng số sản phẩm trên website"
          total={summary?.totalProducts}
          loading={ils}
        />
        <OverviewCard
          title="Người dùng"
          descr="Số lượng người dùng trên website"
          total={summary?.totalUsers}
          loading={ils}
        />
      </div>
      <div className="flex gap-3 mt-3">
        <div className="rounded-lg w-full border bg-white border-gray-200 shadow p-4">
          <h3 className="font-bold text-lg">Sản phẩm mới nhất</h3>
          <p className="text-sm font-medium opacity-60">
            Các sản phẩm mới nhất
          </p>
          <div className="mt-6">
            <div className="flex items-center font-medium opacity-60 text-sm mb-2">
              <div className="flex-[0_0_45%] px-2">Tên</div>
              <div className="flex-[0_0_25%] px-2">Ngày tạo</div>
              <div className="flex-[0_0_20%] px-2">Trạng thái</div>
              <div className="flex-[0_0_10%] px-2"></div>
            </div>

            {ilp ? (
              <div className="flex items-center justify-center mt-14">
                <Loader2 className=" animate-spin size-8 text-blue-600" />
              </div>
            ) : (
              products &&
              products?.length > 0 &&
              products.map((product, index) => {
                return (
                  <div
                    className={`flex items-start text-sm  py-4 font-medium ${
                      index !== products.length
                        ? "border-t border-gray-200"
                        : ""
                    }`}
                    key={product._id}
                  >
                    <div className="flex items-center w-full">
                      <div className="flex-[0_0_45%] font-semibold px-2 min-h-[40px] line-clamp-2">
                        {product.title}
                      </div>

                      <div className="flex-[0_0_25%] px-2">
                        {new Date(
                          product.createdAt ?? product.updatedAt
                        ).toLocaleDateString("vi-vn")}
                      </div>
                      <div className="flex-[0_0_20%] px-2">
                        {product.publish ? "Công khai" : "Nháp"}
                      </div>
                      <Link
                        to={`/admin/products/${product._id}`}
                        className="flex-[0_0_10%] px-2"
                      >
                        <EditIcon className="size-4" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="rounded-lg w-full border bg-white border-gray-200 shadow p-4">
          <h3 className="font-bold text-lg">Sản phẩm sắp hết hàng</h3>
          <p className="text-sm font-medium opacity-60">
            Các sản phẩm sắp hết hàng
          </p>
          <div className="mt-6">
            <div className="flex items-center font-medium opacity-60 text-sm mb-2">
              <div className="flex-[0_0_45%] px-2">Tên</div>
              <div className="flex-[0_0_25%] px-2">Ngày tạo</div>
              <div className="flex-[0_0_20%] px-2">Trạng thái</div>
              <div className="flex-[0_0_10%] px-2"></div>
            </div>

            {ilp ? (
              <div className="flex items-center justify-center mt-14">
                <Loader2 className=" animate-spin size-8 text-blue-600" />
              </div>
            ) : (
              productsOutStock &&
              productsOutStock?.length > 0 &&
              productsOutStock.map((product, index) => {
                return (
                  <div
                    className={`flex items-start text-sm  py-4 font-medium ${
                      index !== products?.length
                        ? "border-t border-gray-200"
                        : ""
                    }`}
                    key={product._id}
                  >
                    <div className="flex items-center w-full">
                      <div className="flex-[0_0_45%] font-semibold px-2 min-h-[40px] line-clamp-2">
                        {product.title}
                      </div>

                      <div className="flex-[0_0_25%] px-2">
                        {new Date(
                          product.createdAt ?? product.updatedAt
                        ).toLocaleDateString("vi-vn")}
                      </div>
                      <div className="flex-[0_0_20%] px-2">
                        {product.publish ? "Công khai" : "Nháp"}
                      </div>
                      <Link
                        to={`/admin/products/${product._id}`}
                        className="flex-[0_0_10%] px-2"
                      >
                        <EditIcon className="size-4" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
