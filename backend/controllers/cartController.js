import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import arraysEqual from "../utils/arraysEqual.js";
const addCart = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      title,
      image,
      slug,
      price,
      discount,
      fakePrice,
      attributes,
    } = req.body;
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
    const itemExisting = cart.items.findIndex(
      (item) =>
        item.productId === productId && arraysEqual(item.attributes, attributes)
    );
    if (itemExisting > -1) {
      cart.items[itemExisting].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        image,
        title,
        slug,
        price,
        discount,
        fakePrice,
        attributes,
      });
    }
    cart.total_items = cart.items.length;
    cart.total_price = Math.ceil(
      cart.items.reduce((total, item) => total + item.quantity * item.price, 0)
    );

    await cart.save();
    return res.status(200).json(cart);
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
      cart = await Cart.findOne({ userId });
    }
    if (cartId) {
      cart = await Cart.findById(cartId);
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId, attributes } = req.query;
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
    const parsedAttributes = attributes ? JSON.parse(attributes) : [];

    if (cart) {
      let updateItems;
      if (parsedAttributes.length > 0) {
        updateItems = cart.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              arraysEqual(item.attributes, parsedAttributes)
            )
        );
      } else {
        updateItems = cart.items.filter(
          (item) => !(item.productId === productId)
        );
      }

      cart.items = updateItems;
      cart.total_items = cart.items.length;
      cart.total_price = Math.ceil(
        cart.items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        )
      );
    }
    cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { quantity, productId, attributes } = req.body;
    const userId = req.user?.userId;
    const cartId = req.cartId;
    let cart;

    if (!productId || !quantity) {
      return res.status(401).json({ mess: "Invalid data" });
    }
    if (!userId) {
      cart = await Cart.findById(cartId);
    } else {
      cart = await Cart.findOne({ userId });
    }

    if (!cart) {
      return res.status(404).json({ mess: "Not found cart" });
    }
    let updateItems;
    const parsedAttributes = attributes ? JSON.parse(attributes) : [];

    if (parsedAttributes.length > 0) {
      updateItems = cart.items.find(
        (item) =>
          item.productId === productId &&
          arraysEqual(item.attributes, parsedAttributes)
      );
    } else {
      updateItems = cart.items.find((item) => item.productId === productId);
    }

    updateItems.quantity = quantity;
    cart.total_items = cart.items.length;
    cart.total_price = Math.ceil(
      cart.items.reduce((total, item) => total + item.quantity * item.price, 0)
    );
    cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};
export { addCart, getCart, removeFromCart, updateQuantity };
