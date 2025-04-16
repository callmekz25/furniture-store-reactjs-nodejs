import { useEffect, useMemo, useState } from "react";

interface IVariants {
  status: boolean;
  sku: string;
  quantity: number;
  price: number;
  fakePrice: number;
  images: string[];
  attributes: object;
}
const ProductVariants = ({
  variants,
  onSelectVariant,
}: {
  variants: IVariants[];
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Lấy các tên attributes thành 1 mảng -> [Kích thước, Mùi hương]
  const attributeNames = useMemo(() => {
    const first = variants.find((v) => v.attributes);
    return first ? Object.keys(first.attributes) : [];
  }, [variants]);

  // Gộp các giá trị của tên attributes -> {Kích thước: [10, 20, 30]}
  const attributeValues = useMemo(() => {
    const values = {};
    attributeNames.forEach((name) => {
      const vals = variants
        .filter((v: IVariants) => v.quantity > 0)
        .map((v: IVariants) => v.attributes[name])
        .filter(Boolean);
      values[name] = [...new Set(vals)];
    });
    return values;
  }, [variants, attributeNames]);
  // Lấy ra lại toàn bộ thông tin của variants dựa vào attributres khi user chọn
  const selectedVariant = useMemo(() => {
    return variants.find((v) =>
      attributeNames.every(
        (name: string) => selectedAttributes[name] === v.attributes[name]
      )
    );
  }, [variants, selectedAttributes, attributeNames]);

  // Set state callback truyền lên lại cho component cha product detail
  useEffect(() => {
    if (selectedVariant && onSelectVariant) {
      onSelectVariant(selectedVariant);
    }
  }, [selectedVariant, onSelectVariant]);

  // Kiểm tra các giá trị của attributes của sản phẩm có còn hàng không
  const isValueDisabled = (attrName: string, value: string) => {
    const index = attributeNames.indexOf(attrName);
    // Lấy tất cả những attributes trước đó -> Khi chọn mùi hương -> [Kích thước]
    const previousAttrs = attributeNames.slice(0, index);
    // Tạo 1 bản copy của selected attributes và chỉ thay đổi value của key = attrName với value = value
    const testAttributes = {
      ...selectedAttributes,
      [attrName]: value,
    };

    // console.log("TestAttr: ", testAttributes);
    // Lọc ra những variants hợp lệ nếu có thì true không thì false để disable
    return !variants.some(
      (v) =>
        v.quantity > 0 &&
        v.attributes[attrName] === value &&
        previousAttrs.every(
          (name: string) => v.attributes[name] === testAttributes[name]
        )
    );
  };

  const getFirstValidValue = (attrName: string, baseAttrs) => {
    // attrName ở đây luôn là attribute name thứ 2 trở đi
    // Lấy tất cả values của attrName
    const allValues = attributeValues[attrName] || [];

    for (const val of allValues) {
      const testAttrs = { ...baseAttrs, [attrName]: val };

      // Lọc ra giá trị của attibute hợp lệ có quantity > 0
      const isValid = variants.some(
        (v) =>
          v.quantity > 0 &&
          attributeNames.every(
            (name: string) =>
              !testAttrs[name] || v.attributes[name] === testAttrs[name]
          )
      );

      if (isValid) return val;
    }

    return null;
  };

  const handleSelect = (attrName: string, value: string) => {
    // Tìm vị trí của attribute hiện tại nằm trong mảng attributeNames
    const index = attributeNames.indexOf(attrName);

    const updatedAttributes = {
      ...selectedAttributes,
      [attrName]: value,
    };

    // Reset tất cả các thuộc tính phía sau attrName
    // Chỉ chạy khi user thay đổi lựa chọn attribute đầu tiên nghĩa là các attributes còn lại phụ thuộc vào attributes đầu tiên
    for (let i = index + 1; i < attributeNames.length; i++) {
      const nextAttr = attributeNames[i];

      const validVal = getFirstValidValue(nextAttr, updatedAttributes);
      if (validVal) {
        updatedAttributes[nextAttr] = validVal;
      } else {
        delete updatedAttributes[nextAttr];
      }
    }

    setSelectedAttributes(updatedAttributes);
  };

  useEffect(() => {
    if (variants && variants.length > 0) {
      const initialVariant = variants.find((v) => v.quantity > 0);
      if (initialVariant) {
        setSelectedAttributes(initialVariant.attributes);
        if (onSelectVariant) onSelectVariant(initialVariant);
      }
    }
  }, [variants, onSelectVariant]);

  return (
    <div className="mt-4 flex flex-col gap-6 px-4">
      {attributeNames.map((attrName) => (
        <div key={attrName} className="flex items-center">
          <h4 className="min-w-[100px] text-sm font-semibold">{attrName}</h4>
          <div className="flex items-center gap-3 flex-wrap">
            {attributeValues[attrName].map((val: string) => {
              const isSelected = selectedAttributes[attrName] === val;
              const isDisabled = isValueDisabled(attrName, val);

              return (
                <button
                  key={val}
                  onClick={() => handleSelect(attrName, val)}
                  disabled={isDisabled}
                  className={`
                    border text-[12px] font-medium rounded px-3 py-2
                    ${
                      isSelected
                        ? "border-red-500 text-red-500"
                        : "border-gray-300"
                    }
                    ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;
