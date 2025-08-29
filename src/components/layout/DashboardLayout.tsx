import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "./mode.toggle";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b px-4 sticky top-0 bg-background z-50">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </header>
        
        <main className="flex flex-1 flex-col gap-4 p-4 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
