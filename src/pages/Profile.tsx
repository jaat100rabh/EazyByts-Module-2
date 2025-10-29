
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LogOut, Settings, User, Bell, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setupMarketAlerts } from '@/services/marketAlertService';
import { useTheme } from 'next-themes';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [marketAlertsEnabled, setMarketAlertsEnabled] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleMarketAlertsToggle = (enabled: boolean) => {
    setMarketAlertsEnabled(enabled);
    if (enabled && user?.email) {
      setupMarketAlerts(user.email);
      toast.success('Market alerts enabled! You\'ll receive notifications when the market opens and closes.');
    } else {
      toast.success('Market alerts disabled.');
    }
  };

  const handleThemeToggle = (isDark: boolean) => {
    setTheme(isDark ? 'dark' : 'light');
    toast.success(`Switched to ${isDark ? 'dark' : 'light'} mode`);
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to view your profile</p>
      </div>
    );
  }
  
  // Extract username from email (before @)
  const username = user.email ? user.email.split('@')[0] : 'User';
  
  // Get initials for avatar fallback
  const initials = username.substring(0, 2).toUpperCase();
  
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid gap-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{username}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Account Details</h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Created</p>
                        <p>{new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Preferences</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                      </div>
                      <Switch 
                        id="dark-mode"
                        checked={theme === 'dark'}
                        onCheckedChange={handleThemeToggle}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Label htmlFor="market-alerts">Market Opening/Closing Alerts</Label>
                      </div>
                      <Switch 
                        id="market-alerts"
                        checked={marketAlertsEnabled}
                        onCheckedChange={handleMarketAlertsToggle}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" onClick={() => navigate('/settings')}>
                      <Settings className="h-4 w-4 mr-2" /> 
                      Account Settings
                    </Button>
                    <Button variant="destructive" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
