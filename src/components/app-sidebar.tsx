'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart2, Inbox, Settings, Users, LifeBuoy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';

const menuItems = [
  { href: '/dashboard', label: 'Inbox', icon: Inbox },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/teams', label: 'Teams', icon: Users },
];

const bottomMenuItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/support', label: 'Support', icon: LifeBuoy },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { name, email, avatarUrl } = useUser();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h1 className="text-xl font-headline font-semibold text-primary-600 group-data-[state=collapsed]:hidden">Verity Response</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{content: item.label, side:"right", align:"center"}}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
            {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{content: item.label, side:"right", align:"center"}}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <div className="mt-4 flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl} data-ai-hint="person avatar" />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[state=collapsed]:hidden">
            <span className="font-semibold text-sm text-sidebar-foreground">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
