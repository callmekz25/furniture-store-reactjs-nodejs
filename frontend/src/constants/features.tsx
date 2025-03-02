import {
  TruckIcon,
  BanknotesIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
const FEATURES = [
  {
    label: "Giao hàng miễn phí",
    descr: "Đơn đặt hàng trên 1 triệu",
    icon: <TruckIcon />,
  },
  {
    label: "Hỗ trợ hoàn tiền",
    descr: "Lên tới 30 ngày sau",
    icon: <BanknotesIcon />,
  },
  {
    label: "Thanh toán an toàn",
    descr: "Bảo mật và tin cậy",
    icon: <LockClosedIcon />,
  },
  {
    label: "Hỗ trợ 24/7",
    descr: "Hỗ trợ qua điện thoại và email",
    icon: <PhoneIcon />,
  },
];
export default FEATURES;
