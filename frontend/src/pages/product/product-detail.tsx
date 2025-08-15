import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "@/components/gallery/product-gallery";
import { addRecentlyViewedProduct } from "@/services/product.service";
import RecentlyViewProductsList from "@/components/sections/showcase/recently-view";
import RelatedProducts from "@/components/sections/showcase/related-products";
import Loading from "@/components/loading/loading";
import ProductVariants from "@/components/variants/product-variants";
import Error from "../shared/error";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { useGetProductBySlug } from "@/hooks/use-product";
import PolicySection from "@/components/sections/policy/policy-section";
import AddToCartActions from "@/components/products/add-to-cart-actions";
import ProductSummaryInfo from "@/components/products/product-summary-info";
import ProductTabs from "@/components/products/product-tabs";

const ProductDetail = () => {
  const [selectedVariant, setSelectedVariant] =
    useState<ISelectedVariant | null>(null);
  const { slug } = useParams<string>();
  const { data: product, isLoading, error } = useGetProductBySlug(slug!);

  useEffect(() => {
    if (!product) return;
    if (product?.title) {
      document.title = `${product.title} - Baya`;
    }
    addRecentlyViewedProduct(product);
    return () => {
      document.title = "Nội thất & trang trí - Baya";
    };
  }, [product]);

  // Group images variants to 1 array
  const allImages =
    product?.variants?.flatMap((variant: ISelectedVariant) => variant.images) ??
    [];

  if (error) {
    return <Error />;
  }

  return (
    <div className="pt-6 pb-10 break-point ">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="flex lg:flex-row flex-col gap-4">
            <div className="lg:w-[45%] flex justify-center items-center lg:sticky lg:top-4 h-fit  bg-white  ">
              {product &&
                (product.images && product.images.length > 0 ? (
                  <ProductGallery images={product.images} />
                ) : product?.variants?.length > 0 ? (
                  <ProductGallery
                    images={allImages as string[]}
                    activeVariant={selectedVariant}
                  />
                ) : (
                  <img
                    className=" object-contain w-full"
                    loading="lazy"
                    src="https://theme.hstatic.net/200000796751/1001266995/14/no_image.jpg?v=91"
                    alt={product.title}
                  />
                ))}
            </div>
            <div className=" lg:w-[55%]">
              <div className="bg-white px-4  py-5">
                <ProductSummaryInfo
                  product={product!}
                  selectedVariant={selectedVariant!}
                />
                <ProductVariants
                  variants={product?.variants ?? []}
                  onSelectVariant={setSelectedVariant}
                />

                <AddToCartActions
                  product={product!}
                  selectedVariant={selectedVariant!}
                />
                <PolicySection />
              </div>

              <ProductTabs product={product!} />
            </div>
          </section>
          {product && product._id && (
            <RelatedProducts productId={product._id} />
          )}
          <RecentlyViewProductsList />
        </>
      )}
    </div>
  );
};

export default memo(ProductDetail);
