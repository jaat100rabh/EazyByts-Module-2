
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StockData } from '@/lib/stockData';
import { getWatchlists, addStockToWatchlist } from '@/services/watchlistService';
import { toast } from 'sonner';
import { Check, Plus } from 'lucide-react';

interface StockDetailsDialogProps {
  stock: StockData | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const StockDetailsDialog: React.FC<StockDetailsDialogProps> = ({
  stock,
  isOpen,
  onOpenChange,
}) => {
  const queryClient = useQueryClient();
  const [selectedWatchlistId, setSelectedWatchlistId] = useState<string | null>(null);

  const { data: watchlists } = useQuery({
    queryKey: ['watchlists'],
    queryFn: getWatchlists
  });

  const addToWatchlistMutation = useMutation({
    mutationFn: ({ watchlistId, stockSymbol }: { watchlistId: string, stockSymbol: string }) => 
      addStockToWatchlist(watchlistId, stockSymbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlistStocks'] });
      toast.success('Stock added to watchlist');
    },
    onError: (error) => {
      toast.error(`Failed to add stock: ${error.message}`);
    }
  });

  if (!stock) return null;

  const handleAddToWatchlist = (watchlistId: string) => {
    if (stock) {
      addToWatchlistMutation.mutate({ 
        watchlistId, 
        stockSymbol: stock.symbol 
      });
      setSelectedWatchlistId(watchlistId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              {stock.name} ({stock.symbol})
            </div>
            <div className={`text-sm ${stock.change >= 0 ? 'text-stock-up' : 'text-stock-down'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
              ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">₹{stock.price.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Current Price</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-3 text-center">
              <div className="text-lg font-semibold">₹{stock.high52w.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">52 Week High</div>
            </div>
            <div className="border rounded p-3 text-center">
              <div className="text-lg font-semibold">₹{stock.low52w.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">52 Week Low</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-3">
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="font-medium">{(stock.volume / 1000000).toFixed(2)}M</div>
            </div>
            <div className="border rounded p-3">
              <div className="text-xs text-muted-foreground">Market Cap</div>
              <div className="font-medium">{stock.marketCap}</div>
            </div>
          </div>

          {watchlists && watchlists.length > 0 && (
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Add to watchlist:</p>
              <div className="flex flex-wrap gap-2">
                {watchlists.map(watchlist => (
                  <Button
                    key={watchlist.id}
                    size="sm"
                    variant={selectedWatchlistId === watchlist.id ? "default" : "outline"}
                    onClick={() => handleAddToWatchlist(watchlist.id)}
                    disabled={addToWatchlistMutation.isPending}
                    className="flex items-center"
                  >
                    {selectedWatchlistId === watchlist.id ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <Plus className="h-3 w-3 mr-1" />
                    )}
                    {watchlist.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockDetailsDialog;
