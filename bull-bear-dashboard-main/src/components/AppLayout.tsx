import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './search/SearchBar';
import UserProfileMenu from './layout/UserProfileMenu';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
            <div className="flex h-14 items-center px-4 gap-4">
              <SidebarTrigger />
              
              <div className="flex-1 md:ml-auto md:w-80 lg:w-96 hidden md:block">
                <SearchBar />
              </div>
              
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
                
                <UserProfileMenu />
              </div>
            </div>
            <div className="md:hidden px-4 pb-3">
              <SearchBar />
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}