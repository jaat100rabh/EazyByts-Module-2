
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { type StockData } from '@/lib/stockData';

interface StockCardProps {
  stock: StockData;
  onClick?: () => void;
  onAddToWatchlist?: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onClick, onAddToWatchlist }) => {
  const isPositive = stock.change >= 0;
  
  return (
    <Card 
      className="stock-card overflow-hidden" 
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-base font-semibold tracking-tight">{stock.symbol}</CardTitle>
        <div className="flex items-center">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-stock-up mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-stock-down mr-1" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground line-clamp-1">{stock.name}</p>
          <div className="flex justify-between items-baseline">
            <p className="text-2xl font-bold">₹{stock.price.toFixed(2)}</p>
            <div className={cn(
              "flex items-center text-xs font-medium",
              isPositive ? "text-stock-up" : "text-stock-down"
            )}>
              <span>{isPositive ? "+" : ""}{stock.change.toFixed(2)}</span>
              <span className="ml-1">({isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Volume</p>
              <p>{(stock.volume / 1000000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p>{stock.marketCap}</p>
            </div>
          </div>
          {onAddToWatchlist && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full mt-2"
              onClick={(e) => {
                e.stopPropagation();
                onAddToWatchlist();
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add to Watchlist
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
