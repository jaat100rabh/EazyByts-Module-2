
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStocks, fetchNews, type StockData } from '@/lib/stockData';
import { fetchRealTimeStockPrices, updateStocksWithRealTimeData } from '@/services/stockApiService';
import StockCard from '../stocks/StockCard';
import StockChart from '../stocks/StockChart';
import NewsCard from '../news/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WatchlistPage from '../watchlist/WatchlistPage';
// Demo mode: do not require auth for rendering
import StockDetailsDialog from '../stocks/StockDetailsDialog';
import { toast } from 'sonner';
import { Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('market');
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { 
    data: stocks, 
    isLoading: stocksLoading,
    error: stocksError
  } = useQuery({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
    // Demo mode: always enable
    enabled: true
  });

  // Query for real-time stock data
  const { 
    data: realTimeStocks,
    isLoading: realTimeLoading,
    error: realTimeError,
    refetch: refetchRealTimeData
  } = useQuery({
    queryKey: ['realTimeStocks'],
    queryFn: async () => {
      if (!stocks) return [];
      const symbols = stocks.map(stock => stock.symbol);
      try {
        const data = await fetchRealTimeStockPrices(symbols);
        return data;
      } catch (error) {
        console.error("Failed to fetch real-time data:", error);
        toast.error("Could not fetch real-time prices. Using cached data.");
        return [];
      }
    },
    enabled: !!stocks && stocks.length > 0,
    refetchInterval: 60000 * 5,
    retry: 2
  });
  
  // Combine mock data with real-time data
  const combinedStocks = React.useMemo(() => {
    if (!stocks) return [];
    if (!realTimeStocks || realTimeStocks.length === 0) return stocks;
    
    return updateStocksWithRealTimeData(stocks, realTimeStocks);
  }, [stocks, realTimeStocks]);
  
  const { 
    data: news, 
    isLoading: newsLoading,
    error: newsError
  } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    // Demo mode: always enable
    enabled: true
  });
  
  // Set the first stock as selected when data loads
  useEffect(() => {
    if (combinedStocks && combinedStocks.length > 0 && !selectedStock) {
      setSelectedStock(combinedStocks[0]);
    } else if (combinedStocks && selectedStock) {
      // Update selected stock with real-time data if it exists
      const updatedSelectedStock = combinedStocks.find(stock => stock.symbol === selectedStock.symbol);
      if (updatedSelectedStock) {
        setSelectedStock(updatedSelectedStock);
      }
    }
  }, [combinedStocks, selectedStock]);
  
  const handleStockClick = (stock: StockData) => {
    setSelectedStock(stock);
    setIsStockDialogOpen(true);
  };
  
  const handleRefreshData = () => {
    refetchRealTimeData();
    toast.info("Refreshing stock prices...");
  };
  
  if (stocksError || newsError) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">Error loading data. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="mb-0">
            <TabsTrigger value="market">Market Overview</TabsTrigger>
            <TabsTrigger value="watchlist">My Watchlists</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="market" className="pt-6">
          {/* Market Overview Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Market Overview</h2>
              <div className="flex items-center">
                {realTimeStocks && realTimeStocks.length > 0 && (
                  <div className="text-xs text-muted-foreground mr-4 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                )}
                <button 
                  onClick={handleRefreshData}
                  className="text-sm px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={realTimeLoading}
                >
                  {realTimeLoading ? "Updating..." : "Refresh Prices"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stocksLoading ? (
                // Loading skeletons
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="rounded-lg border shadow">
                    <div className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-8 w-32" />
                        <div className="flex justify-between pt-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                combinedStocks?.map((stock) => (
                  <StockCard 
                    key={stock.id} 
                    stock={stock} 
                    onClick={() => setSelectedStock(stock)}
                    onAddToWatchlist={() => handleStockClick(stock)}
                  />
                ))
              )}
            </div>
          </section>
          
          {/* Stock Chart Section */}
          <section className="h-[400px] mt-6">
            {selectedStock ? (
              <StockChart stock={selectedStock} />
            ) : (
              <div className="border rounded-lg h-full flex items-center justify-center">
                <Skeleton className="h-[350px] w-full rounded-lg" />
              </div>
            )}
          </section>
          
          {/* News Section */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Latest Financial News</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newsLoading ? (
                // Loading skeletons
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="rounded-lg border shadow">
                    <div className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                news?.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))
              )}
            </div>
          </section>
          
          {/* Stock Details Dialog */}
          <StockDetailsDialog
            stock={selectedStock}
            isOpen={isStockDialogOpen}
            onOpenChange={setIsStockDialogOpen}
          />
        </TabsContent>
        
        <TabsContent value="watchlist" className="pt-6">
          <WatchlistPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
