import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { getSidebarItemsByRole } from "@/utils/getSidebarItemsByRole";
import type { TRole } from "@/types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery();
  const data = {
    navMain: getSidebarItemsByRole(userData?.role as TRole),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader  className="sm:pl-8 sm:pt-5">
        <Link to={"/"}><Logo /></Link>
      </SidebarHeader>
      <SidebarContent  className="sm:pl-4">
        
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
