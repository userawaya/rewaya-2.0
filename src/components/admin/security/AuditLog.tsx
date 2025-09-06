
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye } from 'lucide-react';

const AuditLog: React.FC = () => {
  const mockSecurityEvents = [
    { id: '1', user: 'john.doe@example.com', event: 'Failed Login Attempt', ip: '192.168.1.100', time: '2024-06-15 14:30', severity: 'medium' },
    { id: '2', user: 'admin@example.com', event: 'Successful Login', ip: '10.0.0.1', time: '2024-06-15 14:25', severity: 'low' },
    { id: '3', user: 'suspicious@example.com', event: 'Multiple Failed Attempts', ip: '203.0.113.1', time: '2024-06-15 14:20', severity: 'high' },
    { id: '4', user: 'driver@example.com', event: 'Password Changed', ip: '192.168.1.50', time: '2024-06-15 14:15', severity: 'low' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>Security Audit Log</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSecurityEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.user}</TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>{event.ip}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>
                  <Badge variant={
                    event.severity === 'high' ? 'destructive' :
                    event.severity === 'medium' ? 'secondary' : 'default'
                  }>
                    {event.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AuditLog;
