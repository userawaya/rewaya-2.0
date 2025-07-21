
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Clock, AlertCircle, FileText, User, Award, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserVerificationOnboarding: React.FC = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const mockPendingVerifications = [
    { 
      id: '1', 
      user: 'john.newuser@example.com', 
      type: 'Identity Verification', 
      role: 'driver',
      documents: ['Driver License', 'Vehicle Registration'], 
      submitted: '2024-06-15 10:30',
      status: 'pending'
    },
    { 
      id: '2', 
      user: 'sarah.recycler@example.com', 
      type: 'Business Registration', 
      role: 'recycler',
      documents: ['Business License', 'Tax Certificate'], 
      submitted: '2024-06-15 09:15',
      status: 'under-review'
    },
    { 
      id: '3', 
      user: 'mike.controller@example.com', 
      type: 'Professional Certification', 
      role: 'controller',
      documents: ['Quality Control Certificate'], 
      submitted: '2024-06-14 16:45',
      status: 'pending'
    },
  ];

  const mockOnboardingProgress = [
    { 
      id: '1', 
      user: 'alice.generator@example.com',
      role: 'generator',
      progress: 85,
      currentStep: 'Profile Completion',
      stepsCompleted: 6,
      totalSteps: 7,
      joinedDate: '2024-06-14'
    },
    { 
      id: '2', 
      user: 'bob.driver@example.com',
      role: 'driver',
      progress: 45,
      currentStep: 'Document Upload',
      stepsCompleted: 3,
      totalSteps: 8,
      joinedDate: '2024-06-15'
    },
    { 
      id: '3', 
      user: 'carol.recycler@example.com',
      role: 'recycler',
      progress: 70,
      currentStep: 'Business Verification',
      stepsCompleted: 5,
      totalSteps: 9,
      joinedDate: '2024-06-13'
    },
  ];

  const mockCertifications = [
    { id: '1', name: 'Waste Quality Assessment', category: 'Controller', participants: 12, completionRate: '85%' },
    { id: '2', name: 'Safe Collection Procedures', category: 'Driver', participants: 25, completionRate: '92%' },
    { id: '3', name: 'Recycling Process Standards', category: 'Recycler', participants: 8, completionRate: '75%' },
    { id: '4', name: 'Platform Usage Basics', category: 'All Roles', participants: 156, completionRate: '96%' },
  ];

  const handleVerificationAction = (verificationId: string, action: string) => {
    toast({
      title: "Verification Updated",
      description: `Verification has been ${action}.`,
    });
  };

  const handleOnboardingSupport = (userId: string, userEmail: string) => {
    toast({
      title: "Support Initiated",
      description: `Onboarding support sent to ${userEmail}.`,
    });
  };

  const handleCertificationAction = (certId: string, action: string) => {
    toast({
      title: "Certification Action",
      description: `Certification has been ${action}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Verification & Onboarding</h2>
          <p className="text-gray-600">Manage user verification processes and onboarding workflows</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Verification Report
          </Button>
          <Button>
            <Award className="w-4 h-4 mr-2" />
            Create Certification
          </Button>
        </div>
      </div>

      <Tabs defaultValue="verification" className="space-y-4">
        <TabsList>
          <TabsTrigger value="verification">Pending Verifications</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding Progress</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="workflows">Workflow Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Document Verifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Verification Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPendingVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell className="font-medium">{verification.user}</TableCell>
                      <TableCell>{verification.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{verification.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {verification.documents.map((doc, index) => (
                            <div key={index}>{doc}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{verification.submitted}</TableCell>
                      <TableCell>
                        <Badge variant={
                          verification.status === 'pending' ? 'secondary' :
                          verification.status === 'under-review' ? 'default' : 'destructive'
                        }>
                          {verification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleVerificationAction(verification.id, 'reviewed')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleVerificationAction(verification.id, 'approved')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <p className="text-sm text-gray-600">Approved This Week</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2.3h</div>
                  <p className="text-sm text-gray-600">Avg Review Time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Onboarding Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOnboardingProgress.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{user.user}</h4>
                        <p className="text-sm text-gray-600">Role: {user.role} • Joined: {user.joinedDate}</p>
                      </div>
                      <Badge variant="outline">
                        {user.stepsCompleted}/{user.totalSteps} Steps
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Current Step: {user.currentStep}</span>
                        <span className="text-sm text-gray-500">{user.progress}%</span>
                      </div>
                      <Progress value={user.progress} className="w-full" />
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOnboardingSupport(user.id, user.user)}
                      >
                        Send Help
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {user.progress < 50 && (
                        <Button size="sm" variant="outline">
                          <Clock className="w-4 h-4 mr-1" />
                          Remind
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">7</div>
                  <p className="text-sm text-gray-600">Stuck Users</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">87%</div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Training & Certifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCertifications.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-gray-600">Category: {cert.category}</p>
                      </div>
                      <Badge variant="outline">
                        {cert.completionRate} completion
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {cert.participants} participants enrolled
                      </p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCertificationAction(cert.id, 'viewed')}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCertificationAction(cert.id, 'edited')}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certification Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">201</div>
                  <p className="text-sm text-gray-600">Total Participants</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <p className="text-sm text-gray-600">Active Programs</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">88%</div>
                  <p className="text-sm text-gray-600">Avg Completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Generator Onboarding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Account Creation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Email Verification</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Profile Setup</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>First Submission Guide</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-4">Configure</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Driver Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Identity Verification</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>License Validation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>Vehicle Registration</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                          <span>Background Check</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-4">Configure</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Global Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Auto-approve low-risk verifications</span>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Verification reminder frequency</span>
                        <Badge variant="outline">3 days</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Maximum verification attempts</span>
                        <Badge variant="outline">3 attempts</Badge>
                      </div>
                      <Button>Update Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserVerificationOnboarding;
