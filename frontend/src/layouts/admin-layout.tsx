import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import AppSidebar from "@/components/sidebar/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
const LayoutAdmin = () => {
  const location = useLocation();
  const pathName = location.pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F3F4EF]">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
            <BreadcrumbList>
                {pathName.map((path) => {
                  return (
                    <div className="flex items-center" key={path}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">{path}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 p-10 pt-0 ">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutAdmin;
