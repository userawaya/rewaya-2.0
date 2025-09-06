
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminTabList } from '../config/adminTabConfig';

interface AdminTabNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const AdminTabNavigation: React.FC<AdminTabNavigationProps> = ({
  currentTab,
  onTabChange,
}) => {
  return (
    <Tabs value={currentTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 lg:grid-cols-14 gap-1 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-2 h-auto">
        {adminTabList.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-white/70 hover:shadow-md group"
            >
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden sm:block leading-tight">{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default AdminTabNavigation;
