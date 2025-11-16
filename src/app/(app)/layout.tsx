import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
