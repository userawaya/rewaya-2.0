
export interface Report {
  id: string;
  name: string;
  type: 'users' | 'waste' | 'centers' | 'credits' | 'analytics';
  format: 'csv' | 'pdf' | 'excel';
  status: 'generating' | 'ready' | 'failed';
  createdAt: string;
  size?: string;
}

export type ReportType = 'users' | 'waste' | 'centers' | 'credits' | 'analytics';
export type ExportFormat = 'csv' | 'pdf' | 'excel';
