
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HardDrive, Download, Upload, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BackupRecoveryTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedBackup, setSelectedBackup] = useState('');

  const mockBackups = [
    { id: 'backup-1', type: 'Full System', size: '2.3 GB', date: '2024-06-15 02:00', status: 'completed' },
    { id: 'backup-2', type: 'Database Only', size: '456 MB', date: '2024-06-14 02:00', status: 'completed' },
    { id: 'backup-3', type: 'User Data', size: '128 MB', date: '2024-06-13 02:00', status: 'failed' },
  ];

  const handleCreateBackup = (type: string) => {
    toast({
      title: "Backup Started",
      description: `${type} backup has been initiated.`,
    });
  };

  const handleRestore = () => {
    if (!selectedBackup) {
      toast({
        title: "No Backup Selected",
        description: "Please select a backup to restore from.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Restore Started",
      description: "System restore process has been initiated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Backup & Recovery</h2>
          <p className="text-gray-600">Manage system backups and data recovery</p>
        </div>
        <Button onClick={() => handleCreateBackup('Full System')}>
          <HardDrive className="w-4 h-4 mr-2" />
          Create Backup
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={() => handleCreateBackup('Full System')} className="justify-start">
                <HardDrive className="w-4 h-4 mr-2" />
                Full System Backup
              </Button>
              <Button onClick={() => handleCreateBackup('Database Only')} variant="outline" className="justify-start">
                <HardDrive className="w-4 h-4 mr-2" />
                Database Only
              </Button>
              <Button onClick={() => handleCreateBackup('User Data')} variant="outline" className="justify-start">
                <HardDrive className="w-4 h-4 mr-2" />
                User Data Only
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Schedule Automatic Backups</h4>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Backup frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily at 2:00 AM</SelectItem>
                    <SelectItem value="weekly">Weekly (Sundays)</SelectItem>
                    <SelectItem value="monthly">Monthly (1st of month)</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Configure Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Restore from Backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedBackup} onValueChange={setSelectedBackup}>
              <SelectTrigger>
                <SelectValue placeholder="Select backup to restore" />
              </SelectTrigger>
              <SelectContent>
                {mockBackups.filter(b => b.status === 'completed').map((backup) => (
                  <SelectItem key={backup.id} value={backup.id}>
                    {backup.type} - {backup.date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex space-x-2">
              <Button onClick={handleRestore} variant="destructive" className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Restore System
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="text-sm text-yellow-700">
                  Restoring will overwrite current data. Create a backup first.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBackups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{backup.type}</h4>
                  <p className="text-sm text-gray-600">
                    {backup.date} • {backup.size}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={backup.status === 'completed' ? 'default' : 'destructive'}>
                    {backup.status}
                  </Badge>
                  {backup.status === 'completed' && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        Restore
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupRecoveryTab;
