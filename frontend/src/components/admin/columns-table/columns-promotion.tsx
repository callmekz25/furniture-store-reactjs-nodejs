import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import IPromotion from "@/interfaces/promotion/promotion.interface";
import { displayScopeType } from "@/utils/display-scope-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<IPromotion>[] = [
  // Row selection
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Column key
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên khuyến mãi
          <ArrowUpDown className="ml-2 h-4 w-4  " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm px-4  font-semibold py-4 ">
        {row.original.name}
      </h3>
    ),
  },
  {
    accessorKey: "scope",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phạm vi áp dụng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">
        {displayScopeType(row.original.scope.type)}
      </h3>
    ),
  },
  {
    accessorKey: "discountValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giảm giá
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">
        {row.original.discountValue}%
      </h3>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày bắt đầu
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.startDate);

      const formattedDate = date.toLocaleDateString("vi-VN");
      const formattedTime = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return (
        <h3 className="font-medium max-w-[200px]">
          {formattedDate}, {formattedTime}
        </h3>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày kết thúc
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.endDate);

      const formattedDate = date.toLocaleDateString("vi-VN");
      const formattedTime = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return (
        <h3 className="font-medium max-w-[200px]">
          {formattedDate}, {formattedTime}
        </h3>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">
        {row.original.isActive ? "Áp dụng" : "Chưa áp dụng"}
      </h3>
    ),
  },

  {
    accessorKey: "handle",
    header: "Chức năng",
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={`/admin/promotions/${row.original._id}`}>Cập nhật</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Xoá</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
