import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import checkInStock from "@/utils/check-instock";
import formatPriceToVND from "@/utils/format-price";
import getFinalPrice from "@/utils/get-final-price";
import getPrice from "@/utils/get-price";

const ProductSummaryInfo = ({
  product,
  selectedVariant,
}: {
  product: IProduct;
  selectedVariant: ISelectedVariant;
}) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-[#c31425]">{product!.title}</h3>
      <div className="flex items-center gap-3 mt-2 flex-wrap  text-sm font-normal">
        <div className="flex items-center gap-1">
          <span>Mã sản phẩm:</span>
          {product.variants?.length > 0 && selectedVariant ? (
            <span className="font-bold text-[#c31425]">
              {selectedVariant.sku}
            </span>
          ) : (
            product?.sku && (
              <span className="font-bold text-[#c31425]">{product.sku}</span>
            )
          )}
        </div>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>Tình trạng:</span>
          <span className="font-bold text-[#c31425]">
            {checkInStock(product, selectedVariant) ? "Còn hàng" : "Hết hàng"}
          </span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-1">
          <span>Thương hiệu:</span>
          <span className="font-bold text-[#c31425] uppercase">
            {product?.brand}
          </span>
        </div>
      </div>
      <div className="flex items-center py-4 mt-4 bg-[#fafafa] px-4">
        <span className="text-sm font-semibold lg:block hidden min-w-[100px]">
          Giá:
        </span>
        <div className="">
          {product.promotion ? (
            <div className="flex items-center gap-4">
              <span className="font-bold lg:text-[28px]  text-[22px] text-red-500">
                {formatPriceToVND(getFinalPrice(product, selectedVariant))}
              </span>
              <span className="lg:text-[18px] line-through opacity-50 font-normal">
                {formatPriceToVND(getPrice(product, selectedVariant))}
              </span>
              <div className="border border-red-500 bg-white py-[3px] lg:px-[14px] px-2.5 lg:text-[13px] text-[10px] rounded-[3px] text-red-500 font-bold">
                -{product.promotion.discountValue}%
              </div>
            </div>
          ) : (
            <span className="font-bold lg:text-3xl  text-[22px] text-red-500">
              {formatPriceToVND(getPrice(product, selectedVariant))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryInfo;
