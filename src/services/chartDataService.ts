export interface ChartDataPoint {
  time: string;
  price: number;
  volume?: number;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

// Generate realistic chart data for different time ranges
export const generateChartDataForRange = (
  basePrice: number, 
  timeRange: TimeRange, 
  isPositiveTrend: boolean = true
): ChartDataPoint[] => {
  const now = new Date();
  const data: ChartDataPoint[] = [];
  
  // Configuration for different time ranges
  const config = {
    '1D': { points: 24, interval: 60 * 60 * 1000, format: 'HH:mm' }, // hourly for 1 day
    '1W': { points: 7, interval: 24 * 60 * 60 * 1000, format: 'MM/dd' }, // daily for 1 week
    '1M': { points: 30, interval: 24 * 60 * 60 * 1000, format: 'MM/dd' }, // daily for 1 month
    '3M': { points: 90, interval: 24 * 60 * 60 * 1000, format: 'MM/dd' }, // daily for 3 months
    '1Y': { points: 52, interval: 7 * 24 * 60 * 60 * 1000, format: 'MM/dd' }, // weekly for 1 year
    'ALL': { points: 120, interval: 30 * 24 * 60 * 60 * 1000, format: 'MM/yy' }, // monthly for 10 years
  };
  
  const { points, interval, format } = config[timeRange];
  const startTime = now.getTime() - (points * interval);
  
  // Generate trend based on time range
  const trendDirection = isPositiveTrend ? 1 : -1;
  const volatility = {
    '1D': 0.02, // 2% daily volatility
    '1W': 0.03, // 3% weekly volatility
    '1M': 0.05, // 5% monthly volatility
    '3M': 0.08, // 8% quarterly volatility
    '1Y': 0.15, // 15% yearly volatility
    'ALL': 0.25, // 25% long-term volatility
  }[timeRange];
  
  let currentPrice = basePrice;
  
  for (let i = 0; i < points; i++) {
    const time = new Date(startTime + (i * interval));
    
    // Add some realistic price movement
    const randomChange = (Math.random() - 0.5) * volatility * basePrice;
    const trendChange = (trendDirection * 0.001 * basePrice * i) / points;
    currentPrice += randomChange + trendChange;
    
    // Ensure price doesn't go negative
    currentPrice = Math.max(currentPrice, basePrice * 0.1);
    
    data.push({
      time: formatTime(time, format),
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 100000
    });
  }
  
  return data;
};

const formatTime = (date: Date, format: string): string => {
  switch (format) {
    case 'HH:mm':
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
    case 'MM/dd':
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit' 
      });
    case 'MM/yy':
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        year: '2-digit' 
      });
    default:
      return date.toLocaleDateString();
  }
};

// Cache for chart data to avoid regenerating unnecessarily
const chartDataCache = new Map<string, { data: ChartDataPoint[], timestamp: number }>();

export const getCachedChartData = (
  symbol: string, 
  timeRange: TimeRange, 
  basePrice: number, 
  isPositiveTrend: boolean = true
): ChartDataPoint[] => {
  const cacheKey = `${symbol}-${timeRange}`;
  const cached = chartDataCache.get(cacheKey);
  
  // Cache for 5 minutes for real-time feel
  const cacheExpiry = 5 * 60 * 1000;
  
  if (cached && (Date.now() - cached.timestamp) < cacheExpiry) {
    return cached.data;
  }
  
  const data = generateChartDataForRange(basePrice, timeRange, isPositiveTrend);
  chartDataCache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
};