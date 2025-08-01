import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import IOrder from "@/interfaces/order/order.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<IOrder>[] = [
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
    accessorKey: "orderCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã đơn hàng
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm px-4  font-medium py-4 ">
        #{row.original.orderCode}
      </h3>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">
        {row.original.orderInfo.email}
      </h3>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số điện thoại
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">
        {row.original.orderInfo.phoneNumber}
      </h3>
    ),
  },
  {
    accessorKey: "totalItems",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số lượng
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">{row.original.totalItems}</h3>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá tiền
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">
        {row.original.totalPrice.toLocaleString()}
      </h3>
    ),
  },
  {
    accessorKey: "payment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thanh toán
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <h3 className="font-medium max-w-[200px]">
          {row.original.payment?.paymentStatus
            ? "Đã thanh toán"
            : "Chưa thanh toán"}
        </h3>
      );
    },
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
