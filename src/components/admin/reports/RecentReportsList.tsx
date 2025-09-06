
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { Report } from './types';

interface RecentReportsListProps {
  reports: Report[];
  onDownload: (reportId: string) => void;
}

const RecentReportsList: React.FC<RecentReportsListProps> = ({ reports, onDownload }) => {
  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getReportTypeIcon(report.type)}
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(report.createdAt), 'MMM dd, yyyy HH:mm')}
                    {report.size && ` • ${report.size}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusBadgeColor(report.status)}>
                  {report.status}
                </Badge>
                {report.status === 'ready' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDownload(report.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReportsList;
