
import { Link } from "react-router-dom";
import { SidebarFooter, SidebarHeader, SidebarMain, SidebarMenu } from "../dashboard-sidebar";
import { SidebarNavigation } from "./sidebar-navigation";
import { UserDropdown } from "./user-dropdown";

export function DesktopSidebar() {
  return (
    <SidebarMain className="border-r">
      <SidebarHeader className="px-3 py-2 text-xl font-bold">
        <Link to="/">Santa Matilda</Link>
      </SidebarHeader>
      <SidebarMenu className="flex flex-col space-y-1 px-3 py-2">
        <SidebarNavigation />
      </SidebarMenu>
      <SidebarFooter className="mt-auto px-3 py-2">
        <UserDropdown />
      </SidebarFooter>
    </SidebarMain>
  );
}
