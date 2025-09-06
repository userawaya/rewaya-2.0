
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { AssessmentFilters } from '@/hooks/useAssessmentFilters';

interface AssessmentFiltersProps {
  filters: AssessmentFilters;
  onFilterChange: (key: keyof AssessmentFilters, value: any) => void;
  onReset: () => void;
}

const AssessmentFiltersComponent: React.FC<AssessmentFiltersProps> = ({
  filters,
  onFilterChange,
  onReset
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search submissions..."
                value={filters.searchTerm}
                onChange={(e) => onFilterChange('searchTerm', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Waste Type</label>
            <Select
              value={filters.wasteType}
              onValueChange={(value) => onFilterChange('wasteType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PET">PET Bottles</SelectItem>
                <SelectItem value="HDPE">HDPE Containers</SelectItem>
                <SelectItem value="PVC">PVC Packaging</SelectItem>
                <SelectItem value="LDPE">LDPE Bags</SelectItem>
                <SelectItem value="PP">PP Containers</SelectItem>
                <SelectItem value="PS">PS Foam</SelectItem>
                <SelectItem value="OTHER">Mixed Plastics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => onFilterChange('sortBy', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Order</label>
            <Select
              value={filters.sortOrder}
              onValueChange={(value) => onFilterChange('sortOrder', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">
            Weight Range: {filters.weightRange[0]}kg - {filters.weightRange[1]}kg
          </label>
          <Slider
            value={filters.weightRange}
            onValueChange={(value) => onFilterChange('weightRange', value)}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentFiltersComponent;
