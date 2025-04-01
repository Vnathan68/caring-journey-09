
import { Activity, Calendar, FileText, LayoutDashboard, Users, Wallet } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLink } from "./nav-link";
import { useAuth } from "@/contexts/auth-context";
import { ROLES } from "@/lib/utils";

export function SidebarNavigation() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <NavLink to="/dashboard" icon={LayoutDashboard} currentPath={location.pathname}>
        Dashboard
      </NavLink>
      
      <NavLink to="/dashboard/patients" icon={Users} currentPath={location.pathname}>
        Patients
      </NavLink>
      
      {(user?.role === ROLES.SECRETARY_NURSE || user?.role === ROLES.ADMIN) && (
        <NavLink to="/dashboard/appointments" icon={Calendar} currentPath={location.pathname}>
          Appointments
        </NavLink>
      )}
      
      {(user?.role === ROLES.ADMIN) && (
        <NavLink to="/dashboard/billing" icon={Wallet} currentPath={location.pathname}>
          Billing
        </NavLink>
      )}
      
      {(user?.role === ROLES.DOCTOR || user?.role === ROLES.ADMIN) && (
        <NavLink to="/dashboard/prescriptions" icon={FileText} currentPath={location.pathname}>
          Prescriptions
        </NavLink>
      )}
      
      <NavLink to="/dashboard/activity" icon={Activity} currentPath={location.pathname}>
        Activity
      </NavLink>
    </>
  );
}
