
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your investment dashboard</p>
      </div>
      <Dashboard />
    </div>
  );
};

export default Index;
