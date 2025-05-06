
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { format } from "date-fns";

const Header: React.FC = () => {
  const currentDate = format(new Date(), "MMMM d, yyyy");
  
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-medium">Dashboard</h1>
        <p className="text-sm text-muted-foreground">{currentDate}</p>
      </div>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <FileDown className="h-4 w-4" />
        <span>Export Data</span>
      </Button>
    </header>
  );
};

export default Header;
