
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface EnvironmentalImpactProps {
  assessedWeight: number;
  totalWeight: number;
}

const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({
  assessedWeight,
  totalWeight
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Environmental Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{assessedWeight.toFixed(1)} kg</div>
            <p className="text-gray-600">Plastic Recycled</p>
            {totalWeight > assessedWeight && (
              <p className="text-xs text-orange-600 mt-1">+{(totalWeight - assessedWeight).toFixed(1)}kg pending</p>
            )}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{(assessedWeight * 2.2).toFixed(1)} kg</div>
            <p className="text-gray-600">CO₂ Emissions Saved</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{Math.floor(assessedWeight / 0.5)}</div>
            <p className="text-gray-600">Bottles Equivalent</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalImpact;
