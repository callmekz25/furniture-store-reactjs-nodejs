import MenuService from '../services/menu.service.js';
import asyncHandler from '../helpers/asyncHandler.js';
import { OkSuccess } from '../core/success.response.js';
class MenuController {
  static upsertMenu = asyncHandler(async (req, res, next) => {
    const { menu, id } = req.body;
    await MenuService.upsertMenu(id, menu);
    return res
      .status(200)
      .json(new OkSuccess({ message: 'Create menu successfully' }));
  });
  static getMenu = asyncHandler(async (req, res, next) => {
    const menu = await MenuService.getMenu();
    return res
      .status(200)
      .json(new OkSuccess({ message: 'Get menu successfully', data: menu }));
  });
}

export default MenuController;
