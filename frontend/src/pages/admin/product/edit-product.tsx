import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import IProduct from "@/interfaces/product/product.interface";
import Loading from "@/components/loading/loading";
import { useGetProductById, useUpdateProduct } from "@/hooks/use-product";
import ProductForm from "@/components/admin/forms/product-form";
import {
  ProductVariantsContext,
  ProductVariantsProvider,
} from "@/context/product-variants.context";
import {
  ProductImagesContext,
  ProductImagesProvider,
} from "@/context/product-images.context";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const EditProductContent = () => {
  const queryClient = useQueryClient();
  const { productVariants, setProductVariants } = useContext(
    ProductVariantsContext
  )!;
  const { images, setImages } = useContext(ProductImagesContext)!;
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductById(productId!);

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  // Hook form
  const form = useForm<IProduct>();
  const { reset } = form;

  useEffect(() => {
    if (product) {
      reset(product);
      setProductVariants(product.variants);
      setImages(product.images);
    }
  }, [product, reset, setImages, setProductVariants]);

  const handleUpdate = (data: IProduct) => {
    console.log(data);
    console.log(productVariants);

    updateProduct(
      {
        id: product!._id!,
        payload: data,
        variants: productVariants,
        images,
      },
      {
        onSuccess: (data) => {
          toast.success("Cập nhật thành công");
          queryClient.setQueryData(["products", product?._id], data);
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        },
      }
    );
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ProductForm form={form} onSubmit={handleUpdate} isPending={isPending} />
  );
};

const EditProduct = () => {
  return (
    <ProductVariantsProvider initial={[]}>
      <ProductImagesProvider initial={[]}>
        <EditProductContent />
      </ProductImagesProvider>
    </ProductVariantsProvider>
  );
};

export default EditProduct;
