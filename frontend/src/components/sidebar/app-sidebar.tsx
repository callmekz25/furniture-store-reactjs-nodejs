import * as React from "react";
import { NavUser } from "@/components/sidebar/nav-user";
import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  PercentIcon,
  ShoppingBagIcon,
  User2Icon,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Đơn hàng",
      url: "#",
      icon: ShoppingBagIcon,
      isActive: true,
      items: [
        {
          title: "Danh sách",
          url: "/admin/orders",
        },
      ],
    },
    {
      title: "Khách hàng",
      url: "#",
      icon: User2Icon,
      isActive: true,
      items: [
        {
          title: "Danh sách",
          url: "/admin/users",
        },
      ],
    },
    {
      title: "Khuyến mãi",
      url: "#",
      icon: PercentIcon,
      isActive: true,
      items: [
        {
          title: "Danh sách",
          url: "/admin/promotions",
        },
        {
          title: "Tạo khuyến mãi",
          url: "/admin/add-promotion",
        },
      ],
    },

    {
      title: "Sản phẩm",
      url: "#",
      icon: ShoppingBagIcon,
      isActive: true,
      items: [
        {
          title: "Danh sách",
          url: "/admin/products",
        },
        {
          title: "Tạo mới",
          url: "/admin/add-product",
        },
        {
          title: "Danh mục",
          url: "#",
        },
      ],
    },
  ],
};
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        {/* <h3 className="font-bold">VNest</h3> */}
      </SidebarHeader>
      <SidebarContent className="bg-white font-semibold ">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-white font-semibold">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
export default AppSidebar;
