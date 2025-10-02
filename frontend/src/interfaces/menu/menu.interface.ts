import { ISubMenu } from './sub-menu.interface';

export interface IMenu {
  _id: string;
  name: string;
  slug: string;
  subMenu: ISubMenu[];
}
