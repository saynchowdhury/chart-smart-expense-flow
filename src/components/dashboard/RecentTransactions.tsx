
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

const transactions: Transaction[] = [
  {
    id: '1',
    date: new Date(2023, 4, 1),
    description: 'Grocery Store',
    category: 'Food',
    amount: -125.30,
  },
  {
    id: '2',
    date: new Date(2023, 4, 2),
    description: 'Monthly Salary',
    category: 'Income',
    amount: 3000.00,
  },
  {
    id: '3',
    date: new Date(2023, 4, 3),
    description: 'Electric Bill',
    category: 'Utilities',
    amount: -85.75,
  },
  {
    id: '4',
    date: new Date(2023, 4, 4),
    description: 'Coffee Shop',
    category: 'Food',
    amount: -4.50,
  },
  {
    id: '5',
    date: new Date(2023, 4, 5),
    description: 'Movie Tickets',
    category: 'Entertainment',
    amount: -32.00,
  },
];

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
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4 text-sm">{format(transaction.date, 'MMM dd')}</td>
                  <td className="p-4 text-sm">{transaction.description}</td>
                  <td className="p-4 text-sm">{transaction.category}</td>
                  <td className={`p-4 text-sm text-right ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
