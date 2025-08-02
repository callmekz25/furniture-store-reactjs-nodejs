import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IProduct from "@/interfaces/product/product.interface";
import Loading from "@/components/loading/loading";
import { useGetProductById, useUpdateProduct } from "@/hooks/use-product";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import ProductForm from "@/components/admin/forms/product-form";
const EditProduct = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductById(productId!);
  const [productVariants, setProductVariants] = useState<ISelectedVariant[]>();
  const [previewImages, setPreviewImages] = useState<File[] | string[]>([]);

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  // Hook form
  const form = useForm<IProduct>();
  const { reset } = form;

  useEffect(() => {
    if (product) {
      reset(product);
      setProductVariants(product.variants);
      setPreviewImages(product.images);
    }
  }, [product, reset]);

  const handleUpdate = (data) => {
    console.log(data);

    // updateProduct(
    //   {
    //     id: data._id,
    //     collections: data.collection,
    //   },
    //   {
    //     onSuccess: () => {
    //       window.location.reload();
    //     },
    //   }
    // );
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ProductForm
      productVariants={productVariants}
      setProductVariants={setProductVariants}
      previewImages={previewImages}
      setPreviewImages={setPreviewImages}
      form={form}
      onSubmit={handleUpdate}
      isPending={isPending}
    />
  );
};

export default EditProduct;
