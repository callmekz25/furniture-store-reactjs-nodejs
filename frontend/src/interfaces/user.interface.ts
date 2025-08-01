import { IAddress } from "./address/address.interface";

interface IUser {
  _id?: string;
  name?: string;
  role?: string;
  email: string;
  password: string;
  addresses: IAddress[];
  createdAt: string;
}
export default IUser;
