
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSecurity } from '@/components/SecurityProvider';
import { sanitizeObject } from '@/lib/validation';

interface SecureFormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
  rateLimitAction?: string;
  disabled?: boolean;
}

function SecureForm<T extends z.ZodType>({
  schema,
  onSubmit,
  children,
  className,
  rateLimitAction,
  disabled = false,
}: SecureFormProps<T>) {
  const { isRateLimited, logSecurityEvent, sanitizeInput } = useSecurity();
  
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleSubmit = async (data: z.infer<T>) => {
    try {
      // Rate limiting check
      if (rateLimitAction && isRateLimited(rateLimitAction)) {
        logSecurityEvent('form_submission_rate_limited', { action: rateLimitAction });
        throw new Error('Too many requests. Please try again later.');
      }

      // Sanitize input data
      const sanitizedData = sanitizeObject(data);
      
      // Log form submission
      logSecurityEvent('secure_form_submission', { 
        action: rateLimitAction,
        hasData: !!data 
      });

      await onSubmit(sanitizedData);
    } catch (error) {
      logSecurityEvent('form_submission_error', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        action: rateLimitAction 
      });
      throw error;
    }
  };

  return (
    <FormProvider {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)}
        className={className}
        noValidate
      >
        <fieldset disabled={disabled || form.formState.isSubmitting}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default SecureForm;
