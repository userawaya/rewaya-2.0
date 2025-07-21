
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertCircle, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkOperation {
  id: string;
  type: 'export' | 'import' | 'update' | 'delete' | 'email';
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  total_items: number;
  processed_items: number;
  successful_items: number;
  failed_items: number;
  started_at: string;
  completed_at?: string;
  estimated_completion?: string;
  error_message?: string;
  result_file_url?: string;
  created_by: string;
}

const BulkOperationsFeedback: React.FC = () => {
  const { toast } = useToast();
  const [operations, setOperations] = useState<BulkOperation[]>([
    {
      id: '1',
      type: 'export',
      name: 'User Data Export',
      status: 'running',
      progress: 65,
      total_items: 1500,
      processed_items: 975,
      successful_items: 970,
      failed_items: 5,
      started_at: '2024-06-15 14:30:00',
      estimated_completion: '2024-06-15 14:45:00',
      created_by: 'admin@company.com'
    },
    {
      id: '2',
      type: 'update',
      name: 'Bulk Role Assignment',
      status: 'completed',
      progress: 100,
      total_items: 250,
      processed_items: 250,
      successful_items: 248,
      failed_items: 2,
      started_at: '2024-06-15 14:00:00',
      completed_at: '2024-06-15 14:15:00',
      result_file_url: '/downloads/bulk-update-results.csv',
      created_by: 'admin@company.com'
    },
    {
      id: '3',
      type: 'email',
      name: 'Notification Blast',
      status: 'failed',
      progress: 35,
      total_items: 500,
      processed_items: 175,
      successful_items: 0,
      failed_items: 175,
      started_at: '2024-06-15 13:30:00',
      completed_at: '2024-06-15 13:45:00',
      error_message: 'SMTP server connection failed',
      created_by: 'marketing@company.com'
    },
    {
      id: '4',
      type: 'import',
      name: 'CSV User Import',
      status: 'pending',
      progress: 0,
      total_items: 800,
      processed_items: 0,
      successful_items: 0,
      failed_items: 0,
      started_at: '2024-06-15 14:35:00',
      created_by: 'hr@company.com'
    }
  ]);

  // Simulate progress updates for running operations
  useEffect(() => {
    const interval = setInterval(() => {
      setOperations(prev => prev.map(op => {
        if (op.status === 'running' && op.progress < 100) {
          const newProgress = Math.min(op.progress + Math.random() * 10, 100);
          const newProcessed = Math.floor((newProgress / 100) * op.total_items);
          const newSuccessful = Math.floor(newProcessed * 0.95); // 95% success rate
          const newFailed = newProcessed - newSuccessful;
          
          return {
            ...op,
            progress: newProgress,
            processed_items: newProcessed,
            successful_items: newSuccessful,
            failed_items: newFailed,
            status: newProgress >= 100 ? 'completed' : 'running',
            completed_at: newProgress >= 100 ? new Date().toISOString().slice(0, 19).replace('T', ' ') : undefined
          };
        }
        return op;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'failed': return XCircle;
      case 'running': return RefreshCw;
      case 'pending': return Clock;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'running': return 'text-blue-600';
      case 'pending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      case 'running': return 'secondary';
      default: return 'outline';
    }
  };

  const getOperationTypeColor = (type: string) => {
    switch (type) {
      case 'export': return 'bg-blue-100 text-blue-800';
      case 'import': return 'bg-green-100 text-green-800';
      case 'update': return 'bg-orange-100 text-orange-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'email': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelOperation = (operationId: string) => {
    setOperations(prev => prev.map(op => 
      op.id === operationId ? { ...op, status: 'cancelled' } : op
    ));
    toast({
      title: "Operation Cancelled",
      description: "The bulk operation has been cancelled.",
      variant: "destructive",
    });
  };

  const handleDownloadResults = (operation: BulkOperation) => {
    toast({
      title: "Download Started",
      description: `Downloading results for ${operation.name}`,
    });
  };

  const handleRetryOperation = (operationId: string) => {
    setOperations(prev => prev.map(op => 
      op.id === operationId ? { 
        ...op, 
        status: 'pending',
        progress: 0,
        processed_items: 0,
        successful_items: 0,
        failed_items: 0,
        error_message: undefined,
        started_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      } : op
    ));
    toast({
      title: "Operation Restarted",
      description: "The bulk operation has been queued for retry.",
    });
  };

  const runningOps = operations.filter(op => op.status === 'running').length;
  const pendingOps = operations.filter(op => op.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bulk Operations</h2>
          <p className="text-gray-600">Monitor and manage bulk operations progress</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary">{runningOps} Running</Badge>
          <Badge variant="outline">{pendingOps} Pending</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {operations.map((operation) => {
          const StatusIcon = getStatusIcon(operation.status);
          const isRunning = operation.status === 'running';
          
          return (
            <Card key={operation.id} className={`${isRunning ? 'border-blue-200 bg-blue-50' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StatusIcon 
                      className={`w-5 h-5 ${getStatusColor(operation.status)} ${isRunning ? 'animate-spin' : ''}`} 
                    />
                    <div>
                      <CardTitle className="text-lg">{operation.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getOperationTypeColor(operation.type)}>
                          {operation.type.toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(operation.status)}>
                          {operation.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>Created by: {operation.created_by}</p>
                    <p>Started: {operation.started_at}</p>
                    {operation.completed_at && (
                      <p>Completed: {operation.completed_at}</p>
                    )}
                    {operation.estimated_completion && operation.status === 'running' && (
                      <p>ETA: {operation.estimated_completion}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{operation.progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={operation.progress} className="h-2" />
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{operation.total_items}</div>
                      <div className="text-xs text-gray-500">Total Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{operation.processed_items}</div>
                      <div className="text-xs text-gray-500">Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{operation.successful_items}</div>
                      <div className="text-xs text-gray-500">Successful</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">{operation.failed_items}</div>
                      <div className="text-xs text-gray-500">Failed</div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {operation.error_message && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Error:</span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">{operation.error_message}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex space-x-2">
                      {operation.status === 'running' && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleCancelOperation(operation.id)}
                        >
                          Cancel
                        </Button>
                      )}
                      {operation.status === 'failed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRetryOperation(operation.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retry
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {(operation.status === 'completed' || operation.status === 'failed') && operation.result_file_url && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadResults(operation)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Results
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BulkOperationsFeedback;
