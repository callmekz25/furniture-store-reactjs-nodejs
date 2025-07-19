import OrderStatus from "@/enums/order-status";

export function getOrderStatusVI(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING:
      return "Chờ xử lý";
    case OrderStatus.CONFIRMED:
      return "Đã xác nhận";
    case OrderStatus.SHIPPING:
      return "Đang vận chuyển";
    case OrderStatus.DELIVERED:
      return "Đã giao hàng";
    case OrderStatus.CANCELED:
      return "Đã hủy";
    case OrderStatus.RETURNED:
      return "Đã hoàn trả";
    case OrderStatus.FAILED:
      return "Thất bại";
    default:
      return "Không xác định";
  }
}
