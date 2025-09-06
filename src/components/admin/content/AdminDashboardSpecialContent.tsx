
import React from 'react';
import FieldMarshalRegistrationForm from '../FieldMarshalRegistrationForm';

interface AdminDashboardSpecialContentProps {
  adminSubTab: "main" | "registerMarshal";
}

const AdminDashboardSpecialContent: React.FC<AdminDashboardSpecialContentProps> = ({
  adminSubTab,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <FieldMarshalRegistrationForm />
    </div>
  );
};

export default AdminDashboardSpecialContent;
