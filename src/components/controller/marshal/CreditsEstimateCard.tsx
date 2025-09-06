
import React from "react";
import { Calculator } from "lucide-react";

interface CreditsEstimateCardProps {
  estimatedCredits: number;
}

export const CreditsEstimateCard: React.FC<CreditsEstimateCardProps> = ({
  estimatedCredits
}) => {
  if (estimatedCredits <= 0) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Calculator className="w-4 h-4 text-green-600" />
        <span className="font-medium text-green-800">Estimated Credits</span>
      </div>
      <p className="text-green-700">
        <span className="text-lg font-bold">{estimatedCredits}</span> credits
      </p>
      <p className="text-sm text-green-600">
        Expected payment amount: ₦{estimatedCredits.toFixed(2)}
      </p>
    </div>
  );
};
