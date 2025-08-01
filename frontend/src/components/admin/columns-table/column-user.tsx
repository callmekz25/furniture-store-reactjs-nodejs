import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { displayScopeType } from "@/utils/display-scope-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IUser from "@/interfaces/user.interface";

export const columns: ColumnDef<IUser>[] = [
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
          Họ tên
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
      <h3 className="font-medium max-w-[200px] text-wrap">
        {row.original.email}
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
        {row.original?.addresses?.find((addr) => addr.isDefault)?.phoneNumber ??
          "N/A"}
      </h3>
    ),
  },

  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa chỉ
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      const defaultAddress = row.original?.addresses?.find(
        (addr) => addr.isDefault
      );
      return (
        <>
          {defaultAddress ? (
            <h3 className="font-medium max-w-[200px]">
              {defaultAddress.address}, {defaultAddress.ward.name},{" "}
              {defaultAddress.district.name}, {defaultAddress.province.name}
            </h3>
          ) : (
            "N/A"
          )}
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

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
