
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Database, Shield } from 'lucide-react';
import ImportDataTab from '../dataManagement/ImportDataTab';
import ExportDataTab from '../dataManagement/ExportDataTab';
import BackupRestoreTab from '../dataManagement/BackupRestoreTab';
import ApiManagementTab from '../dataManagement/ApiManagementTab';

const DataManagementTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Management</h2>
        <p className="text-gray-600">Import, export, and manage system data</p>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="import">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Database className="w-4 h-4 mr-2" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="api">
            <Shield className="w-4 h-4 mr-2" />
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import">
          <ImportDataTab />
        </TabsContent>

        <TabsContent value="export">
          <ExportDataTab />
        </TabsContent>

        <TabsContent value="backup">
          <BackupRestoreTab />
        </TabsContent>

        <TabsContent value="api">
          <ApiManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataManagementTab;
