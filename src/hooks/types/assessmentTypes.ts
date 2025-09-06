
export interface AssessmentStats {
  todayAssessments: number;
  todayWeight: number;
  weeklyAssessments: number;
  weeklyWeight: number;
  averageQuality: number;
  creditsIssued: number;
  qualityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface AssessmentHistory {
  id: string;
  waste_type: string;
  weight_kg: number;
  quality_score: number;
  credits_earned: number;
  generator_name: string;
  created_at: string;
  type: 'assessment' | 'marshal_delivery';
}
