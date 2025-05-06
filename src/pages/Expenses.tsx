import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ExportData from '@/components/ExportData';
import { FileDown } from "lucide-react";

const Expenses = () => {
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be logic to save the expense
    console.log('Saving expense:', newExpense);
    
    // Reset form
    setNewExpense({
      description: '',
      amount: '',
      category: '',
      date: ''
    });
    
    // Show success notification
    alert('Expense added successfully!');
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Expense Tracking</h1>
        <ExportData />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Add New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  name="description" 
                  value={newExpense.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input 
                  id="amount" 
                  name="amount" 
                  type="number" 
                  step="0.01" 
                  min="0.01"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  name="category" 
                  className="w-full p-2 border rounded"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Housing">Housing</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={newExpense.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Add Expense</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2">
          <RecentTransactions className="h-full" />
        </div>
      </div>
      
      <Card className="card-shadow">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All Expenses</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Filter and view all your expense records
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input type="text" placeholder="Search expenses..." />
            <select className="p-2 border rounded">
              <option value="">All Categories</option>
              <option value="Housing">Housing</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>
            <Input type="month" />
          </div>
          
          <div className="border rounded">
            <p className="text-center py-16 text-muted-foreground">
              Apply filters to view your expense history
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
