import { supabase } from '@/integrations/supabase/client';

export const sendMarketAlert = async (email: string, alertType: 'opening' | 'closing', marketStatus: string) => {
  try {
    // For now, we'll simulate sending an alert
    console.log(`Market alert would be sent to ${email}: ${alertType} - ${marketStatus}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to send market alert:', error);
    throw error;
  }
};

export const setupMarketAlerts = (userEmail: string) => {
  const checkMarketStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    // Skip weekends
    if (day === 0 || day === 6) return;
    
    const marketOpen = 9 * 60 + 15; // 9:15 AM
    const marketClose = 15 * 60 + 15; // 3:15 PM
    
    // Send opening alert at 9:15 AM
    if (currentTime === marketOpen) {
      sendMarketAlert(userEmail, 'opening', 'Market Open');
    }
    
    // Send closing alert at 3:15 PM
    if (currentTime === marketClose) {
      sendMarketAlert(userEmail, 'closing', 'Market Closed');
    }
  };
  
  // Check every minute
  const interval = setInterval(checkMarketStatus, 60000);
  
  // Return cleanup function
  return () => clearInterval(interval);
};