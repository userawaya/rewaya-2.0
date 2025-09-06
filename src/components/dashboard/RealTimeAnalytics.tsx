
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Recycle, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  dailySubmissions: Array<{ date: string; count: number; weight: number }>;
  wasteTypeDistribution: Array<{ type: string; count: number; value: number }>;
  weeklyTrends: Array<{ week: string; submissions: number; credits: number }>;
  realTimeStats: {
    todaySubmissions: number;
    totalWeight: number;
    creditsEarned: number;
    activeUsers: number;
  };
}

interface RealTimeAnalyticsProps {
  userRole: string;
  refreshTrigger?: number;
}

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

const RealTimeAnalytics: React.FC<RealTimeAnalyticsProps> = ({ userRole, refreshTrigger }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    
    // Set up real-time subscription for waste records
    const channel = supabase
      .channel('analytics-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'waste_records'
        },
        () => {
          console.log('Waste record changed, refreshing analytics...');
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshTrigger]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch recent submissions (last 7 days)
      const { data: wasteRecords } = await supabase
        .from('waste_records')
        .select(`
          created_at,
          waste_type,
          weight_kg,
          credits_earned,
          status
        `)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      if (!wasteRecords) return;

      // Process daily submissions
      const dailyData = processDaily(wasteRecords);
      const wasteTypeData = processWasteTypes(wasteRecords);
      const weeklyData = processWeekly(wasteRecords);
      const realTimeStats = calculateRealTimeStats(wasteRecords);

      setAnalytics({
        dailySubmissions: dailyData,
        wasteTypeDistribution: wasteTypeData,
        weeklyTrends: weeklyData,
        realTimeStats
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processDaily = (records: any[]) => {
    const daily = new Map();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    last7Days.forEach(date => {
      daily.set(date, { date, count: 0, weight: 0 });
    });

    records.forEach(record => {
      const date = record.created_at.split('T')[0];
      if (daily.has(date)) {
        const entry = daily.get(date);
        entry.count += 1;
        entry.weight += record.weight_kg;
      }
    });

    return Array.from(daily.values());
  };

  const processWasteTypes = (records: any[]) => {
    const typeMap = new Map();
    records.forEach(record => {
      const type = record.waste_type;
      const current = typeMap.get(type) || { type, count: 0, value: 0 };
      current.count += 1;
      current.value += record.weight_kg;
      typeMap.set(type, current);
    });
    return Array.from(typeMap.values());
  };

  const processWeekly = (records: any[]) => {
    const weeklyMap = new Map();
    records.forEach(record => {
      const week = getWeekNumber(new Date(record.created_at));
      const current = weeklyMap.get(week) || { week: `Week ${week}`, submissions: 0, credits: 0 };
      current.submissions += 1;
      current.credits += record.credits_earned || 0;
      weeklyMap.set(week, current);
    });
    return Array.from(weeklyMap.values());
  };

  const calculateRealTimeStats = (records: any[]) => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => r.created_at.startsWith(today));
    
    return {
      todaySubmissions: todayRecords.length,
      totalWeight: records.reduce((sum, r) => sum + r.weight_kg, 0),
      creditsEarned: records.reduce((sum, r) => sum + (r.credits_earned || 0), 0),
      activeUsers: new Set(records.map(r => r.generator_id)).size
    };
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Submissions</p>
                <p className="text-2xl font-bold">{analytics.realTimeStats.todaySubmissions}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Weight (kg)</p>
                <p className="text-2xl font-bold">{analytics.realTimeStats.totalWeight.toFixed(1)}</p>
              </div>
              <Recycle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Credits Earned</p>
                <p className="text-2xl font-bold">{analytics.realTimeStats.creditsEarned}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{analytics.realTimeStats.activeUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Submissions Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Submissions (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analytics.dailySubmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value, name) => [value, name === 'count' ? 'Submissions' : 'Weight (kg)']}
                />
                <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analytics.wasteTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, count }) => `${type}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.wasteTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics.weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="submissions" fill="#10B981" name="Submissions" />
                <Bar dataKey="credits" fill="#F59E0B" name="Credits" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeAnalytics;
