import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Recycle, 
  Mail, 
  Lock, 
  User, 
  Phone,
  Users, 
  Shield, 
  Truck,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/components/onboarding/OnboardingProvider';

const roles = [
  {
    id: 'generator',
    name: 'Generator',
    icon: Users,
    description: 'Individuals and institutions bringing plastic waste',
    color: 'emerald',
    benefits: ['Earn credits', 'Track impact', 'Easy submission']
  },
  {
    id: 'controller',
    name: 'Controller',
    icon: Shield,
    description: 'Staff managing collation centers',
    color: 'amber',
    benefits: ['Manage intake', 'Quality assessment', 'Track inventory']
  },
  {
    id: 'driver',
    name: 'Driver',
    icon: Truck,
    description: 'Transport from centers to recyclers',
    color: 'sky',
    benefits: ['Optimized routes', 'Pickup requests', 'Earn income']
  },
  {
    id: 'recycler',
    name: 'Recycler',
    icon: Recycle,
    description: 'Companies purchasing sorted plastic',
    color: 'purple',
    benefits: ['Quality materials', 'Bulk orders', 'Track supply']
  }
];

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Role selection, 2: Details
  const [fieldErrors, setFieldErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const { signUp, user } = useAuth();
  const { startOnboarding } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleRoleSelect = (roleId: string) => {
    console.log('Role selected:', roleId);
    setFormData({ ...formData, role: roleId });
    setStep(2);
  };

  const validateForm = () => {
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!formData.role) {
      setError('Please select a role');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    console.log('Starting registration process with form data:', {
      ...formData,
      password: '[HIDDEN]'
    });

    try {
      console.log('Calling signUp with metadata:', {
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role
      });

      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.fullName,
          phone: formData.phone,
          role: formData.role
        }
      );
      
      if (signUpError) {
        console.error('Registration failed with error:', signUpError);
        if (signUpError.message.includes('User already registered')) {
          setError('An account with this email already exists. Please sign in instead.');
        } else {
          setError(`Registration failed: ${signUpError.message}`);
        }
      } else {
        console.log('Registration successful');
        setSuccess(true);
        // Start onboarding after successful registration
        setTimeout(() => {
          startOnboarding(formData.role);
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Unexpected error during registration:', err);
      setError('An unexpected error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300',
      amber: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-300',
      sky: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:border-sky-300',
      purple: 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:border-purple-300'
    };
    return colorMap[color as keyof typeof colorMap] || '';
  };

  const selectedRole = roles.find(r => r.id === formData.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-28 h-9">
              <img 
                alt="ReWaya Logo" 
                className="w-full h-full object-contain" 
                src="/lovable-uploads/adc5a49d-a045-4e8f-b8d2-c60e7bdc415e.png" 
              />
            </div>
          </div>
          <p className="text-gray-600">Join the plastic waste transformation movement</p>
        </div>

        <Card className="animate-scale-in shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {step === 1 ? 'Choose Your Role' : 'Complete Your Registration'}
            </CardTitle>
            {step === 1 ? (
              <p className="text-gray-600 text-center mt-2">
                Select how you'll participate in the ReWaya ecosystem
              </p>
            ) : (
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors p-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change role</span>
                </Button>
                {selectedRole && (
                  <Badge variant="secondary" className="flex items-center space-x-2">
                    <selectedRole.icon className="w-4 h-4" />
                    <span>{selectedRole.name}</span>
                  </Badge>
                )}
              </div>
            )}
          </CardHeader>

          {step === 1 ? (
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {roles.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-6 border-2 rounded-lg text-left transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-up ${getColorClasses(role.color)}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{role.name}</h3>
                          <p className="text-sm opacity-80 mb-3">{role.description}</p>
                          <div className="space-y-1">
                            {role.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-xs">
                                <Check className="w-3 h-3 opacity-60" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="animate-slide-up border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="animate-slide-up border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      Account created successfully! Redirecting to your dashboard...
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (fieldErrors.fullName) {
                            setFieldErrors(prev => ({ ...prev, fullName: '' }));
                          }
                        }}
                        className={`pl-10 transition-all duration-200 hover:border-green-300 focus:border-green-500 ${
                          fieldErrors.fullName ? 'border-red-300 bg-red-50' : ''
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldErrors.fullName && (
                      <p className="text-sm text-red-600 animate-slide-up">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (fieldErrors.phone) {
                            setFieldErrors(prev => ({ ...prev, phone: '' }));
                          }
                        }}
                        className={`pl-10 transition-all duration-200 hover:border-green-300 focus:border-green-500 ${
                          fieldErrors.phone ? 'border-red-300 bg-red-50' : ''
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldErrors.phone && (
                      <p className="text-sm text-red-600 animate-slide-up">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) {
                          setFieldErrors(prev => ({ ...prev, email: '' }));
                        }
                      }}
                      className={`pl-10 transition-all duration-200 hover:border-green-300 focus:border-green-500 ${
                        fieldErrors.email ? 'border-red-300 bg-red-50' : ''
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-sm text-red-600 animate-slide-up">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({ ...formData, password: e.target.value });
                          if (fieldErrors.password) {
                            setFieldErrors(prev => ({ ...prev, password: '' }));
                          }
                        }}
                        className={`pl-10 transition-all duration-200 hover:border-green-300 focus:border-green-500 ${
                          fieldErrors.password ? 'border-red-300 bg-red-50' : ''
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldErrors.password && (
                      <p className="text-sm text-red-600 animate-slide-up">{fieldErrors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({ ...formData, confirmPassword: e.target.value });
                          if (fieldErrors.confirmPassword) {
                            setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
                          }
                        }}
                        className={`pl-10 transition-all duration-200 hover:border-green-300 focus:border-green-500 ${
                          fieldErrors.confirmPassword ? 'border-red-300 bg-red-50' : ''
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="text-sm text-red-600 animate-slide-up">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
                  disabled={isLoading || success}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : success ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Account Created!</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-green-600 hover:text-green-700 font-medium transition-colors hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Register;
