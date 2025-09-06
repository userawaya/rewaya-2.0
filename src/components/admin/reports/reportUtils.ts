
import { toast } from 'sonner';

export const handleGenerateReport = () => {
  toast.success('Report generation started. You will be notified when ready.');
};

export const handleDownloadReport = (reportId: string) => {
  toast.success('Download started');
};
