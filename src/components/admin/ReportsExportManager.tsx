
import React from 'react';
import { FileText } from 'lucide-react';
import ReportGenerationForm from './reports/ReportGenerationForm';
import RecentReportsList from './reports/RecentReportsList';
import { handleGenerateReport, handleDownloadReport } from './reports/reportUtils';
import { mockReports } from './reports/mockData';

const ReportsExportManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-blue-600" />
          Reports & Export Manager
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportGenerationForm onGenerateReport={handleGenerateReport} />
        <RecentReportsList reports={mockReports} onDownload={handleDownloadReport} />
      </div>
    </div>
  );
};

export default ReportsExportManager;
