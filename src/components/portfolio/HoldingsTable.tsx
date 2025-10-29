import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
}

const mockHoldings: Holding[] = [
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 50,
    avgPrice: 3100,
    currentPrice: 2930.40,
    value: 146520,
    pnl: -8480,
    pnlPercent: -5.48
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    quantity: 30,
    avgPrice: 1520,
    currentPrice: 1459.90,
    value: 43797,
    pnl: -1803,
    pnlPercent: -3.95
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    quantity: 25,
    avgPrice: 980,
    currentPrice: 947.30,
    value: 23682.50,
    pnl: -817.50,
    pnlPercent: -3.34
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 20,
    avgPrice: 1420,
    currentPrice: 1367.80,
    value: 27356,
    pnl: -1044,
    pnlPercent: -3.68
  }
];

export const HoldingsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Avg Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHoldings.map((holding) => (
              <TableRow key={holding.symbol}>
                <TableCell>
                  <div>
                    <div className="font-medium">{holding.symbol}</div>
                    <div className="text-sm text-muted-foreground">{holding.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{holding.quantity}</TableCell>
                <TableCell className="text-right">₹{holding.avgPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{holding.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{holding.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className={holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ₹{holding.pnl.toLocaleString()}
                    </span>
                    <Badge 
                      variant={holding.pnl >= 0 ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {holding.pnl >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};