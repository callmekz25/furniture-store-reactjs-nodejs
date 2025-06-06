const generateProductVariants = (variants: object[]) => {
  // Lấy key của variant name ra
  const variantKeys = Object.keys(variants); // ["Kích thước", "Màu sắc"]
  // Loại bỏ những variant value là rỗng và dựa vào key lấy ra những value
  const combinations = variantKeys.reduce((acc, key) => {
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
  }, []);
  console.log("Combination: ", combinations);

  return combinations.map((variantCombo) => ({
    attributes: variantCombo.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {}),
    quantity: 50, // Mặc định stock
    price: 1000, // Mặc định price
    images: [],
    sku: "",
    fakePrice: 2000,
  }));
};

export default generateProductVariants;
