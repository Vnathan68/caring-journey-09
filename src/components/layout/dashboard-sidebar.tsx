import {
  LayoutDashboard,
  Settings,
  User2,
  FileText,
  LogOut,
  Calendar,
  Users,
  Wallet,
  Activity,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar"
import { ROLES } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sidebar className="block md:hidden">
      <SidebarTrigger>Menu</SidebarTrigger>
      <SidebarContent className="gap-0">
        <SidebarHeader className="pb-2">
          <Link to="/" className="px-3">
            Santa Matilda
          </Link>
        </SidebarHeader>
        <Separator />
        <SidebarMenu className="px-3">
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
              location.pathname === "/dashboard" && "bg-accent text-foreground"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/patients"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
              location.pathname === "/dashboard/patients" && "bg-accent text-foreground"
            )}
          >
            <Users className="h-5 w-5" />
            Patients
          </Link>
          {(user?.role === ROLES.SECRETARY_NURSE || user?.role === ROLES.ADMIN) && (
            <Link
              to="/dashboard/appointments"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
                location.pathname === "/dashboard/appointments" && "bg-accent text-foreground"
              )}
            >
              <Calendar className="h-5 w-5" />
              Appointments
            </Link>
          )}
          {(user?.role === ROLES.CASHIER || user?.role === ROLES.ADMIN) && (
            <Link
              to="/dashboard/billing"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
                location.pathname === "/dashboard/billing" && "bg-accent text-foreground"
              )}
            >
              <Wallet className="h-5 w-5" />
              Billing
            </Link>
          )}
          {(user?.role === ROLES.DOCTOR || user?.role === ROLES.ADMIN) && (
            <Link
              to="/dashboard/prescriptions"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
                location.pathname === "/dashboard/prescriptions" && "bg-accent text-foreground"
              )}
            >
              <FileText className="h-5 w-5" />
              Prescriptions
            </Link>
          )}
          <Link
            to="/dashboard/activity"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
              location.pathname === "/dashboard/activity" && "bg-accent text-foreground"
            )}
          >
            <Activity className="h-5 w-5" />
            Activity
          </Link>
        </SidebarMenu>
        <Separator />
        <SidebarFooter className="p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex h-8 w-full items-center justify-between rounded-md px-3 py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium leading-none">{user?.name}</span>
                </div>
                <Settings className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount className="w-[200px]">
              <DropdownMenuItem>
                <User2 className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SidebarMain({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("hidden md:block flex-col space-y-6 w-[280px] border-r p-3", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center space-x-2 px-3 py-2", className)} {...props}>Santa Matilda</div>
}

function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
    </nav>
  )
}

function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center space-x-2 px-3 py-2", className)} {...props}>
    </div>
  )
}

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-full items-center justify-between rounded-md px-3 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium leading-none">{user?.name}</span>
          </div>
          <Settings className="mr-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount className="w-[200px]">
        <DropdownMenuItem>
          <User2 className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SidebarMain, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter }
