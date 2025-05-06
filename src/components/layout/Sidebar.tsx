
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarHeader,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  ChartBar, 
  CreditCard, 
  Wallet, 
  CalendarDays 
} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <SidebarComponent>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <Wallet className="h-6 w-6 text-sidebar-primary" />
          <h1 className="font-bold text-xl text-sidebar-foreground">BudgetSmart</h1>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="flex items-center">
                    <ChartBar className="mr-3 h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/expenses" className="flex items-center">
                    <CreditCard className="mr-3 h-5 w-5" />
                    <span>Expenses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/budgets" className="flex items-center">
                    <Wallet className="mr-3 h-5 w-5" />
                    <span>Budgets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/calendar" className="flex items-center">
                    <CalendarDays className="mr-3 h-5 w-5" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
