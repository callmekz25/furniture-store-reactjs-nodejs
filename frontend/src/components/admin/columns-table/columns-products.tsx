import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import IProduct from "@/interfaces/product/product.interface";
import { Link } from "react-router-dom";
import formatPriceToVND from "@/utils/format-price";
import getProductImages from "@/utils/get-images";

export const columns: ColumnDef<IProduct>[] = [
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
    accessorKey: "publish",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm px-4  font-medium ">
        {row.original.publish ? "Công khai" : "Nháp"}
      </h3>
    ),
  },
  {
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const imageUrl = getProductImages(row.original, true) as string;

      return (
        <img
          src={imageUrl}
          alt={row.original.title}
          className="size-20 object-contain"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên sản phẩm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium max-w-[200px]">{row.original.title}</h3>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slug
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        to={`/products/${row.original.slug}`}
        className="max-w-[200px] block text-blue-600 text-wrap"
      >
        {row.original.slug}
      </Link>
    ),
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => {
      const collections = row.original.collections || [];
      return (
        <div className="flex flex-wrap gap-2 max-w-[200px]">
          {collections.map((collection, index) => (
            <h3
              key={index}
              className="inline-block text-[13px] font-bold rounded-xl bg-gray-100 px-3 py-1 whitespace-nowrap"
            >
              {collection.name}
            </h3>
          ))}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "category",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Danh mục
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => (
  //     <h3 className="font-medium ">{row.original.category}</h3>
  //   ),
  // },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium ">{formatPriceToVND(row.original.price)}</h3>
    ),
  },
  {
    accessorKey: "handle",
    header: "Chức năng",
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-2">
        <Link to={`/admin/products/${row.original._id}`}>
          <Edit className="size-5" />
        </Link>
        <button>
          <Ellipsis className="size-5" />
        </button>
      </div>
    ),
  },
];
