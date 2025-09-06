import React from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { MenuItemType } from '../config/types';

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  items,
  currentTab,
  onTabChange,
}) => {
  const handleMenuItemClick = (itemId: string) => {
    console.log(`Navigating to admin tab: ${itemId}`);
    onTabChange(itemId);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => handleMenuItemClick(item.id)}
                  isActive={isActive}
                  className={`
                    relative cursor-pointer transition-all duration-200 hover:bg-gray-100 
                    ${isActive ? 'bg-green-50 text-green-700 border-r-2 border-green-600' : 'text-gray-700 hover:text-gray-900'}
                    group
                  `}
                  tooltip={item.description}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="ml-auto text-xs px-1.5 py-0.5 bg-red-500 text-white"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MenuSection;
