
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter as UISidebarFooter, SidebarHeader as UISidebarHeader, SidebarMenu as UISidebarMenu, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNavigation } from "./sidebar-navigation";
import { UserDropdown } from "./user-dropdown";

export function MobileSidebar() {
  return (
    <Sidebar className="block md:hidden">
      <SidebarTrigger>Menu</SidebarTrigger>
      <SidebarContent className="gap-0">
        <UISidebarHeader className="pb-2">
          <Link to="/" className="px-3">
            Santa Matilda
          </Link>
        </UISidebarHeader>
        <Separator />
        <UISidebarMenu className="px-3">
          <SidebarNavigation />
        </UISidebarMenu>
        <Separator />
        <UISidebarFooter className="p-3">
          <UserDropdown />
        </UISidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
