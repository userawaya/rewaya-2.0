
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserImportExport: React.FC = () => {
  const { toast } = useToast();
  const [importProgress, setImportProgress] = useState(0);
  const [exportFormat, setExportFormat] = useState('csv');
  const [importFile, setImportFile] = useState<File | null>(null);

  const mockImportHistory = [
    { id: '1', filename: 'new_users_batch_1.csv', status: 'completed', recordsProcessed: 150, errors: 2, date: '2024-06-15' },
    { id: '2', filename: 'driver_updates.xlsx', status: 'in-progress', recordsProcessed: 45, errors: 0, date: '2024-06-15' },
    { id: '3', filename: 'user_roles_update.csv', status: 'failed', recordsProcessed: 0, errors: 12, date: '2024-06-14' },
  ];

  const mockExportJobs = [
    { id: '1', type: 'All Users', status: 'ready', recordCount: 283, size: '1.2 MB', date: '2024-06-15' },
    { id: '2', type: 'Active Generators', status: 'generating', progress: 75, date: '2024-06-15' },
    { id: '3', type: 'Driver Performance', status: 'completed', recordCount: 15, size: '245 KB', date: '2024-06-14' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleImport = () => {
    if (!importFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to import.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Import Started",
      description: `Processing ${importFile.name}...`,
    });

    // Simulate import progress
    setImportProgress(0);
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Import Completed",
            description: "User data has been imported successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleExport = (exportType: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${exportType} export in ${exportFormat.toUpperCase()} format.`,
    });
  };

  const downloadTemplate = (templateType: string) => {
    toast({
      title: "Template Downloaded",
      description: `${templateType} template has been downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Import & Export</h2>
          <p className="text-gray-600">Bulk user data operations and templates</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => downloadTemplate('User Import')}>
            <FileText className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          <Button onClick={() => handleExport('All Users')}>
            <Download className="w-4 h-4 mr-2" />
            Quick Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="import" className="space-y-4">
        <TabsList>
          <TabsTrigger value="import">Import Users</TabsTrigger>
          <TabsTrigger value="export">Export Users</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Import User Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Upload User Data File</p>
                  <p className="text-sm text-gray-600">
                    Supports CSV, Excel (.xlsx), and JSON formats
                  </p>
                  <Input
                    type="file"
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileUpload}
                    className="max-w-sm mx-auto"
                  />
                </div>
              </div>

              {importFile && (
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">Selected File:</p>
                      <p className="text-sm text-gray-600">{importFile.name}</p>
                    </div>
                    <Button onClick={handleImport}>
                      Start Import
                    </Button>
                  </div>
                </div>
              )}

              {importProgress > 0 && importProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Import Progress</span>
                    <span className="text-sm text-gray-500">{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="w-full" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-3 border rounded-lg text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Validation</p>
                  <p className="text-xs text-gray-600">Data format check</p>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Duplicate Check</p>
                  <p className="text-xs text-gray-600">Prevent duplicates</p>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Batch Processing</p>
                  <p className="text-xs text-gray-600">Efficient imports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Export User Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Export Format</label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">User Role Filter</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Administrators</SelectItem>
                      <SelectItem value="controller">Controllers</SelectItem>
                      <SelectItem value="driver">Drivers</SelectItem>
                      <SelectItem value="recycler">Recyclers</SelectItem>
                      <SelectItem value="generator">Generators</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleExport('All Users')}
                  className="h-16 flex-col space-y-1"
                >
                  <Download className="w-6 h-6" />
                  <span>All Users</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleExport('Active Users')}
                  className="h-16 flex-col space-y-1"
                >
                  <Download className="w-6 h-6" />
                  <span>Active Users Only</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleExport('User Profiles')}
                  className="h-16 flex-col space-y-1"
                >
                  <Download className="w-6 h-6" />
                  <span>Profile Data</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleExport('User Activity')}
                  className="h-16 flex-col space-y-1"
                >
                  <Download className="w-6 h-6" />
                  <span>Activity Logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockExportJobs.map((job) => (
                  <div key={job.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{job.type}</h4>
                      <Badge variant={
                        job.status === 'ready' ? 'default' :
                        job.status === 'generating' ? 'secondary' : 'outline'
                      }>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {job.recordCount && <p>Records: {job.recordCount}</p>}
                      {job.size && <p>Size: {job.size}</p>}
                      <p>Date: {job.date}</p>
                    </div>
                    {job.status === 'generating' && job.progress && (
                      <Progress value={job.progress} className="mt-2" />
                    )}
                    {job.status === 'ready' && (
                      <Button size="sm" className="mt-2">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Import Template</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Standard template for importing new users
                </p>
                <Button onClick={() => downloadTemplate('User Import')} className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Template for bulk role assignments
                </p>
                <Button onClick={() => downloadTemplate('Role Assignment')} className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Template for updating user profiles
                </p>
                <Button onClick={() => downloadTemplate('Profile Updates')} className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Import History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockImportHistory.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.filename}</h4>
                      <Badge variant={
                        item.status === 'completed' ? 'default' :
                        item.status === 'in-progress' ? 'secondary' : 'destructive'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Processed:</span> {item.recordsProcessed}
                      </div>
                      <div>
                        <span className="font-medium">Errors:</span> {item.errors}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserImportExport;
