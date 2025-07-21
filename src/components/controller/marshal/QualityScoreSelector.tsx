
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { qualityScores } from "./types";

interface QualityScoreSelectorProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const QualityScoreSelector: React.FC<QualityScoreSelectorProps> = ({
  value,
  onChange,
  required = false
}) => {
  return (
    <div className="space-y-2">
      <Label className="flex items-center space-x-2">
        <Star className="w-4 h-4 text-yellow-500" />
        <span>Quality Score (1-10)</span>
      </Label>
      <Select value={value} onValueChange={onChange} required={required}>
        <SelectTrigger>
          <SelectValue placeholder="Select quality score" />
        </SelectTrigger>
        <SelectContent>
          {qualityScores.map((score) => (
            <SelectItem key={score.value} value={score.value}>
              {score.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-4 gap-2 text-xs text-gray-600 mt-2">
        <div className="text-center">
          <span className="block font-medium text-red-600">Poor</span>
          <span>1-3</span>
        </div>
        <div className="text-center">
          <span className="block font-medium text-yellow-600">Average</span>
          <span>4-6</span>
        </div>
        <div className="text-center">
          <span className="block font-medium text-blue-600">Good</span>
          <span>7-8</span>
        </div>
        <div className="text-center">
          <span className="block font-medium text-green-600">Excellent</span>
          <span>9-10</span>
        </div>
      </div>
    </div>
  );
};
