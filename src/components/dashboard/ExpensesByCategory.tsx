
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ExpenseByCategoryProps {
  className?: string;
}

const COLORS = ['#33C3F0', '#4CAF50', '#FF6B6B', '#FFC107', '#9C27B0', '#FF9800'];

const data = [
  { name: 'Housing', value: 1200 },
  { name: 'Food', value: 580 },
  { name: 'Transportation', value: 320 },
  { name: 'Entertainment', value: 250 },
  { name: 'Utilities', value: 195 },
  { name: 'Others', value: 430 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow rounded">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          ${payload[0].value.toLocaleString()} ({payload[0].payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const ExpensesByCategory: React.FC<ExpenseByCategoryProps> = ({ className }) => {
  // Calculate the total value to determine percentages
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  
  // Add percentage to data items
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: `${((item.value / totalValue) * 100).toFixed(1)}%`
  }));
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={({ percentage }) => `${percentage}`}
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensesByCategory;
