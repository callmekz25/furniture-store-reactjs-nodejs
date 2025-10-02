import mongoose, { Schema } from 'mongoose';

const menuSchema = new Schema(
  {
    data: [
      {
        name: String,
        slug: String,
        subMenu: [
          {
            name: String,
            slug: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
