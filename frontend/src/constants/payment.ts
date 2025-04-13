import Momo from "../assets/images/wallets/momo.svg";
import Banking from "../assets/images/wallets/banking.svg";
import Cod from "../assets/images/wallets/cod.svg";
const PAYMENTS = [
  {
    label: "Thanh toán khi nhận hàng (COD)",
    image: Cod,
    method: "cod",
  },
  {
    label: "Chuyển khoản qua ngân hàng",
    image: Banking,
    method: "bank",
  },
  {
    label: "Ví Momo",
    image: Momo,
    method: "momo",
  },
];
export default PAYMENTS;
