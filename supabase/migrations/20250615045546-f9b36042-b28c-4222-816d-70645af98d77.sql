
-- Add the remaining specialized admin roles one by one
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'system_admin';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'operations_admin';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'finance_admin';
