
import { 
  Package, 
  MapPin, 
  Recycle, 
  Award, 
  Truck,
  Route,
  Wrench,
  ShoppingCart,
  TrendingUp
} from "lucide-react";
import { MenuItemType } from "./types";

export const operationsItems: MenuItemType[] = [
  { 
    id: "collection-scheduling", 
    label: "Collection Scheduling", 
    icon: Truck,
    description: "Schedule waste collections"
  },
  { 
    id: "driver-management", 
    label: "Driver Management", 
    icon: Route,
    description: "Manage drivers & vehicles"
  },
  { 
    id: "logistics", 
    label: "Logistics & Transport", 
    icon: Truck,
    description: "Fleet & route management"
  },
  { 
    id: "centers", 
    label: "Collection Centers", 
    icon: MapPin,
    description: "Manage centers"
  },
  { 
    id: "inventory", 
    label: "Inventory", 
    icon: Package,
    description: "Stock management"
  },
  { 
    id: "waste-flow", 
    label: "Waste Flow", 
    icon: Recycle,
    description: "Track waste movement"
  },
  { 
    id: "credits", 
    label: "Credits System", 
    icon: Award,
    description: "Manage credits"
  },
  { 
    id: "recycler-management", 
    label: "Recycler Operations", 
    icon: Recycle,
    description: "Recycler marketplace & operations"
  },
  { 
    id: "maintenance", 
    label: "Maintenance", 
    icon: Wrench,
    description: "Equipment & facility maintenance"
  },
  { 
    id: "supply-chain", 
    label: "Supply Chain", 
    icon: ShoppingCart,
    description: "Suppliers & procurement"
  },
  { 
    id: "operational-analytics", 
    label: "Operational Analytics", 
    icon: TrendingUp,
    description: "Performance metrics & KPIs"
  },
];
