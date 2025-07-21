
export type WasteType = "PET" | "HDPE" | "PVC" | "LDPE" | "PP" | "PS" | "OTHER";

export type FieldMarshal = {
  id: string;
  full_name: string;
  nickname?: string | null;
};

export type Center = { 
  id: string; 
  name: string; 
};

export const wasteTypes: WasteType[] = [
  "PET",
  "HDPE", 
  "PVC",
  "LDPE",
  "PP",
  "PS",
  "OTHER",
];

export const qualityScores = [
  { value: "1", label: "1 - Poor Quality", category: "poor" },
  { value: "2", label: "2 - Poor Quality", category: "poor" },
  { value: "3", label: "3 - Poor Quality", category: "poor" },
  { value: "4", label: "4 - Average Quality", category: "average" },
  { value: "5", label: "5 - Average Quality", category: "average" },
  { value: "6", label: "6 - Average Quality", category: "average" },
  { value: "7", label: "7 - Good Quality", category: "good" },
  { value: "8", label: "8 - Good Quality", category: "good" },
  { value: "9", label: "9 - Excellent Quality", category: "excellent" },
  { value: "10", label: "10 - Excellent Quality", category: "excellent" },
];
