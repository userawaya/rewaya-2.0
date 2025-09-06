
import { useCallback } from 'react';
import { toastService } from '@/services/toastService';

export const useToastNotifications = () => {
  const showSuccess = useCallback((message: string, duration?: number) => {
    toastService.success(message, { duration });
  }, []);

  const showError = useCallback((message: string, duration?: number) => {
    toastService.error(message, { duration });
  }, []);

  const showInfo = useCallback((message: string, duration?: number) => {
    toastService.info(message, { duration });
  }, []);

  const showWarning = useCallback((message: string, duration?: number) => {
    toastService.warning(message, { duration });
  }, []);

  const showLoading = useCallback((message: string) => {
    return toastService.loading(message);
  }, []);

  const dismiss = useCallback((toastId?: string | number) => {
    toastService.dismiss(toastId);
  }, []);

  // Specialized notification methods
  const notifyFormSuccess = useCallback((action?: string) => {
    toastService.formSuccess(action);
  }, []);

  const notifyFormError = useCallback((error: string | Error, action?: string) => {
    toastService.formError(error, action);
  }, []);

  const notifyNetworkError = useCallback(() => {
    toastService.networkError();
  }, []);

  const notifyAuthSuccess = useCallback((action: 'login' | 'register' | 'logout') => {
    toastService.authSuccess(action);
  }, []);

  const notifyAuthError = useCallback((action: 'login' | 'register', error: string) => {
    toastService.authError(action, error);
  }, []);

  const notifyWasteSubmission = useCallback((success: boolean, error?: string) => {
    if (success) {
      toastService.wasteSubmissionSuccess();
    } else {
      toastService.wasteSubmissionError(error || 'Unknown error occurred');
    }
  }, []);

  const notifyAssessment = useCallback((success: boolean, error?: string) => {
    if (success) {
      toastService.assessmentSuccess();
    } else {
      toastService.assessmentError(error || 'Unknown error occurred');
    }
  }, []);

  const notifyProfileUpdate = useCallback((success: boolean, error?: string) => {
    if (success) {
      toastService.profileUpdateSuccess();
    } else {
      toastService.profileUpdateError(error || 'Unknown error occurred');
    }
  }, []);

  const notifyUpload = useCallback((success: boolean, error?: string, fileName?: string) => {
    if (success) {
      toastService.uploadSuccess(fileName);
    } else {
      toastService.uploadError(error || 'Upload failed');
    }
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
    notifyFormSuccess,
    notifyFormError,
    notifyNetworkError,
    notifyAuthSuccess,
    notifyAuthError,
    notifyWasteSubmission,
    notifyAssessment,
    notifyProfileUpdate,
    notifyUpload,
  };
};
