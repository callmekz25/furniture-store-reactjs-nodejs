import mongoose, { Schema } from 'mongoose';

const subMenuSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: String,
    slug: String,
  },
  { _id: false }
);

const menuItemSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: String,
    slug: String,
    subMenu: [subMenuSchema],
  },
  { _id: false }
);

const menuSchema = new Schema(
  {
    data: [menuItemSchema],
  },
  { timestamps: true }
);

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
