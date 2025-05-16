interface ICheckoutRequest {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  paymentMethod: string;
}
export default ICheckoutRequest;
