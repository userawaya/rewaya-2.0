
import { LucideIcon } from "lucide-react";

export interface MenuItemType {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
}
