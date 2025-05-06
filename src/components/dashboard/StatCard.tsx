
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  trend
}) => {
  return (
    <Card className={cn("h-full card-shadow", className)}>
      <CardContent className="flex items-start justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {trend && (
            <div className={`text-xs flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} 
              <span>{trend.value}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
