import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import IOption from "@/interfaces/variant/option.interface";

const generateProductVariants = (variants: {
  [key: string]: IOption[];
}): ISelectedVariant[] => {
  const variantKeys = Object.keys(variants);

  const combinations = variantKeys.reduce(
    (
      acc: {
        id: string;
        name: string;
        value: string;
      }[][],
      key: string
    ) => {
      // Values ở đây là 1 mảng chứa các object key value dạng {id: "1242199", name: "Màu sắc", value: "Xám" }
      const values = variants[key]
        .filter((v) => v.value.trim() !== "")
        .map((v) => ({
          id: v.id,
          name: key,
          value: v.value,
        }));
      console.log("Key: ", key);

      console.log("Acc: ", acc);

      console.log("Values: ", values);
      // Nếu lần lặp đầu tiên thì gán acc bằng values dạng [[{id: name: value:}]]
      if (acc.length === 0) return values.map((v) => [v]);
      // Acc ở đây là mảng tích lũy của từng values là dạng mảng chứa mảng con bên trong mảng con là object dạng giống key value của values trên nên acc cần phải làm phẳng mảng
      // Gộp mảng của acc với values
      // Acc có dạng [[{}], [{}]] => [[{}], {}]
      return acc.flatMap((existing) =>
        values.map((newValue) => [...existing, newValue])
      );
    },
    []
  );
  console.log("Combination: ", combinations);

  return combinations.map(
    (
      variantCombo: {
        id: string;
        name: string;
        value: string;
      }[]
    ) => ({
      attributes: variantCombo.reduce(
        (
          acc: {
            [key: string]: string;
          },
          { name, value }
        ) => {
          acc[name] = value;
          return acc;
        },
        {}
      ),
      quantity: 50, // Mặc định stock
      price: 1000, // Mặc định price
      images: [],
      sku: "",
      fakePrice: 2000,
    })
  );
};

export default generateProductVariants;
