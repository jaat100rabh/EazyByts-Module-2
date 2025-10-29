
import React from 'react';
import { IndianRupee, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '../search/SearchBar';
import { useNavigate } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center mr-4">
          <IndianRupee className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">Bull Bear Dashboard</span>
        </div>
        
        <div className="flex-1 md:ml-auto md:w-80 lg:w-96 hidden md:block">
          <SearchBar />
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <UserProfileMenu />
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;
