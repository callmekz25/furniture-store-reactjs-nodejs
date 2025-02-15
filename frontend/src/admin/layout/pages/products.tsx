import LayoutAdmin from "..";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const ListProduct = () => {
  return (
    <LayoutAdmin>
      <div className="bg-[#f6f6f6] px-4 py-8">
        <Button asChild>
          <Link to="/admin/products/add">Thêm mới</Link>
        </Button>
      </div>
    </LayoutAdmin>
  );
};

export default ListProduct;
