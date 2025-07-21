
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, MapPin, Users, Award } from 'lucide-react';

interface TopPerformer {
  id: string;
  name: string;
  credits: number;
  submissions: number;
}

interface SystemMonitoringProps {
  activeCenters: number;
  totalCenters: number;
  pendingAssessments: number;
  completedAssessments: number;
  topPerformers: TopPerformer[];
  todaySubmissions: number;
  weeklySubmissions: number;
}

const SystemMonitoring: React.FC<SystemMonitoringProps> = ({
  activeCenters,
  totalCenters,
  pendingAssessments,
  completedAssessments,
  topPerformers,
  todaySubmissions,
  weeklySubmissions,
}) => {
  const centerUtilization = totalCenters > 0 ? (activeCenters / totalCenters) * 100 : 0;
  const assessmentCompletion = (pendingAssessments + completedAssessments) > 0 
    ? (completedAssessments / (pendingAssessments + completedAssessments)) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Center Utilization</span>
              <span className="text-sm font-medium">{Math.round(centerUtilization)}%</span>
            </div>
            <Progress value={centerUtilization} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Assessment Completion</span>
              <span className="text-sm font-medium">{Math.round(assessmentCompletion)}%</span>
            </div>
            <Progress value={assessmentCompletion} className="h-2" />
          </div>

          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Active Centers</span>
              </div>
              <Badge variant="outline">{activeCenters}/{totalCenters}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm">Pending Reviews</span>
              </div>
              <Badge variant={pendingAssessments > 10 ? "destructive" : "secondary"}>
                {pendingAssessments}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Activity Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Today's Submissions</span>
              <span className="text-2xl font-bold text-green-600">{todaySubmissions}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-2xl font-bold text-blue-600">{weeklySubmissions}</span>
            </div>

            <div className="pt-4">
              <div className="text-sm text-gray-600 mb-2">Weekly Trend</div>
              <div className="flex items-center space-x-2">
                {weeklySubmissions > todaySubmissions * 7 ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Above Average</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-amber-600">Below Average</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <span>Top Performers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.length > 0 ? (
              topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                        index === 1 ? 'bg-gray-100 text-gray-800' : 
                        'bg-orange-100 text-orange-800'}
                    `}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{performer.name}</div>
                      <div className="text-xs text-gray-500">{performer.submissions} submissions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{performer.credits}</div>
                    <div className="text-xs text-gray-500">credits</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-sm">
                No performance data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;
