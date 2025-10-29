import React from 'react';
import RealTimeStockPrices from '@/components/stocks/RealTimeStockPrices';

const Stocks = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stocks</h1>
        <p className="text-muted-foreground">Real-time stock prices and analysis</p>
      </div>
      <RealTimeStockPrices />
    </div>
  );
};

export default Stocks;