import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import IProduct from "@/interfaces/product.interface";
import { Link } from "react-router-dom";

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
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const images = row.original.images; // Lấy images từ dữ liệu
      const imageUrl =
        Array.isArray(images) && images.length > 0
          ? images[0]
          : "/placeholder.png";

      return (
        <img
          src={imageUrl}
          alt={row.original.title}
          className="w-16 h-16 object-cover rounded-md"
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        to={`/products/${row.original.slug}`}
        className="max-w-[200px] text-blue-600 text-wrap"
      >
        {row.original.slug}
      </Link>
    ),
  },
  {
    accessorKey: "collection",
    header: "Collections",
    cell: ({ row }) => {
      const collections = row.original.collection || [];
      return (
        <div className="flex flex-wrap gap-2 max-w-[200px]">
          {collections.map((collection, index) => (
            <h3
              key={index}
              className="inline-block text-[13px] font-bold rounded-xl bg-gray-100 px-3 py-1 whitespace-nowrap"
            >
              {collection}
            </h3>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Danh mục
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium ">{row.original.category}</h3>
    ),
  },
  {
    accessorKey: "handle",
    header: "Chức năng",
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-2">
        <button>
          <Edit className="size-4" />
        </button>
        <button>
          <Ellipsis className="size-4" />
        </button>
      </div>
    ),
  },
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
    cell: ({ row }) => <h3 className="font-medium ">{row.original.price}</h3>,
  },
  {
    accessorKey: "fakePrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá ảo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-medium ">{row.original.fakePrice}</h3>
    ),
  },
];
