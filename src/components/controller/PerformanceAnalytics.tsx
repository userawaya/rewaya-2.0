
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Clock, Award, BarChart3 } from 'lucide-react';
import { usePerformanceAnalytics } from '@/hooks/usePerformanceAnalytics';

const PerformanceAnalytics: React.FC = () => {
  const { data: metrics, isLoading, error } = usePerformanceAnalytics();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !metrics) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Unable to load performance metrics</p>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <div className="w-4 h-4" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Performance Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm text-gray-600">{metrics.assessmentCompletionRate}%</span>
            </div>
            <Progress value={metrics.assessmentCompletionRate} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Productivity Score</span>
              <span className="text-sm text-gray-600">{metrics.productivityScore}/100</span>
            </div>
            <Progress value={metrics.productivityScore} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium">Avg. Assessment Time</p>
            <p className="text-lg font-bold text-blue-600">{metrics.averageAssessmentTime}m</p>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Award className="w-5 h-5 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-medium">Quality Focus</p>
            <p className="text-lg font-bold text-green-600">
              {metrics.qualityDistribution.high} High
            </p>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              {getTrendIcon(metrics.weeklyTrend)}
            </div>
            <p className="text-sm font-medium">Weekly Trend</p>
            <p className={`text-lg font-bold ${getTrendColor(metrics.weeklyTrend)}`}>
              {metrics.weeklyTrend > 0 ? '+' : ''}{metrics.weeklyTrend.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Quality Distribution</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 w-full">
                High: {metrics.qualityDistribution.high}
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-yellow-100 text-yellow-800 w-full">
                Medium: {metrics.qualityDistribution.medium}
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-red-100 text-red-800 w-full">
                Low: {metrics.qualityDistribution.low}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalytics;
