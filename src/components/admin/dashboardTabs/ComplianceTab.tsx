
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Shield, FileText, AlertTriangle, CheckCircle, Calendar as CalendarIcon, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ComplianceTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const mockCompliance = [
    { id: 'comp-1', type: 'Environmental Impact', status: 'compliant', lastAudit: '2024-06-01', nextDue: '2024-12-01' },
    { id: 'comp-2', type: 'Waste Management License', status: 'renewal-required', lastAudit: '2024-01-15', nextDue: '2024-07-15' },
    { id: 'comp-3', type: 'Safety Standards', status: 'compliant', lastAudit: '2024-05-20', nextDue: '2024-11-20' },
    { id: 'comp-4', type: 'Data Protection (GDPR)', status: 'under-review', lastAudit: '2024-04-10', nextDue: '2024-10-10' },
  ];

  const mockReports = [
    { id: 'rep-1', title: 'Q2 2024 Environmental Report', status: 'submitted', dueDate: '2024-07-01', submittedDate: '2024-06-28' },
    { id: 'rep-2', title: 'Monthly Waste Processing Report', status: 'draft', dueDate: '2024-07-05', submittedDate: null },
    { id: 'rep-3', title: 'Annual Compliance Summary', status: 'overdue', dueDate: '2024-06-30', submittedDate: null },
  ];

  const mockCertificates = [
    { id: 'cert-1', name: 'ISO 14001 Environmental Management', issuer: 'ISO', validUntil: '2025-08-15', status: 'valid' },
    { id: 'cert-2', name: 'Waste Management License', issuer: 'EPA', validUntil: '2024-12-31', status: 'expiring-soon' },
    { id: 'cert-3', name: 'Quality Management Certification', issuer: 'Quality Board', validUntil: '2025-03-20', status: 'valid' },
  ];

  const mockAudits = [
    { id: 'audit-1', type: 'Internal Audit', date: '2024-06-15', findings: 2, status: 'completed' },
    { id: 'audit-2', type: 'External Compliance Audit', date: '2024-07-01', findings: 0, status: 'scheduled' },
    { id: 'audit-3', type: 'Safety Inspection', date: '2024-05-28', findings: 1, status: 'completed' },
  ];

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generation Started",
      description: `${reportType} is being generated and will be ready shortly.`,
    });
  };

  const handleRenewCertificate = (certificateId: string) => {
    toast({
      title: "Renewal Process Started",
      description: "Certificate renewal process has been initiated.",
    });
  };

  const getComplianceScore = () => {
    const compliant = mockCompliance.filter(c => c.status === 'compliant').length;
    return Math.round((compliant / mockCompliance.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance & Regulatory</h2>
          <p className="text-gray-600">Monitor compliance status and regulatory requirements</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{getComplianceScore()}%</div>
            <p className="text-sm text-gray-600">Compliance Score</p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Compliance</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockCompliance.filter(c => c.status === 'compliant').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockCompliance.filter(c => c.status === 'under-review').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Reports</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockReports.filter(r => r.status === 'overdue').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valid Certificates</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockCertificates.filter(c => c.status === 'valid').length}
                </p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compliance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
          <TabsTrigger value="reports">Regulatory Reports</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="audits">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Compliance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Compliance Score</span>
                    <span className="text-sm text-gray-500">{getComplianceScore()}%</span>
                  </div>
                  <Progress value={getComplianceScore()} className="w-full" />
                </div>

                <div className="space-y-3">
                  {mockCompliance.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{item.type}</h4>
                        <Badge variant={
                          item.status === 'compliant' ? 'default' :
                          item.status === 'renewal-required' ? 'destructive' : 'secondary'
                        }>
                          {item.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span>Last Audit:</span>
                          <span className="ml-2 font-medium">{item.lastAudit}</span>
                        </div>
                        <div>
                          <span>Next Due:</span>
                          <span className="ml-2 font-medium">{item.nextDue}</span>
                        </div>
                      </div>
                      {item.status === 'renewal-required' && (
                        <Button size="sm" className="mt-3">
                          Start Renewal Process
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Regulatory Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Required Reports</h4>
                  <Button onClick={() => handleGenerateReport('Environmental Report')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate New Report
                  </Button>
                </div>

                <div className="space-y-3">
                  {mockReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{report.title}</h4>
                        <Badge variant={
                          report.status === 'submitted' ? 'default' :
                          report.status === 'overdue' ? 'destructive' : 'secondary'
                        }>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span>Due Date:</span>
                          <span className="ml-2 font-medium">{report.dueDate}</span>
                        </div>
                        <div>
                          <span>Submitted:</span>
                          <span className="ml-2 font-medium">
                            {report.submittedDate || 'Not submitted'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        {report.status === 'draft' && (
                          <Button size="sm">
                            Continue Editing
                          </Button>
                        )}
                        {report.status === 'submitted' && (
                          <Button size="sm" variant="outline">
                            View Report
                          </Button>
                        )}
                        {report.status === 'overdue' && (
                          <Button size="sm" variant="destructive">
                            Submit Now
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Certificates & Permits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCertificates.map((certificate) => (
                  <div key={certificate.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{certificate.name}</h4>
                      <Badge variant={
                        certificate.status === 'valid' ? 'default' :
                        certificate.status === 'expiring-soon' ? 'destructive' : 'secondary'
                      }>
                        {certificate.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span>Issuer:</span>
                        <span className="ml-2 font-medium">{certificate.issuer}</span>
                      </div>
                      <div>
                        <span>Valid Until:</span>
                        <span className="ml-2 font-medium">{certificate.validUntil}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Certificate
                      </Button>
                      {certificate.status === 'expiring-soon' && (
                        <Button 
                          size="sm"
                          onClick={() => handleRenewCertificate(certificate.id)}
                        >
                          Renew Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Audit History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAudits.map((audit) => (
                    <div key={audit.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{audit.type}</h4>
                        <Badge variant={
                          audit.status === 'completed' ? 'default' : 'secondary'
                        }>
                          {audit.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span>Date:</span>
                          <span className="ml-2 font-medium">{audit.date}</span>
                        </div>
                        <div>
                          <span>Findings:</span>
                          <span className={`ml-2 font-medium ${
                            audit.findings === 0 ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {audit.findings} {audit.findings === 1 ? 'finding' : 'findings'}
                          </span>
                        </div>
                      </div>
                      {audit.status === 'completed' && (
                        <Button size="sm" variant="outline" className="mt-2">
                          View Report
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Audit Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 space-y-2">
                  <h5 className="font-medium">Upcoming Audits</h5>
                  <div className="text-sm text-gray-600">
                    <p>• External Audit - July 1</p>
                    <p>• Safety Review - July 15</p>
                    <p>• Compliance Check - August 1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceTab;
