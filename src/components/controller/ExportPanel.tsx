
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, Calendar as CalendarIcon } from 'lucide-react';
import { useExportData } from '@/hooks/useExportData';
import { format } from 'date-fns';

const ExportPanel: React.FC = () => {
  const { exportAssessments, exportMarshalDeliveries, isExporting } = useExportData();
  const [exportType, setExportType] = useState('assessments');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleExport = () => {
    const validDateRange = dateRange[0] && dateRange[1] ? [dateRange[0], dateRange[1]] as [Date, Date] : undefined;
    
    if (exportType === 'assessments') {
      exportAssessments(validDateRange);
    } else {
      exportMarshalDeliveries(validDateRange);
    }
  };

  const formatDateRange = () => {
    if (!dateRange[0] || !dateRange[1]) return 'Select date range';
    return `${format(dateRange[0], 'MMM dd')} - ${format(dateRange[1], 'MMM dd')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Type</label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assessments">Waste Assessments</SelectItem>
                <SelectItem value="deliveries">Marshal Deliveries</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range (Optional)</label>
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange[0] || undefined,
                    to: dateRange[1] || undefined
                  }}
                  onSelect={(range) => {
                    setDateRange([range?.from || null, range?.to || null]);
                    if (range?.from && range?.to) {
                      setShowCalendar(false);
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button 
          onClick={handleExport} 
          disabled={isExporting}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export to CSV'}
        </Button>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Export includes all relevant data fields</p>
          <p>• Date range is optional (exports all data if not specified)</p>
          <p>• Files are downloaded in CSV format</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportPanel;
