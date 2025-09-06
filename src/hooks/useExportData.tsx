
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToastNotifications } from './useToastNotifications';

export const useExportData = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { showSuccess, showError } = useToastNotifications();

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      showError('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle nested objects and escape commas
          if (typeof value === 'object' && value !== null) {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${String(value || '').replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    showSuccess(`Data exported to ${filename}.csv`);
  };

  const exportAssessments = async (dateRange?: [Date, Date]) => {
    setIsExporting(true);
    
    try {
      let query = supabase
        .from('waste_records')
        .select(`
          id,
          waste_type,
          weight_kg,
          quality_score,
          credits_earned,
          status,
          created_at,
          updated_at,
          profiles!waste_records_generator_id_fkey(full_name, phone)
        `)
        .not('quality_score', 'is', null);

      if (dateRange) {
        query = query
          .gte('updated_at', dateRange[0].toISOString())
          .lte('updated_at', dateRange[1].toISOString());
      }

      const { data, error } = await query.order('updated_at', { ascending: false });

      if (error) throw error;

      const exportData = data?.map(record => ({
        ID: record.id,
        'Waste Type': record.waste_type,
        'Weight (kg)': record.weight_kg,
        'Quality Score': record.quality_score,
        'Credits Earned': record.credits_earned,
        Status: record.status,
        'Generator Name': record.profiles?.full_name || 'Unknown',
        'Generator Phone': record.profiles?.phone || 'N/A',
        'Created Date': new Date(record.created_at).toLocaleDateString(),
        'Assessed Date': new Date(record.updated_at).toLocaleDateString()
      })) || [];

      exportToCSV(exportData, 'waste_assessments');
    } catch (error) {
      console.error('Export error:', error);
      showError('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const exportMarshalDeliveries = async (dateRange?: [Date, Date]) => {
    setIsExporting(true);
    
    try {
      let query = supabase
        .from('marshal_waste_deliveries')
        .select(`
          id,
          waste_type,
          weight_kg,
          quality_score,
          credits_earned,
          paid_amount,
          payment_method,
          created_at,
          field_marshals!marshal_waste_deliveries_marshal_id_fkey(full_name, phone)
        `);

      if (dateRange) {
        query = query
          .gte('created_at', dateRange[0].toISOString())
          .lte('created_at', dateRange[1].toISOString());
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const exportData = data?.map(record => ({
        ID: record.id,
        'Waste Type': record.waste_type,
        'Weight (kg)': record.weight_kg,
        'Quality Score': record.quality_score || 'Not Assessed',
        'Credits Earned': record.credits_earned || 0,
        'Paid Amount': record.paid_amount || 0,
        'Payment Method': record.payment_method || 'N/A',
        'Marshal Name': record.field_marshals?.full_name || 'Unknown',
        'Marshal Phone': record.field_marshals?.phone || 'N/A',
        'Delivery Date': new Date(record.created_at).toLocaleDateString()
      })) || [];

      exportToCSV(exportData, 'marshal_deliveries');
    } catch (error) {
      console.error('Export error:', error);
      showError('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportAssessments,
    exportMarshalDeliveries,
    isExporting
  };
};
