import express from 'express';
import MenuController from '../controllers/menu.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';
const router = express.Router();

router.get('/menu', MenuController.getMenu);
router.post(
  '/menu',
  authMiddleware,
  authorizationMiddleware,
  MenuController.upsertMenu
);
export default router;
