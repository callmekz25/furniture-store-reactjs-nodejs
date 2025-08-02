import { useState } from "react";
import { addProduct } from "@/services/product.service";
import { useForm } from "react-hook-form";
import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import ProductForm from "@/components/admin/forms/product-form";

const AddProduct = () => {
  const [productVariants, setProductVariants] = useState<ISelectedVariant[]>(
    []
  );
  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const form = useForm<IProduct>();
  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const handleAddProduct = async (data: IProduct) => {
    if (previewImages.length === 0 && productVariants.length === 0) {
      alert("Bắt buộc phải có ảnh chính hoặc của biến thể");
      return;
    }
    const res = await addProduct(previewImages, data, productVariants);
    if (res) {
      reset();
      setPreviewImages([]);
      setProductVariants([]);
    }
  };

  return (
    <ProductForm
      productVariants={productVariants}
      setProductVariants={setProductVariants}
      previewImages={previewImages}
      setPreviewImages={setPreviewImages}
      form={form}
      onSubmit={handleAddProduct}
      isPending={isSubmitting}
    />
  );
};

export default AddProduct;
