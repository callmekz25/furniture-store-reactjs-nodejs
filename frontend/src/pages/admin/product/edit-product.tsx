import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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

const EditProductContent = () => {
  const { productVariants, setProductVariants } = useContext(
    ProductVariantsContext
  );
  const { images, setImages } = useContext(ProductImagesContext);
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
  }, [product, reset]);

  const handleUpdate = (data) => {
    const existingUrls = images.filter(
      (img) => typeof img === "string"
    ) as string[];
    const newFiles = images.filter((img) => typeof img !== "string") as File[];
    console.log(existingUrls);
    console.log(newFiles);

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
