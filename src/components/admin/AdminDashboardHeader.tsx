
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Users, AlertTriangle, TrendingUp, Activity, Shield } from 'lucide-react';

interface AdminDashboardHeaderProps {
  userName: string;
  totalUsers: number;
  pendingAssessments: number;
  systemHealth: number;
}

const AdminDashboardHeader: React.FC<AdminDashboardHeaderProps> = ({
  userName,
  totalUsers,
  pendingAssessments,
  systemHealth,
}) => {
  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBgColor = (health: number) => {
    if (health >= 95) return 'bg-green-500/20';
    if (health >= 90) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <Card className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 text-white border-slate-500/20 shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%),radial-gradient(circle_at_40%_40%,_rgba(120,219,255,0.3),_transparent_50%)]"></div>
      </div>
      
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Welcome back, {userName}
              </h1>
              <p className="text-slate-300 text-lg font-medium">ReWaya System Administration Hub</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalUsers}</p>
                  <p className="text-slate-300 text-sm">Active Users</p>
                </div>
              </div>
              
              {pendingAssessments > 0 && (
                <div className="flex items-center space-x-3 bg-amber-500/20 backdrop-blur-sm rounded-xl p-4 border border-amber-400/30">
                  <div className="p-2 bg-amber-500/30 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-amber-200" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-100">{pendingAssessments}</p>
                    <p className="text-amber-200 text-sm">Pending Reviews</p>
                  </div>
                </div>
              )}
              
              <div className={`flex items-center space-x-3 ${getHealthBgColor(systemHealth)} backdrop-blur-sm rounded-xl p-4 border ${systemHealth >= 95 ? 'border-green-400/30' : systemHealth >= 90 ? 'border-yellow-400/30' : 'border-red-400/30'}`}>
                <div className={`p-2 rounded-lg ${systemHealth >= 95 ? 'bg-green-500/30' : systemHealth >= 90 ? 'bg-yellow-500/30' : 'bg-red-500/30'}`}>
                  <Activity className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${getHealthColor(systemHealth)}`}>{systemHealth}%</p>
                  <p className="text-slate-300 text-sm">System Health</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button variant="secondary" className="bg-white/15 hover:bg-white/25 text-white border-white/20 backdrop-blur-sm transition-all duration-300 group">
              <Settings className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              System Settings
            </Button>
            <Button variant="secondary" className="bg-green-500/20 hover:bg-green-500/30 text-green-100 border-green-400/30 backdrop-blur-sm transition-all duration-300">
              <Shield className="w-5 h-5 mr-2" />
              Security Center
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboardHeader;
