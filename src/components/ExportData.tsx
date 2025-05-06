
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from 'date-fns';

interface ExportDataProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

const ExportData: React.FC<ExportDataProps> = ({ 
  className,
  variant = "default",
  size = "default",
  children,
}) => {
  const exportToExcel = () => {
    // In a real app, this would generate actual transaction data
    // For now we simulate the download
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const filename = `budget_export_${currentDate}.xlsx`;
    
    // Create a sample CSV content with INR currency
    const csvContent = `Date,Description,Category,Amount
2023-05-01,Grocery Store,Food,₹125.30
2023-05-02,Monthly Salary,Income,₹3000.00
2023-05-03,Electric Bill,Utilities,₹85.75
2023-05-04,Coffee Shop,Food,₹4.50
2023-05-05,Movie Tickets,Entertainment,₹32.00`;
    
    // Create a blob with the data
    const blob = new Blob([csvContent], { type: 'text/csv' });
    
    // Create a link element, set the properties and click it
    const link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <FileDown className="h-4 w-4 mr-2" />
          {children || "Export Data"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>
          <DialogDescription>
            Download your financial data in Excel/CSV format
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Choose what data you'd like to export:
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="export-transactions" 
                checked 
                readOnly 
                className="mr-2"
              />
              <label htmlFor="export-transactions" className="text-sm">Transactions</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="export-budgets" 
                checked 
                readOnly 
                className="mr-2"
              />
              <label htmlFor="export-budgets" className="text-sm">Budget Categories</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="export-summary" 
                checked 
                readOnly 
                className="mr-2"
              />
              <label htmlFor="export-summary" className="text-sm">Monthly Summary</label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={exportToExcel}>
            Download Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportData;
