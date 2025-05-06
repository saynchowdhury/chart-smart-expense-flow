
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import ExportData from '@/components/ExportData';
import { format } from "date-fns";

// Sample transaction data
const transactionsByDate = {
  "2023-05-01": [
    { description: "Grocery Store", category: "Food", amount: -125.30 },
    { description: "Gas Station", category: "Transportation", amount: -45.80 }
  ],
  "2023-05-05": [
    { description: "Movie Tickets", category: "Entertainment", amount: -32.00 }
  ],
  "2023-05-10": [
    { description: "Monthly Salary", category: "Income", amount: 3000.00 }
  ],
  "2023-05-15": [
    { description: "Electric Bill", category: "Utilities", amount: -85.75 },
    { description: "Internet Bill", category: "Utilities", amount: -65.90 }
  ],
};

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDateTransactions, setSelectedDateTransactions] = useState<any[]>([]);
  
  const handleDateClick = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const transactions = transactionsByDate[formattedDate] || [];
      setSelectedDateTransactions(transactions);
    } else {
      setSelectedDateTransactions([]);
    }
  };
  
  // Function to determine which dates have transactions
  const isDayWithTransaction = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    return formattedDate in transactionsByDate;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Financial Calendar</h1>
        <ExportData />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateClick}
              className="rounded-md border"
              modifiers={{
                hasTransaction: (date) => isDayWithTransaction(date),
              }}
              modifiersStyles={{
                hasTransaction: { 
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "#33C3F0"
                }
              }}
            />
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Dates with transactions are highlighted
            </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {date ? `Transactions for ${format(date, "MMMM d, yyyy")}` : "Select a date to view transactions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateTransactions.length > 0 ? (
              <div className="space-y-4">
                {selectedDateTransactions.map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                    <p className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No transactions for this date</p>
                <Button className="mt-4" variant="outline">Add Transaction</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Upcoming Financial Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
              <div>
                <p className="font-medium">Rent Payment</p>
                <p className="text-xs text-muted-foreground">Due on 1st of every month</p>
              </div>
              <p className="font-medium text-red-600">-$1,200.00</p>
            </div>
            <div className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
              <div>
                <p className="font-medium">Salary Deposit</p>
                <p className="text-xs text-muted-foreground">Expected on 10th of every month</p>
              </div>
              <p className="font-medium text-green-600">+$3,000.00</p>
            </div>
            <div className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
              <div>
                <p className="font-medium">Credit Card Payment</p>
                <p className="text-xs text-muted-foreground">Due on 15th of every month</p>
              </div>
              <p className="font-medium text-red-600">-$450.00</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
