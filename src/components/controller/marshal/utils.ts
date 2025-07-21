
import { WasteType } from "./types";

export const calculateCredits = (wasteType: WasteType, weightKg: number, qualityScore: number): number => {
  const baseRates: Record<WasteType, number> = {
    'PET': 5,
    'HDPE': 4,
    'PP': 3,
    'LDPE': 2,
    'PVC': 2,
    'PS': 1,
    'OTHER': 1
  };
  
  const baseRate = baseRates[wasteType];
  const qualityMultiplier = 1.0 + (qualityScore - 1) / 9.0;
  
  return Math.round(baseRate * weightKg * qualityMultiplier);
};
