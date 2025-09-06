
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Users, MapPin, BarChart, Shield, Loader2 } from 'lucide-react';
import { useFieldMarshals } from '@/hooks/useFieldMarshals';
import FieldMarshalRegistrationDialog from '../FieldMarshalRegistrationDialog';

const FieldMarshalManagementTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  
  const { data: fieldMarshals = [], isLoading, error } = useFieldMarshals();

  const handleAddFieldMarshal = () => {
    setRegistrationDialogOpen(true);
  };

  const filteredMarshals = fieldMarshals.filter(marshal => {
    const matchesSearch = marshal.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (marshal.nickname && marshal.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || marshal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading field marshals...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading field marshals: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Field Marshal Management</h2>
          <p className="text-gray-600">Manage field marshals and their assignments</p>
        </div>
        <Button onClick={handleAddFieldMarshal}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Field Marshal
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex space-x-4 mb-6">
            <Input
              placeholder="Search field marshals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredMarshals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  {fieldMarshals.length === 0 
                    ? "No field marshals registered yet. Add your first field marshal to get started."
                    : "No field marshals match your search criteria."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarshals.map((marshal) => (
                <Card key={marshal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <div>
                          <div>{marshal.full_name}</div>
                          {marshal.nickname && (
                            <div className="text-sm text-gray-500 font-normal">
                              "{marshal.nickname}"
                            </div>
                          )}
                        </div>
                      </span>
                      <Badge variant={marshal.status === 'active' ? 'default' : 'secondary'}>
                        {marshal.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {marshal.phone && (
                        <p className="text-sm"><strong>Phone:</strong> {marshal.phone}</p>
                      )}
                      <p className="text-sm">
                        <strong>Registered:</strong> {new Date(marshal.created_at).toLocaleDateString()}
                      </p>
                      {marshal.notes && (
                        <p className="text-sm"><strong>Notes:</strong> {marshal.notes}</p>
                      )}
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          View Area
                        </Button>
                        <Button size="sm" className="flex-1">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Area Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMarshals.map((marshal) => (
                  <div key={marshal.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{marshal.full_name}</h4>
                      <p className="text-sm text-gray-600">No area assigned yet</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Assign Area
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{filteredMarshals.length}</div>
                  <p className="text-sm text-gray-600">Total Field Marshals</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {filteredMarshals.filter(m => m.status === 'active').length}
                  </div>
                  <p className="text-sm text-gray-600">Active Marshals</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <p className="text-sm text-gray-600">Total Collections</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Training Programs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Waste Classification Training</h4>
                  <p className="text-sm text-gray-600 mb-3">Learn proper waste sorting and classification techniques</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Duration: 2 hours</span>
                    <Button size="sm">Assign</Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Safety Protocols</h4>
                  <p className="text-sm text-gray-600 mb-3">Essential safety measures for waste handling</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Duration: 1.5 hours</span>
                    <Button size="sm">Assign</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <FieldMarshalRegistrationDialog
        open={registrationDialogOpen}
        onOpenChange={setRegistrationDialogOpen}
      />
    </div>
  );
};

export default FieldMarshalManagementTab;
