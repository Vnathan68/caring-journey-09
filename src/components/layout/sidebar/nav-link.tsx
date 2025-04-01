
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  currentPath: string;
}

export function NavLink({ to, icon: Icon, children, currentPath }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
        currentPath === to && "bg-accent text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
  );
}
