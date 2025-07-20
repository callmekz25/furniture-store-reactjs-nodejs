interface IPaymentRequest {
  orderId: string;
  name: string;
  email: string;
  phoneNumber: string;
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
  paymentMethod: string;
}
export default IPaymentRequest;
