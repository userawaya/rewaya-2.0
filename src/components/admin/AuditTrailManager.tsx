
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Download, Search, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuditLogEntry {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  resource: string;
  details: any;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const AuditTrailManager: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedEntry, setSelectedEntry] = useState<AuditLogEntry | null>(null);

  const mockAuditLogs: AuditLogEntry[] = [
    {
      id: '1',
      user_id: 'admin1',
      user_name: 'John Admin',
      action: 'User Role Changed',
      resource: 'user:jane.doe@example.com',
      details: { from: 'generator', to: 'controller', reason: 'Promotion' },
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0...',
      timestamp: '2024-06-15 14:30:22',
      severity: 'medium'
    },
    {
      id: '2',
      user_id: 'superadmin1',
      user_name: 'Super Admin',
      action: 'System Configuration Changed',
      resource: 'system:config',
      details: { setting: 'max_file_upload_size', from: '10MB', to: '25MB' },
      ip_address: '10.0.0.1',
      user_agent: 'Mozilla/5.0...',
      timestamp: '2024-06-15 14:25:15',
      severity: 'high'
    },
    {
      id: '3',
      user_id: 'admin2',
      user_name: 'Sarah Admin',
      action: 'User Account Suspended',
      resource: 'user:suspicious@example.com',
      details: { reason: 'Multiple failed login attempts', duration: '24h' },
      ip_address: '192.168.1.50',
      user_agent: 'Mozilla/5.0...',
      timestamp: '2024-06-15 14:20:08',
      severity: 'critical'
    },
    {
      id: '4',
      user_id: 'admin1',
      user_name: 'John Admin',
      action: 'Data Export',
      resource: 'export:user_data',
      details: { format: 'CSV', records: 1250, requestor: 'compliance@company.com' },
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0...',
      timestamp: '2024-06-15 14:15:33',
      severity: 'low'
    },
    {
      id: '5',
      user_id: 'sysadmin1',
      user_name: 'Tech Admin',
      action: 'Database Backup',
      resource: 'system:database',
      details: { type: 'full_backup', size: '2.3GB', status: 'completed' },
      ip_address: '192.168.1.200',
      user_agent: 'Automated System',
      timestamp: '2024-06-15 14:10:00',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action.includes(actionFilter);
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    return matchesSearch && matchesAction && matchesSeverity;
  });

  const exportAuditLog = () => {
    toast({
      title: "Export Started",
      description: "Audit log export has been initiated. You will receive a download link shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
          <p className="text-gray-600">Track all administrative actions and system changes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportAuditLog}>
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle>Audit Log Entries</CardTitle>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search actions, users, resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="User">User Actions</SelectItem>
                  <SelectItem value="System">System Changes</SelectItem>
                  <SelectItem value="Data">Data Operations</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user_name}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(log.severity)}>
                      {log.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.ip_address}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedEntry(log)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Audit Log Details</DialogTitle>
                        </DialogHeader>
                        {selectedEntry && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">User</label>
                                <p className="text-sm">{selectedEntry.user_name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Action</label>
                                <p className="text-sm">{selectedEntry.action}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Resource</label>
                                <p className="text-sm font-mono">{selectedEntry.resource}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Timestamp</label>
                                <p className="text-sm font-mono">{selectedEntry.timestamp}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">IP Address</label>
                                <p className="text-sm font-mono">{selectedEntry.ip_address}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Severity</label>
                                <Badge className={getSeverityColor(selectedEntry.severity)}>
                                  {selectedEntry.severity.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Details</label>
                              <pre className="text-xs bg-gray-50 p-3 rounded mt-1 overflow-auto">
                                {JSON.stringify(selectedEntry.details, null, 2)}
                              </pre>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">User Agent</label>
                              <p className="text-xs text-gray-500 break-all">{selectedEntry.user_agent}</p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrailManager;
