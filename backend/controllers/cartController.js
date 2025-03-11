import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    // Lấy ra cart id và user id có hay không thông qua middleware
    const cartId = req.cartId;

    const userId = req.user?.userId;

    let cart = null;
    if (!productId || !quantity) {
      return res.status(400).json({ mess: "Thiếu trường dữ liệu" });
    }
    if (userId) {
      cart = await Cart.findOne({ userId });
    }
    if (!cart && cartId) {
      cart = await Cart.findById(cartId);
    }
    if (!cart) {
      const cartData = { userId: userId ?? null, items: [] };
      if (cartId) cartData._id = cartId; // Chỉ gán _id nếu cartId có
      cart = await Cart.create(cartData);
    }
    const itemExisting = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (itemExisting > -1) {
      cart.items[itemExisting].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    return res.status(200).json({ mess: "Thêm vào giỏ hàng thành công" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ mess: error });
  }
};

const getCart = async (req, res) => {
  try {
    const cartId = req.cartId;
    const userId = req.user?.userId;

    let cart = null;

    if (userId) {
      cart = await Cart.findOne({ userId })
        .select("items -_id")
        .populate("items.product", "title slug price fakePrice images");
    }
    if (cartId) {
      cart = await Cart.findById(cartId)
        .select("items -_id")
        .populate("items.product", "title slug price fakePrice images");
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user?.userId;
    const cartId = req.cartId;

    if (!productId) {
      return res.status(400).json({ mess: "Thiếu trường dữ liệu" });
    }
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ mess: "Không tìm thấy sản phẩm" });
    }
    let cart = null;
    if (!userId) {
      cart = await Cart.findById(cartId);
    } else {
      cart = await Cart.findOne({ userId });
    }
    if (cart) {
      await cart.updateOne(
        { $pull: { items: { product: productId } } } // Xóa product khỏi items
      );
    }
    cart.save();
    return res.status(200).json({ mess: "Xóa sản phẩm thành công" });
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};
export { addCart, getCart, removeFromCart };
