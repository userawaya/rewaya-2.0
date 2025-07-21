
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Package, MapPin, CheckSquare, X, Search, Filter } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface BulkItem {
  id: string;
  name: string;
  type: string;
  status: string;
  lastActivity: string;
  selected?: boolean;
}

const BulkOperationsManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'waste' | 'centers'>('users');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockUsers: BulkItem[] = [
    { id: '1', name: 'John Doe', type: 'generator', status: 'active', lastActivity: '2024-01-15' },
    { id: '2', name: 'Jane Smith', type: 'controller', status: 'pending', lastActivity: '2024-01-14' },
    { id: '3', name: 'Mike Johnson', type: 'driver', status: 'suspended', lastActivity: '2024-01-10' },
  ];

  const mockWasteRecords: BulkItem[] = [
    { id: '1', name: 'WR-001', type: 'PET', status: 'pending', lastActivity: '2024-01-15' },
    { id: '2', name: 'WR-002', type: 'HDPE', status: 'assessed', lastActivity: '2024-01-14' },
    { id: '3', name: 'WR-003', type: 'PP', status: 'delivered', lastActivity: '2024-01-13' },
  ];

  const mockCenters: BulkItem[] = [
    { id: '1', name: 'Lagos Central', type: 'main', status: 'active', lastActivity: '2024-01-15' },
    { id: '2', name: 'Abuja North', type: 'satellite', status: 'maintenance', lastActivity: '2024-01-12' },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'users': return mockUsers;
      case 'waste': return mockWasteRecords;
      case 'centers': return mockCenters;
      default: return [];
    }
  };

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleBulkAction = () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to perform bulk action');
      return;
    }
    if (!bulkAction) {
      toast.error('Please select an action');
      return;
    }

    toast.success(`${bulkAction} applied to ${selectedItems.length} items`);
    setSelectedItems([]);
    setBulkAction('');
  };

  const getBulkActions = () => {
    switch (activeTab) {
      case 'users':
        return [
          { value: 'activate', label: 'Activate Users' },
          { value: 'suspend', label: 'Suspend Users' },
          { value: 'delete', label: 'Delete Users' },
          { value: 'approve', label: 'Approve Pending' },
        ];
      case 'waste':
        return [
          { value: 'approve', label: 'Approve Records' },
          { value: 'reject', label: 'Reject Records' },
          { value: 'reassess', label: 'Mark for Reassessment' },
          { value: 'archive', label: 'Archive Records' },
        ];
      case 'centers':
        return [
          { value: 'activate', label: 'Activate Centers' },
          { value: 'maintenance', label: 'Set to Maintenance' },
          { value: 'update_capacity', label: 'Update Capacity' },
        ];
      default:
        return [];
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'users': return <Users className="w-4 h-4" />;
      case 'waste': return <Package className="w-4 h-4" />;
      case 'centers': return <MapPin className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <CheckSquare className="w-6 h-6 mr-3 text-blue-600" />
          Bulk Operations Manager
        </h2>
      </div>

      <div className="flex space-x-2 mb-4">
        {['users', 'waste', 'centers'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab as any)}
            size="sm"
            className="flex items-center space-x-2"
          >
            {getTabIcon(tab)}
            <span className="capitalize">{tab}</span>
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="capitalize">{activeTab} Bulk Operations</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {selectedItems.length} selected
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                {getBulkActions().map((action) => (
                  <SelectItem key={action.value} value={action.value}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleBulkAction}
              disabled={selectedItems.length === 0 || !bulkAction}
            >
              Apply to {selectedItems.length} items
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name/ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.lastActivity).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No items found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkOperationsManager;
