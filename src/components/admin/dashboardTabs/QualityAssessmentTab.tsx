
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Star, Camera, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QualityAssessmentTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  const mockSubmissions = [
    { 
      id: 'sub-1', 
      generator: 'John Doe', 
      wasteType: 'PET', 
      weight: '2.5kg', 
      status: 'pending',
      submittedAt: '2024-06-15 09:30',
      photo: '/placeholder.svg'
    },
    { 
      id: 'sub-2', 
      generator: 'Jane Smith', 
      wasteType: 'HDPE', 
      weight: '1.8kg', 
      status: 'under_review',
      submittedAt: '2024-06-15 10:15',
      photo: '/placeholder.svg'
    },
    { 
      id: 'sub-3', 
      generator: 'Mike Johnson', 
      wasteType: 'PP', 
      weight: '3.2kg', 
      status: 'assessed',
      qualityScore: 8.5,
      submittedAt: '2024-06-15 11:00',
      photo: '/placeholder.svg'
    },
  ];

  const mockAssessments = [
    { id: 'ass-1', submission: 'sub-3', controller: 'Controller A', score: 8.5, status: 'completed' },
    { id: 'ass-2', submission: 'sub-4', controller: 'Controller B', score: 7.2, status: 'appealed' },
    { id: 'ass-3', submission: 'sub-5', controller: 'Controller A', score: 9.1, status: 'completed' },
  ];

  const handleAssessSubmission = (submissionId: string, score: number, notes: string) => {
    toast({
      title: "Assessment Submitted",
      description: `Quality score of ${score}/10 has been recorded.`,
    });
  };

  const handleApproveAssessment = (assessmentId: string) => {
    toast({
      title: "Assessment Approved",
      description: "Quality assessment has been approved.",
    });
  };

  const handleRejectAssessment = (assessmentId: string) => {
    toast({
      title: "Assessment Rejected",
      description: "Assessment has been rejected and returned for review.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quality Assessment</h2>
          <p className="text-gray-600">Manage waste quality assessments and scoring</p>
        </div>
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {mockSubmissions.filter(s => s.status === 'pending').length} Pending Reviews
        </Badge>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Assessments</TabsTrigger>
          <TabsTrigger value="workflow">Assessment Workflow</TabsTrigger>
          <TabsTrigger value="appeals">Appeals & Reviews</TabsTrigger>
          <TabsTrigger value="standards">Quality Standards</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submissions Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSubmissions.map((submission) => (
                    <div 
                      key={submission.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedSubmission === submission.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSubmission(submission.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{submission.generator}</h4>
                          <p className="text-sm text-gray-600">
                            {submission.wasteType} • {submission.weight}
                          </p>
                          <p className="text-xs text-gray-500">{submission.submittedAt}</p>
                        </div>
                        <Badge variant={
                          submission.status === 'pending' ? 'outline' :
                          submission.status === 'under_review' ? 'secondary' : 'default'
                        }>
                          {submission.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedSubmission && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Quality Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Waste Photo</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Quality Score (1-10)</label>
                        <Input type="number" min="1" max="10" step="0.1" placeholder="8.5" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Assessment Notes</label>
                        <Textarea 
                          placeholder="Enter detailed assessment notes..."
                          rows={4}
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleAssessSubmission(selectedSubmission, 8.5, "Good quality")}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1"
                          onClick={() => handleRejectAssessment(selectedSubmission)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Camera className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium">Submission</h4>
                    <p className="text-sm text-gray-600">Waste submitted with photo</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium">Initial Review</h4>
                    <p className="text-sm text-gray-600">Controller assessment</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium">Quality Scoring</h4>
                    <p className="text-sm text-gray-600">Assign quality score</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium">Final Approval</h4>
                    <p className="text-sm text-gray-600">Credits awarded</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-4">Assessment Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">24</div>
                          <p className="text-sm text-gray-600">Pending Assessments</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">186</div>
                          <p className="text-sm text-gray-600">Completed Today</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">7.8</div>
                          <p className="text-sm text-gray-600">Average Quality Score</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appeals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Assessment Appeals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssessments.filter(a => a.status === 'appealed').map((assessment) => (
                  <div key={assessment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">Assessment #{assessment.id}</h4>
                        <p className="text-sm text-gray-600">
                          Controller: {assessment.controller} • Score: {assessment.score}/10
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        {assessment.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApproveAssessment(assessment.id)}
                      >
                        Approve Appeal
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRejectAssessment(assessment.id)}
                      >
                        Reject Appeal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Standards Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Waste Type Scoring Criteria</h4>
                  <div className="space-y-4">
                    {['PET', 'HDPE', 'PP', 'LDPE', 'PVC', 'PS'].map((type) => (
                      <div key={type} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{type}</h5>
                          <Button size="sm" variant="outline">Configure</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Minimum Score:</span>
                            <span className="ml-2 font-medium">5.0</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Average Score:</span>
                            <span className="ml-2 font-medium">7.5</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Premium Score:</span>
                            <span className="ml-2 font-medium">9.0+</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Assessment Guidelines</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-green-600">Excellent Quality (9-10)</h5>
                      <p className="text-sm text-gray-600">Clean, sorted, no contamination</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-blue-600">Good Quality (7-8)</h5>
                      <p className="text-sm text-gray-600">Minor contamination, mostly clean</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-yellow-600">Fair Quality (5-6)</h5>
                      <p className="text-sm text-gray-600">Some contamination, requires cleaning</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-red-600">Poor Quality (1-4)</h5>
                      <p className="text-sm text-gray-600">Heavy contamination, mixed materials</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityAssessmentTab;
