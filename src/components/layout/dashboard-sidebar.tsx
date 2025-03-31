
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, Home, Calendar, FileText, 
  User, Users, MessageSquare, CreditCard, 
  Settings, LogOut, BarChart2, Clipboard, 
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { ROLES } from '@/lib/utils';
import { 
  Sidebar, 
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!user) return [];

    const commonLinks = [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Profile', path: '/dashboard/profile', icon: User },
      { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    ];

    switch (user.role) {
      case ROLES.ADMIN:
        return [
          ...commonLinks,
          { name: 'Users', path: '/dashboard/users', icon: Users },
          { name: 'Reports', path: '/dashboard/reports', icon: BarChart2 },
          { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
          { name: 'Finance', path: '/dashboard/finance', icon: CreditCard },
          { name: 'Settings', path: '/dashboard/settings', icon: Settings },
        ];
      case ROLES.DOCTOR:
        return [
          ...commonLinks,
          { name: 'Patients', path: '/dashboard/patients', icon: Users },
          { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
          { name: 'Medical Records', path: '/dashboard/records', icon: FileText },
          { name: 'Prescriptions', path: '/dashboard/prescriptions', icon: Clipboard },
        ];
      case ROLES.SECRETARY_NURSE:
        return [
          ...commonLinks,
          { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
          { name: 'Patients', path: '/dashboard/patients', icon: Users },
          { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
          { name: 'Reports', path: '/dashboard/reports', icon: BarChart2 },
          { name: 'Announcements', path: '/dashboard/announcements', icon: Bell },
        ];
      case ROLES.PATIENT:
        return [
          ...commonLinks,
          { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
          { name: 'Medical Records', path: '/dashboard/records', icon: FileText },
          { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
          { name: 'Pregnancy', path: '/dashboard/pregnancy', icon: Heart },
        ];
      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className={cn(
          "flex items-center p-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-clinic-600" />
              <span className="font-poppins font-semibold text-lg">Santa Matilda</span>
            </Link>
          )}
          {collapsed && (
            <Heart className="h-6 w-6 text-clinic-600" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === link.path}
                    tooltip={link.name}
                  >
                    <Link to={link.path}>
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "w-full flex items-center text-muted-foreground hover:text-foreground",
              "hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            )}
          >
            <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
