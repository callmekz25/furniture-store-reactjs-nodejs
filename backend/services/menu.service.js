import Menu from '../models/menu.model.js';
class MenuService {
  static upsertMenu = async (id, menu) => {
    return await Menu.findOneAndUpdate(
      { _id: id },
      {
        data: menu,
      },
      { new: true, upsert: true }
    );
  };

  static getMenu = async () => {
    const menu = await Menu.find().lean();
    return menu[0];
  };
}
export default MenuService;
