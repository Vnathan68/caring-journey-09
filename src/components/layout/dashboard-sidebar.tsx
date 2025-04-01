
import React from "react";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import { DesktopSidebar } from "./sidebar/desktop-sidebar";

// Re-export these components for backward compatibility
// They're still used in desktop-sidebar.tsx
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarMain({ className, children, ...props }: SidebarProps) {
  return (
    <div className={`hidden md:block flex-col space-y-6 w-[280px] border-r p-3 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex items-center space-x-2 px-3 py-2 ${className}`} {...props} />
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav className={`flex flex-col space-y-1 ${className}`} {...props} />
  )
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center space-x-2 px-3 py-2 ${className}`} {...props} />
  )
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${className}`} {...props} />
}

// Main component that combines mobile and desktop sidebars
export function DashboardSidebar() {
  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
}
