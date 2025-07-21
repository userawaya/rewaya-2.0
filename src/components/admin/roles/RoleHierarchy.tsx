
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Edit, Trash2 } from 'lucide-react';
import { systemRoles } from './mockData';

interface RoleHierarchyProps {
  onDeleteRole: (roleName: string) => void;
}

const RoleHierarchy: React.FC<RoleHierarchyProps> = ({ onDeleteRole }) => {
  const getRoleLevelColor = (level: number) => {
    switch(level) {
      case 0: return 'bg-red-100 text-red-800 border-red-200';
      case 1: return 'bg-orange-100 text-orange-800 border-orange-200';
      case 2: return 'bg-blue-100 text-blue-800 border-blue-200';
      case 3: return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {[0, 1, 2, 3].map((level) => (
        <div key={level} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Level {level} {level === 0 ? '(Supreme)' : level === 1 ? '(Senior Admin)' : level === 2 ? '(Specialized Admin)' : '(Operational)'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemRoles.filter(role => role.level === level).map((role) => (
              <Card key={role.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>{role.name}</span>
                    </CardTitle>
                    <Badge className={getRoleLevelColor(role.level)}>
                      L{role.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Users:</span>
                      <Badge variant="secondary">{role.userCount}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Permissions:</span>
                      <Badge variant="outline">{role.permissions.length}</Badge>
                    </div>
                    {role.canManage.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Can manage:</span> {role.canManage.join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-1 mt-3">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    {!['super_admin', 'admin'].includes(role.id) && (
                      <Button size="sm" variant="ghost" onClick={() => onDeleteRole(role.name)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleHierarchy;
