import { ExamDashboard } from "@/components/pages/dashboard/exam-dashboard";
import {
  DashboardSidebar,
  MobileNav,
} from "@/components/pages/dashboard/sidebar";
import { UserNav } from "@/components/pages/dashboard/user-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <MobileNav />
                <h1 className="text-xl font-bold">Teacher Dashboard</h1>
              </div>
              <UserNav />
            </div>
          </header>
          <main className="flex-1 animate-fade-in">
            <ExamDashboard />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

