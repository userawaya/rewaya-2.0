
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { systemRoles, availablePermissions } from './mockData';

const PermissionsMatrix: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission</TableHead>
              <TableHead>Category</TableHead>
              {systemRoles.slice(0, 5).map((role) => (
                <TableHead key={role.id}>{role.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {availablePermissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{permission.category}</Badge>
                </TableCell>
                {systemRoles.slice(0, 5).map((role) => (
                  <TableCell key={role.id}>
                    <Checkbox 
                      checked={role.permissions.includes(permission.id) || role.permissions.includes('all')}
                      disabled={role.permissions.includes('all')}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PermissionsMatrix;
