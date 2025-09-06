
export const getDateRanges = () => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgoStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  
  return { todayStart, weekAgoStart, currentTime: now.toISOString() };
};

export const calculateQualityBreakdown = (qualityScores: number[]) => {
  return {
    high: qualityScores.filter(score => score >= 8).length,
    medium: qualityScores.filter(score => score >= 5 && score < 8).length,
    low: qualityScores.filter(score => score < 5).length,
  };
};

export const calculateStats = (todayData: any[], weeklyData: any[]) => {
  const todayAssessments = todayData?.length || 0;
  const todayWeight = todayData?.reduce((sum, record) => sum + (record.weight_kg || 0), 0) || 0;
  const weeklyAssessments = weeklyData?.length || 0;
  const weeklyWeight = weeklyData?.reduce((sum, record) => sum + (record.weight_kg || 0), 0) || 0;
  
  const qualityScores = todayData?.map(r => r.quality_score).filter(score => score !== null && score !== undefined) || [];
  const averageQuality = qualityScores.length > 0 
    ? qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length 
    : 0;

  const creditsIssued = todayData?.reduce((sum, record) => sum + (record.credits_earned || 0), 0) || 0;
  const qualityBreakdown = calculateQualityBreakdown(qualityScores);

  return {
    todayAssessments,
    todayWeight,
    weeklyAssessments,
    weeklyWeight,
    averageQuality,
    creditsIssued,
    qualityBreakdown
  };
};
