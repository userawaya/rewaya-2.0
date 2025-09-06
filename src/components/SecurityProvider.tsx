
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createRateLimiter } from '@/lib/validation';

interface SecurityContextType {
  isRateLimited: (action: string, identifier?: string) => boolean;
  logSecurityEvent: (event: string, details?: any) => void;
  sanitizeInput: (input: string) => string;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

// Rate limiters for different actions
const rateLimiters = {
  login: createRateLimiter(5, 15 * 60 * 1000), // 5 attempts per 15 minutes
  signup: createRateLimiter(3, 60 * 60 * 1000), // 3 attempts per hour
  upload: createRateLimiter(10, 60 * 1000), // 10 uploads per minute
  submit: createRateLimiter(20, 60 * 1000), // 20 submissions per minute
};

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [securityLogs, setSecurityLogs] = useState<Array<{
    timestamp: Date;
    event: string;
    userId?: string;
    details?: any;
  }>>([]);

  const isRateLimited = (action: string, identifier?: string): boolean => {
    const rateLimiter = rateLimiters[action as keyof typeof rateLimiters];
    if (!rateLimiter) return false;

    const id = identifier || user?.id || 'anonymous';
    const allowed = rateLimiter(id);
    
    if (!allowed) {
      logSecurityEvent('rate_limit_exceeded', { action, identifier: id });
    }
    
    return !allowed;
  };

  const logSecurityEvent = (event: string, details?: any) => {
    const logEntry = {
      timestamp: new Date(),
      event,
      userId: user?.id,
      details,
    };

    setSecurityLogs(prev => [...prev.slice(-99), logEntry]); // Keep last 100 logs
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Security Event:', logEntry);
    }
  };

  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential XSS characters
      .slice(0, 1000); // Limit length
  };

  useEffect(() => {
    if (user) {
      logSecurityEvent('user_session_active', { userId: user.id });
    }
  }, [user]);

  const value = {
    isRateLimited,
    logSecurityEvent,
    sanitizeInput,
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
