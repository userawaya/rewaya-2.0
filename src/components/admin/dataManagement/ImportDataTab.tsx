
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Import, FileText, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImportJob {
  id: string;
  type: string;
  status: 'completed' | 'in-progress' | 'failed';
  progress: number;
  recordsProcessed: number;
  date: string;
}

const ImportDataTab: React.FC = () => {
  const { toast } = useToast();
  const [importProgress, setImportProgress] = useState(0);

  const mockImportJobs: ImportJob[] = [
    { id: 'imp-1', type: 'User Data', status: 'completed', progress: 100, recordsProcessed: 1250, date: '2024-06-15' },
    { id: 'imp-2', type: 'Waste Records', status: 'in-progress', progress: 67, recordsProcessed: 3400, date: '2024-06-15' },
    { id: 'imp-3', type: 'Collection Centers', status: 'failed', progress: 45, recordsProcessed: 0, date: '2024-06-14' },
  ];

  const handleDataImport = (fileType: string) => {
    toast({
      title: "Import Started",
      description: `${fileType} import has been initiated.`,
    });
    // Simulate progress
    setImportProgress(0);
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Import Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataImport('User Data')}
              >
                <Import className="w-6 h-6" />
                <span>User Data</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataImport('Waste Records')}
              >
                <FileText className="w-6 h-6" />
                <span>Waste Records</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataImport('Collection Centers')}
              >
                <Database className="w-6 h-6" />
                <span>Centers</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataImport('Financial Data')}
              >
                <Upload className="w-6 h-6" />
                <span>Financial</span>
              </Button>
            </div>

            {importProgress > 0 && importProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Import Progress</span>
                  <span className="text-sm text-gray-500">{importProgress}%</span>
                </div>
                <Progress value={importProgress} className="w-full" />
              </div>
            )}

            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Drag & drop files here or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports CSV, JSON, XML formats
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockImportJobs.map((job) => (
              <div key={job.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{job.type}</h4>
                  <Badge variant={
                    job.status === 'completed' ? 'default' :
                    job.status === 'in-progress' ? 'secondary' : 'destructive'
                  }>
                    {job.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Records: {job.recordsProcessed.toLocaleString()}</p>
                  <p>Date: {job.date}</p>
                </div>
                {job.status === 'in-progress' && (
                  <Progress value={job.progress} className="mt-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportDataTab;
