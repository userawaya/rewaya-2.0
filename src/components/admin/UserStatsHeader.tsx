
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface UserStatsHeaderProps {
  userCount: number;
  onAddUser?: () => void;
}

const UserStatsHeader: React.FC<UserStatsHeaderProps> = ({ userCount, onAddUser }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <p className="text-gray-600">Manage user accounts and permissions ({userCount} users)</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddUser}>
        <UserPlus className="w-4 h-4 mr-2" />
        Add New User
      </Button>
    </div>
  );
};

export default UserStatsHeader;
