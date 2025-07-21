
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BackupRecord {
  id: string;
  type: string;
  status: 'Success' | 'Failed';
  size?: string;
  error?: string;
  date: string;
}

const BackupRestoreTab: React.FC = () => {
  const { toast } = useToast();

  const mockBackups: BackupRecord[] = [
    { id: 'bak-1', type: 'Full Backup', status: 'Success', size: '125.4 MB', date: '2024-06-15 02:00 AM' },
    { id: 'bak-2', type: 'Incremental Backup', status: 'Success', size: '24.1 MB', date: '2024-06-14 02:00 AM' },
    { id: 'bak-3', type: 'Full Backup', status: 'Failed', error: 'Insufficient storage', date: '2024-06-13 02:00 AM' },
  ];

  const handleBackupRestore = (action: string) => {
    toast({
      title: action === 'backup' ? "Backup Started" : "Restore Started",
      description: `Database ${action} process has been initiated.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Backup & Restore</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Database Backup</h4>
              <p className="text-sm text-gray-600 mb-3">
                Create a full backup of all system data
              </p>
              <Button 
                onClick={() => handleBackupRestore('backup')}
                className="w-full"
              >
                <Shield className="w-4 h-4 mr-2" />
                Create Backup
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Restore Database</h4>
              <p className="text-sm text-gray-600 mb-3">
                Restore from a previous backup
              </p>
              <Button 
                variant="outline" 
                onClick={() => handleBackupRestore('restore')}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Restore from Backup
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Automated Backups</h4>
              <p className="text-sm text-gray-600 mb-3">
                Configure automatic backup schedule
              </p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Backups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBackups.map((backup) => (
              <div key={backup.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{backup.type}</h4>
                  <Badge variant={backup.status === 'Success' ? 'default' : 'destructive'}>
                    {backup.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {backup.size && <p>Size: {backup.size}</p>}
                  {backup.error && <p>Error: {backup.error}</p>}
                  <p>Date: {backup.date}</p>
                </div>
                <Button size="sm" variant="outline" className="mt-2">
                  {backup.status === 'Success' ? 'Restore' : 'Retry'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupRestoreTab;
