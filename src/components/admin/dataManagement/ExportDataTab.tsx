
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, ExternalLink, FileText, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportJob {
  id: string;
  type: string;
  status: 'ready' | 'generating' | 'completed';
  size?: string;
  progress?: number;
  date: string;
}

const ExportDataTab: React.FC = () => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState('csv');

  const mockExportJobs: ExportJob[] = [
    { id: 'exp-1', type: 'Monthly Report', status: 'ready', size: '2.4 MB', date: '2024-06-15' },
    { id: 'exp-2', type: 'User Analytics', status: 'generating', progress: 80, date: '2024-06-15' },
    { id: 'exp-3', type: 'Financial Data', status: 'completed', size: '5.1 MB', date: '2024-06-14' },
  ];

  const handleDataExport = (dataType: string, format: string) => {
    toast({
      title: "Export Started",
      description: `${dataType} export in ${format.toUpperCase()} format has been initiated.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataExport('User Data', exportFormat)}
              >
                <ExternalLink className="w-6 h-6" />
                <span>User Data</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataExport('Waste Records', exportFormat)}
              >
                <FileText className="w-6 h-6" />
                <span>Waste Records</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataExport('Analytics', exportFormat)}
              >
                <Database className="w-6 h-6" />
                <span>Analytics</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleDataExport('Financial', exportFormat)}
              >
                <Download className="w-6 h-6" />
                <span>Financial</span>
              </Button>
            </div>
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
    </div>
  );
};

export default ExportDataTab;
