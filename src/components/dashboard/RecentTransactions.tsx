
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
}

interface RecentTransactionsProps {
  className?: string;
}

const transactions: Transaction[] = [];

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[320px]">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4 text-sm">{format(transaction.date, 'MMM dd')}</td>
                    <td className="p-4 text-sm">{transaction.description}</td>
                    <td className="p-4 text-sm">{transaction.category}</td>
                    <td className={`p-4 text-sm text-right ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-sm text-muted-foreground">No transactions yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
