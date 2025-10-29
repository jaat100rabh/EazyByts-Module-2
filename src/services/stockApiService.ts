
import { supabase } from '@/integrations/supabase/client';
import { StockData } from '@/lib/stockData';
import { toast } from 'sonner';

export interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  previousClose?: number;
  latestTradingDay?: string;
}



export const updateStocksWithRealTimeData = (
  stocks: StockData[], 
  realTimeData: StockPrice[]
): StockData[] => {
  if (!realTimeData || realTimeData.length === 0) return stocks;
  
  // Create a map for quick lookup
  const priceMap = new Map(realTimeData.map(item => [item.symbol, item]));
  
  return stocks.map(stock => {
    const realTimePrice = priceMap.get(stock.symbol);
    
    if (realTimePrice) {
      return {
        ...stock,
        price: realTimePrice.price,
        change: realTimePrice.change,
        changePercent: realTimePrice.changePercent,
        volume: realTimePrice.volume || stock.volume,
        lastUpdated: new Date().toISOString()
      };
    }
    
    return stock;
  });
};

// Function to create a periodic data refresh
export const setupStockDataRefresh = (
  symbols: string[],
  onUpdate: (prices: StockPrice[]) => void,
  intervalMinutes: number = 1
): () => void => {
  // Initial fetch
  fetchRealTimeStockPrices(symbols)
    .then(prices => {
      onUpdate(prices);
      toast.success('Stock prices updated');
    })
    .catch(error => {
      console.error('Failed to fetch initial stock data:', error);
      toast.error('Failed to fetch stock prices');
    });
  
  // Set up interval for periodic updates
  const intervalId = setInterval(() => {
    fetchRealTimeStockPrices(symbols)
      .then(prices => {
        onUpdate(prices);
        toast.success('Stock prices updated', {
          id: 'stock-update', // Use a consistent ID to prevent multiple toasts
        });
      })
      .catch(error => {
        console.error('Failed to update stock data:', error);
      });
  }, intervalMinutes * 60 * 1000);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};
