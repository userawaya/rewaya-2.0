
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import DashboardLayout from "@/components/DashboardLayout";
import GeneratorDashboard from "@/components/dashboards/GeneratorDashboard";
import ControllerDashboard from "@/components/dashboards/ControllerDashboard";
import DriverDashboard from "@/components/dashboards/DriverDashboard";
import RecyclerDashboard from "@/components/dashboards/RecyclerDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (profile.role) {
      case "generator":
        return <GeneratorDashboard activeTab={activeTab} onTabChange={setActiveTab} />;
      case "controller":
        return <ControllerDashboard activeTab={activeTab} onTabChange={setActiveTab} />;
      case "driver":
        return <DriverDashboard activeTab={activeTab} onTabChange={setActiveTab} />;
      case "recycler":
        return <RecyclerDashboard activeTab={activeTab} onTabChange={setActiveTab} />;
      case "admin":
        return (
          <AdminDashboard 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            onLogout={handleLogout}
          />
        );
      default:
        return <GeneratorDashboard activeTab={activeTab} onTabChange={setActiveTab} />;
    }
  };

  const isAdminRole = profile.role === "admin";

  return (
    <DashboardLayout
      onLogout={handleLogout}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isAdminDashboard={isAdminRole}
      userRole={profile.role}
      userName={profile.full_name || 'User'}
    >
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
