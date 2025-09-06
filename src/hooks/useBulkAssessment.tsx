
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToastNotifications } from './useToastNotifications';

export const useBulkAssessment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSuccess, showError } = useToastNotifications();

  const bulkAssess = async (
    recordIds: string[],
    qualityScore: number,
    notes?: string
  ) => {
    setIsProcessing(true);
    
    try {
      const { error } = await supabase
        .from('waste_records')
        .update({
          quality_score: qualityScore,
          status: 'sorted',
          notes
        })
        .in('id', recordIds);

      if (error) throw error;

      showSuccess(`Successfully assessed ${recordIds.length} records`);
      return true;
    } catch (error) {
      console.error('Bulk assessment error:', error);
      showError('Failed to process bulk assessment');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const bulkApprove = async (recordIds: string[]) => {
    return bulkAssess(recordIds, 8, 'Bulk approved - good quality');
  };

  const bulkReject = async (recordIds: string[]) => {
    return bulkAssess(recordIds, 3, 'Bulk rejected - poor quality');
  };

  return {
    bulkAssess,
    bulkApprove,
    bulkReject,
    isProcessing
  };
};
