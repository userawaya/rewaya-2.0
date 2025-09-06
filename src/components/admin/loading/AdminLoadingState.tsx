
import React from 'react';
import { Loader } from 'lucide-react';

interface AdminLoadingStateProps {
  isLoading: boolean;
  error: Error | null;
}

const AdminLoadingState: React.FC<AdminLoadingStateProps> = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <Loader className="w-12 h-12 animate-spin text-green-600 mb-4" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-green-200 rounded-full animate-pulse"></div>
        </div>
        <span className="text-gray-700 font-medium text-lg">Loading admin analytics...</span>
        <span className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest data</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200">
          <span className="text-red-600 font-bold text-xl block mb-2">
            Failed to load analytics data
          </span>
          <span className="text-red-500 text-sm">
            Please check your connection and try again
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminLoadingState;
