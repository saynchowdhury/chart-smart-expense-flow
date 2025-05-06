
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlySpendingProps {
  className?: string;
}

const data = [
  { month: 'Jan', amount: 2300 },
  { month: 'Feb', amount: 2100 },
  { month: 'Mar', amount: 2500 },
  { month: 'Apr', amount: 2800 },
  { month: 'May', amount: 2600 },
  { month: 'Jun', amount: 2900 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow rounded">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const MonthlySpending: React.FC<MonthlySpendingProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Monthly Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#33C3F0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlySpending;
