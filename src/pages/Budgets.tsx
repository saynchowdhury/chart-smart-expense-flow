
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import ExportData from '@/components/ExportData';

interface BudgetCategory {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

const initialBudgets: BudgetCategory[] = [
  { id: '1', category: 'Housing', budgeted: 1500, spent: 1200, color: 'bg-budget-blue' },
  { id: '2', category: 'Food', budgeted: 500, spent: 580, color: 'bg-budget-green' },
  { id: '3', category: 'Transportation', budgeted: 400, spent: 320, color: 'bg-budget-purple' },
  { id: '4', category: 'Entertainment', budgeted: 200, spent: 250, color: 'bg-budget-orange' },
  { id: '5', category: 'Utilities', budgeted: 300, spent: 195, color: 'bg-budget-yellow' },
  { id: '6', category: 'Others', budgeted: 500, spent: 430, color: 'bg-budget-red' },
];

const Budgets = () => {
  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgets);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budgeted: '',
  });
  
  const totalBudgeted = budgets.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
  const budgetProgress = Math.min(Math.round((totalSpent / totalBudgeted) * 100), 100);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBudget(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be logic to save the budget
    const newBudgetItem: BudgetCategory = {
      id: Date.now().toString(),
      category: newBudget.category,
      budgeted: parseFloat(newBudget.budgeted),
      spent: 0,
      color: 'bg-budget-purple',
    };
    
    setBudgets(prev => [...prev, newBudgetItem]);
    
    // Reset form
    setNewBudget({
      category: '',
      budgeted: '',
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Budget Planning</h1>
        <ExportData />
      </div>
      
      <Card className="card-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Monthly Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Budget</span>
                <span className="text-sm text-muted-foreground">
                  ${totalSpent.toLocaleString()} / ${totalBudgeted.toLocaleString()}
                </span>
              </div>
              <Progress value={budgetProgress} className="h-3" />
              <div className="flex justify-between items-center mt-1 text-xs">
                <span className={totalSpent > totalBudgeted ? 'text-red-600' : 'text-green-600'}>
                  {totalSpent > totalBudgeted 
                    ? `Over by $${(totalSpent - totalBudgeted).toLocaleString()}`
                    : `Remaining: $${(totalBudgeted - totalSpent).toLocaleString()}`
                  }
                </span>
                <span>{budgetProgress}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Add Budget Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-category">Category Name</Label>
                <Input 
                  id="new-category" 
                  name="category" 
                  value={newBudget.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budgeted">Monthly Budget ($)</Label>
                <Input 
                  id="budgeted" 
                  name="budgeted" 
                  type="number" 
                  step="0.01" 
                  min="0.01"
                  value={newBudget.budgeted}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Add Budget Category</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Budget Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgets.map((budget) => {
                const percentage = Math.min(Math.round((budget.spent / budget.budgeted) * 100), 100);
                const remaining = budget.budgeted - budget.spent;
                const isOverBudget = budget.spent > budget.budgeted;
                
                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{budget.category}</span>
                      <span className="text-sm text-muted-foreground">
                        ${budget.spent.toLocaleString()} / ${budget.budgeted.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between items-center text-xs">
                      <span className={isOverBudget ? 'text-red-600' : 'text-green-600'}>
                        {isOverBudget ? 'Over by' : 'Remaining'}: ${Math.abs(remaining).toLocaleString()}
                      </span>
                      <span>{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budgets;
