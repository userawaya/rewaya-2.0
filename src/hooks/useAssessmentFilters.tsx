
import { useState, useMemo } from 'react';

export interface AssessmentFilters {
  wasteType: string;
  weightRange: [number, number];
  dateRange: [Date | null, Date | null];
  searchTerm: string;
  sortBy: 'date' | 'weight' | 'type';
  sortOrder: 'asc' | 'desc';
}

export const useAssessmentFilters = (data: any[] = []) => {
  const [filters, setFilters] = useState<AssessmentFilters>({
    wasteType: 'all',
    weightRange: [0, 1000],
    dateRange: [null, null],
    searchTerm: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const filteredData = useMemo(() => {
    if (!data) return [];

    let filtered = data.filter(item => {
      // Waste type filter
      if (filters.wasteType !== 'all' && item.waste_type !== filters.wasteType) {
        return false;
      }

      // Weight range filter
      const weight = item.weight_kg || 0;
      if (weight < filters.weightRange[0] || weight > filters.weightRange[1]) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const searchableText = [
          item.waste_type,
          item.profiles?.full_name || '',
          item.id
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange[0] || filters.dateRange[1]) {
        const itemDate = new Date(item.created_at || item.updated_at);
        if (filters.dateRange[0] && itemDate < filters.dateRange[0]) return false;
        if (filters.dateRange[1] && itemDate > filters.dateRange[1]) return false;
      }

      return true;
    });

    // Sort filtered data
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'weight':
          aValue = a.weight_kg || 0;
          bValue = b.weight_kg || 0;
          break;
        case 'type':
          aValue = a.waste_type || '';
          bValue = b.waste_type || '';
          break;
        case 'date':
        default:
          aValue = new Date(a.created_at || a.updated_at).getTime();
          bValue = new Date(b.created_at || b.updated_at).getTime();
          break;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [data, filters]);

  const updateFilter = (key: keyof AssessmentFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      wasteType: 'all',
      weightRange: [0, 1000],
      dateRange: [null, null],
      searchTerm: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  return {
    filters,
    filteredData,
    updateFilter,
    resetFilters
  };
};
