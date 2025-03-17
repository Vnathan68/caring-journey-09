import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, 
  Heart, Home, Calendar, FileText, 
  User, Users, MessageSquare, CreditCard, 
  Settings, LogOut, BarChart2, Clipboard, 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { ROLES } from '@/lib/utils';

const DashboardSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!user) return [];

    const commonLinks = [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Profile', path: '/dashboard/profile', icon: User },
      { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    ];

    switch (user.role) {
      case ROLES.SECRETARY_NURSE:
        return [
          ...commonLinks,
          { name: 'Users', path: '/dashboard/users', icon: Users },
          { name: 'Reports', path: '/dashboard/reports', icon: BarChart2 },
          { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
          { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
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
      case ROLES.PATIENT:
        return [
          ...commonLinks,
          { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
          { name: 'Medical Records', path: '/dashboard/records', icon: FileText },
          { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
        ];
      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-border",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "flex items-center p-4 border-b border-border",
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center py-3 px-3 rounded-md transition-colors",
                    "hover:bg-slate-100 dark:hover:bg-slate-800",
                    location.pathname === link.path ? "bg-clinic-50 text-clinic-700 dark:bg-slate-800/60 dark:text-clinic-400" : "text-foreground",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <link.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span>{link.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "w-full flex items-center text-muted-foreground hover:text-foreground",
              "hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
              collapsed ? "justify-center py-3 px-0" : "justify-start"
            )}
          >
            <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
