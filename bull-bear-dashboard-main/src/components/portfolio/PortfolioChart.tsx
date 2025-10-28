import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface PortfolioDataPoint {
  date: string;
  value: number;
  invested: number;
}

const portfolioData: PortfolioDataPoint[] = [
  { date: '2024-01', value: 200000, invested: 200000 },
  { date: '2024-02', value: 205000, invested: 205000 },
  { date: '2024-03', value: 215000, invested: 210000 },
  { date: '2024-04', value: 225000, invested: 220000 },
  { date: '2024-05', value: 235000, invested: 230000 },
  { date: '2024-06', value: 245000, invested: 240000 },
  { date: '2024-07', value: 250000, invested: 245000 },
  { date: '2024-08', value: 253500, invested: 253500 },
];

export const PortfolioChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const invested = payload[1]?.value || 200000;
      const profit = value - invested;
      const profitPercent = ((profit / invested) * 100).toFixed(2);
      
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{`Month: ${label}`}</p>
          <p className="text-sm text-primary">{`Portfolio Value: ₹${value.toLocaleString()}`}</p>
          <p className="text-sm text-muted-foreground">{`Invested: ₹${invested.toLocaleString()}`}</p>
          <p className={`text-sm font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {`P&L: ₹${profit.toLocaleString()} (${profitPercent}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="gainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="invested" 
                stroke="hsl(var(--muted-foreground))" 
                fillOpacity={1}
                fill="url(#investedGradient)"
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1}
                fill="url(#gainGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};