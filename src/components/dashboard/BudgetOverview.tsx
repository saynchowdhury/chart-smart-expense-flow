
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCategoryProps {
  category: string;
  spent: number;
  budget: number;
  color: string;
}

const BudgetCategory: React.FC<BudgetCategoryProps> = ({ category, spent, budget, color }) => {
  const percentage = Math.min(Math.round((spent / budget) * 100), 100);
  const remaining = budget - spent;
  const isOverBudget = spent > budget;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">{category}</span>
        <span className="text-sm text-muted-foreground">
          ${spent.toLocaleString()} / ${budget.toLocaleString()}
        </span>
      </div>
      <Progress value={percentage} className="h-2" indicatorColor={color} />
      <div className="flex justify-between items-center text-xs">
        <span className={isOverBudget ? 'text-red-600' : 'text-green-600'}>
          {isOverBudget ? 'Over by' : 'Remaining'}: ${Math.abs(remaining).toLocaleString()}
        </span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

const BudgetOverview: React.FC = () => {
  const budgetCategories = [
    { category: 'Housing', spent: 1200, budget: 1500, color: 'bg-budget-blue' },
    { category: 'Food', spent: 580, budget: 500, color: 'bg-budget-green' },
    { category: 'Transportation', spent: 320, budget: 400, color: 'bg-budget-purple' },
    { category: 'Entertainment', spent: 250, budget: 200, color: 'bg-budget-orange' },
  ];
  
  return (
    <Card className="card-shadow h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgetCategories.map((item) => (
            <BudgetCategory key={item.category} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
