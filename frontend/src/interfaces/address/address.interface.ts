export interface IAddress {
  _id: string;
  name: string;
  address: string;
  province: {
    id: string;
    name: string;
  };
  district: {
    id: string;
    name: string;
  };
  ward: {
    id: string;
    name: string;
  };
  phoneNumber: string;
  isDefault: boolean;
}
