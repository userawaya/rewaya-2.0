
import { toast } from "@/components/ui/sonner";

export interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

class ToastService {
  success(message: string, options?: ToastOptions) {
    toast.success(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-center',
    });
  }

  error(message: string, options?: ToastOptions) {
    toast.error(message, {
      duration: options?.duration || 5000,
      position: options?.position || 'top-center',
    });
  }

  info(message: string, options?: ToastOptions) {
    toast.info(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-center',
    });
  }

  warning(message: string, options?: ToastOptions) {
    toast.warning(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-center',
    });
  }

  loading(message: string, options?: ToastOptions) {
    return toast.loading(message, {
      duration: options?.duration || Infinity,
      position: options?.position || 'top-center',
    });
  }

  dismiss(toastId?: string | number) {
    toast.dismiss(toastId);
  }

  // Specialized methods for common use cases
  formSuccess(action: string = 'Operation') {
    this.success(`${action} completed successfully!`);
  }

  formError(error: string | Error, action: string = 'Operation') {
    const message = error instanceof Error ? error.message : error;
    this.error(`${action} failed: ${message}`);
  }

  networkError() {
    this.error('Network error. Please check your connection and try again.');
  }

  authSuccess(action: 'login' | 'register' | 'logout') {
    const messages = {
      login: 'Welcome back! You have been logged in successfully.',
      register: 'Account created successfully! Welcome to ReWaya.',
      logout: 'You have been logged out successfully.'
    };
    this.success(messages[action]);
  }

  authError(action: 'login' | 'register', error: string) {
    const actionText = action === 'login' ? 'Login' : 'Registration';
    this.error(`${actionText} failed: ${error}`);
  }

  wasteSubmissionSuccess() {
    this.success('Waste submission recorded successfully! Your credits will be updated after assessment.');
  }

  wasteSubmissionError(error: string) {
    this.error(`Failed to submit waste record: ${error}`);
  }

  assessmentSuccess() {
    this.success('Waste assessment completed successfully!');
  }

  assessmentError(error: string) {
    this.error(`Assessment failed: ${error}`);
  }

  profileUpdateSuccess() {
    this.success('Profile updated successfully!');
  }

  profileUpdateError(error: string) {
    this.error(`Failed to update profile: ${error}`);
  }

  uploadSuccess(fileName?: string) {
    const message = fileName ? `${fileName} uploaded successfully!` : 'File uploaded successfully!';
    this.success(message);
  }

  uploadError(error: string) {
    this.error(`Upload failed: ${error}`);
  }
}

export const toastService = new ToastService();
