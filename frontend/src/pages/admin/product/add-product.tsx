import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import IProduct from "@/interfaces/product/product.interface";
import ProductForm from "@/components/admin/forms/product-form";
import {
  ProductVariantsContext,
  ProductVariantsProvider,
} from "@/context/product-variants.context";
import { useAddProduct } from "@/hooks/use-product";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  ProductImagesContext,
  ProductImagesProvider,
} from "@/context/product-images.context";

const AddProductContent = () => {
  const queryClient = useQueryClient();
  const { productVariants, setProductVariants } = useContext(
    ProductVariantsContext
  );
  const { mutate: addProduct, isPending } = useAddProduct();

  const { images, setImages } = useContext(ProductImagesContext);

  const form = useForm<IProduct>();
  const { reset } = form;

  const handleAddProduct = async (data: IProduct) => {
    if (images.length === 0 && productVariants.length === 0) {
      alert("Bắt buộc phải có ảnh chính hoặc của biến thể");
      return;
    }
    addProduct(
      { files: images, product: data, variants: productVariants },
      {
        onSuccess: () => {
          toast.success("Thêm sản phẩm thành công");
          reset();
          setImages([]);
          setProductVariants([]);
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        },
      }
    );
  };
  return (
    <ProductForm
      form={form}
      onSubmit={handleAddProduct}
      isPending={isPending}
    />
  );
};

const AddProduct = () => {
  return (
    <ProductVariantsProvider initial={[]}>
      <ProductImagesProvider initial={[]}>
        <AddProductContent />
      </ProductImagesProvider>
    </ProductVariantsProvider>
  );
};

export default AddProduct;
