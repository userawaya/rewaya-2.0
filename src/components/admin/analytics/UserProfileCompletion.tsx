
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface CompletionData {
  range: string;
  count: number;
  percentage: string;
}

interface UserProfileCompletionProps {
  completionData: CompletionData[];
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

const UserProfileCompletion: React.FC<UserProfileCompletionProps> = ({ completionData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completion Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={completionData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="count"
              label={({ range, percentage }) => `${range}: ${percentage}%`}
            >
              {completionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserProfileCompletion;
