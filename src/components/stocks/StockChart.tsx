
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart
} from 'recharts';
import { StockData } from '@/lib/stockData';
import { Clock, RefreshCw } from 'lucide-react';
import { getCachedChartData, ChartDataPoint } from '@/services/chartDataService';

interface StockChartProps {
  stock: StockData;
  onRefresh?: () => void;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

const StockChart: React.FC<StockChartProps> = ({ stock, onRefresh }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const isPositive = stock.change >= 0;
  
  // Update chart data when time range or stock changes
  useEffect(() => {
    const data = getCachedChartData(
      stock.symbol, 
      timeRange, 
      stock.price, 
      isPositive
    );
    setChartData(data);
  }, [timeRange, stock.symbol, stock.price, isPositive]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="stock-chart-tooltip bg-background p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <p className="text-sm font-medium text-primary">{`Price: ₹${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    
    return null;
  };
  
  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle className="text-lg font-bold">
            {stock.name} ({stock.symbol}) Price Chart
          </CardTitle>
          {stock.lastUpdated && (
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {new Date(stock.lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div className="flex space-x-1">
          {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
            <Button 
              key={range}
              variant={timeRange === range ? "default" : "ghost"} 
              size="sm"
              onClick={() => setTimeRange(range)}
              className="text-xs h-7 px-2"
            >
              {range}
            </Button>
          ))}
          {onRefresh && (
            <Button 
              variant="outline" 
              size="sm"
              className="ml-2 h-7"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex items-baseline space-x-2">
          <span className="text-2xl font-bold">₹{stock.price.toFixed(2)}</span>
          <span className={`text-sm font-medium ${isPositive ? 'text-stock-up' : 'text-stock-down'}`}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={`colorStock${isPositive ? 'Up' : 'Down'}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={isPositive ? '#22c55e' : '#ef4444'} 
                fillOpacity={1}
                fill={`url(#colorStock${isPositive ? 'Up' : 'Down'})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
