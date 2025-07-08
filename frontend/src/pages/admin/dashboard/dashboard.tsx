import OverviewCard from "@/components/admin/overviewCard";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <h3 className=" font-bold text-2xl">Xin chào</h3>
      <div className="flex items-center gap-4 mt-10">
        <OverviewCard
          title="Tổng số bài viết"
          descr="Tổng số bài đăng trên website"
          total={10}
        />
        <OverviewCard
          title="Tổng số sản phẩm"
          descr="Tổng số sản phẩm trên website"
          total={10}
        />
        <OverviewCard
          title="Tổng số bài viết"
          descr="kdakdkansndsandsn"
          total={10}
        />
      </div>
    </div>
  );
};

export default Dashboard;
