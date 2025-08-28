
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent } from "@/components/ui/sidebar";
import { Home, Calendar, Users, Settings, Rss, Loader2 } from "lucide-react";
import { ProfileHeader } from "@/components/dashboard/profile-header";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userData?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [userData, loading, router]);

  if (loading || userData?.role !== "admin") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r border-primary/20">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin" tooltip="Dashboard">
                  <Home />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/events" tooltip="Manage Events">
                  <Calendar />
                  Manage Events
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/users" tooltip="Manage Users">
                  <Users />
                  Manage Users
                </SidebarMenuButton>
              </SidebarMenuItem>
                 <SidebarMenuItem>
                <SidebarMenuButton href="/admin/updates" tooltip="Manage Updates">
                  <Rss />
                  Manage Updates
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background/95">
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-headline text-3xl text-primary">Admin Panel</h1>
                <div className="flex items-center gap-4">
                  <ProfileHeader adminView />
                  <SidebarTrigger className="md:hidden" />
                </div>
            </div>
            {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
