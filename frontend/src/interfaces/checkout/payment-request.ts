interface IPaymentRequest {
  orderId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  province: string;
  total: number;
  district: string;
  ward: string;
  paymentMethod: string;
}
export default IPaymentRequest;
