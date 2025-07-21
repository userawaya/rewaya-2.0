
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileText, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ReportType, ExportFormat } from './types';

interface ReportGenerationFormProps {
  onGenerateReport: () => void;
}

const ReportGenerationForm: React.FC<ReportGenerationFormProps> = ({ onGenerateReport }) => {
  const [reportType, setReportType] = useState<ReportType>('users');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [includeImages, setIncludeImages] = useState(false);
  const [includeDetails, setIncludeDetails] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Report Type</label>
          <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Users Report</SelectItem>
              <SelectItem value="waste">Waste Records Report</SelectItem>
              <SelectItem value="centers">Collection Centers Report</SelectItem>
              <SelectItem value="credits">Credits & Transactions Report</SelectItem>
              <SelectItem value="analytics">Analytics Summary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Export Format</label>
          <Select value={exportFormat} onValueChange={(value) => setExportFormat(value as ExportFormat)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">From Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">To Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeDetails" 
              checked={includeDetails}
              onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
            />
            <label htmlFor="includeDetails" className="text-sm">Include detailed information</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeImages" 
              checked={includeImages}
              onCheckedChange={(checked) => setIncludeImages(checked as boolean)}
            />
            <label htmlFor="includeImages" className="text-sm">Include images (PDF only)</label>
          </div>
        </div>

        <Button onClick={onGenerateReport} className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportGenerationForm;
