
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import ExpensesByCategory from '@/components/dashboard/ExpensesByCategory';
import MonthlySpending from '@/components/dashboard/MonthlySpending';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ExportData from '@/components/ExportData';
import { CreditCard, Wallet, CalendarDays } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Financial Dashboard</h1>
        <ExportData />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Expenses" 
          value="$2,975.55" 
          description="Current Month"
          icon={<CreditCard className="h-6 w-6" />}
          trend={{ value: 12.5, isPositive: false }}
        />
        <StatCard 
          title="Total Budget" 
          value="$4,000.00" 
          description="Current Month"
          icon={<Wallet className="h-6 w-6" />}
        />
        <StatCard 
          title="Savings Rate" 
          value="25%" 
          description="Current Month" 
          icon={<CalendarDays className="h-6 w-6" />}
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BudgetOverview />
        <ExpensesByCategory className="lg:col-span-2" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MonthlySpending className="lg:col-span-2" />
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Index;
