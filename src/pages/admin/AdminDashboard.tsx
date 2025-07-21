
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";

const AdminDashboardPage = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AdminProtectedRoute>
      <AdminDashboard 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />
    </AdminProtectedRoute>
  );
};

export default AdminDashboardPage;
