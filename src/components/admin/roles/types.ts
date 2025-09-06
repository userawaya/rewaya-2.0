
export interface SystemRole {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  level: number;
  canManage: string[];
}

export interface Permission {
  id: string;
  name: string;
  category: string;
}
