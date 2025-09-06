
import { z } from 'zod';

// Common validation schemas
export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]{10,15}$/, 'Invalid phone number format')
  .optional()
  .or(z.literal(''));

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(254, 'Email too long');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name too long')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters');

// Profile validation
export const profileSchema = z.object({
  full_name: nameSchema,
  phone: phoneSchema,
  bio: z.string().max(500, 'Bio too long').optional(),
  department: z.string().max(100, 'Department name too long').optional(),
  location: z.string().max(200, 'Location too long').optional(),
  role: z.enum(['generator', 'controller', 'driver', 'recycler', 'admin']),
});

// Waste submission validation
export const wasteSubmissionSchema = z.object({
  waste_type: z.enum(['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'OTHER']),
  weight_kg: z.number().min(0.1, 'Weight must be at least 0.1 kg').max(1000, 'Weight too large'),
  center_id: z.string().uuid('Invalid center ID'),
  photo_url: z.string().url('Invalid photo URL').optional(),
});

// File validation
export const fileValidationSchema = z.object({
  file: z.any().refine((file) => file instanceof File, 'Must be a file'),
  maxSize: z.number().default(5 * 1024 * 1024), // 5MB default
  allowedTypes: z.array(z.string()).default(['image/jpeg', 'image/png', 'image/webp']),
});

// Sanitization utilities
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = {} as T;
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeString(value) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  return sanitized;
};

// Rate limiting helper
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };
};

// File validation function
export const validateFile = (file: File, options: {
  maxSize?: number;
  allowedTypes?: string[];
} = {}): string | null => {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] } = options;
  
  if (file.size > maxSize) {
    return `File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};
