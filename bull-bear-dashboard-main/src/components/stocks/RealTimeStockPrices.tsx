
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  fetchRealTimeStockPrices, 
  StockPrice,
  setupStockDataRefresh 
} from '@/services/stockApiService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Popular Indian stocks with updated TCS price
const POPULAR_STOCKS = ['RELIANCE.BSE', 'TCS.BSE', 'HDFCBANK.BSE', 'INFY.BSE', 'ICICIBANK.BSE'];

// Mock data for initial rendering
const MOCK_STOCK_DATA: StockPrice[] = [
  { symbol: 'RELIANCE.BSE', price: 1456.40, change: 0.15, changePercent: 0.15, volume: 9036695 },
  { symbol: 'TCS.BSE', price: 3561.30, change: -0.52, changePercent: -0.52, volume: 1666727 },
  { symbol: 'HDFCBANK.BSE', price: 1934.70, change: 0.05, changePercent: 0.05, volume: 7934005 },
  { symbol: 'INFY.BSE', price: 1589.90, change: -1.43, changePercent: -1.43, volume: 4576751 },
  { symbol: 'ICICIBANK.BSE', price: 1454.00, change: 0.22, changePercent: 0.22, volume: 6439208 }
];

const RealTimeStockPrices = () => {
  const [stockPrices, setStockPrices] = useState<StockPrice[]>(MOCK_STOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  const updatePrices = (prices: StockPrice[]) => {
    // If no real-time prices are available, use our mock data
    if (!prices || prices.length === 0) {
      setStockPrices(MOCK_STOCK_DATA);
    } else {
      setStockPrices(prices);
    }
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
    setRefreshing(false);
  };
  
  const handleRefresh = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    try {
      const prices = await fetchRealTimeStockPrices(POPULAR_STOCKS);
      updatePrices(prices);
    } catch (error) {
      console.error('Error refreshing stock data:', error);
      toast.error('Failed to refresh stock data');
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    // Use mock data initially but try to get real data
    setStockPrices(MOCK_STOCK_DATA);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
    
    // Set up real-time data refresh every 30 seconds for more frequent updates
    const cleanup = setupStockDataRefresh(POPULAR_STOCKS, updatePrices, 0.5);
    return cleanup;
  }, []);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Real-Time Stock Prices</CardTitle>
            <CardDescription>
              {lastUpdated ? `Last updated: ${lastUpdated}` : 'Fetching latest prices...'}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            <RefreshCcw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-2 animate-pulse">
                <div className="h-5 bg-muted rounded w-24"></div>
                <div className="h-5 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {stockPrices.map((stock) => (
              <div 
                key={stock.symbol} 
                className="flex justify-between items-center p-2 rounded-md hover:bg-accent transition-colors"
              >
                <div className="font-medium">{stock.symbol.split('.')[0]}</div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold">₹{stock.price.toFixed(2)}</div>
                  <div 
                    className={`flex items-center ${stock.change >= 0 ? 'text-stock-up' : 'text-stock-down'}`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                      ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {stockPrices.length === 0 && (
              <p className="text-center py-4 text-muted-foreground">
                No stock data available at the moment.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeStockPrices;
