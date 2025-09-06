
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Download, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface QualityReport {
  id: string;
  orderRef: string;
  wasteType: string;
  weight: number;
  qualityScore: number;
  testDate: string;
  inspector: string;
  issues: string[];
  approved: boolean;
}

const QualityReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Mock quality reports data
  const reports: QualityReport[] = [
    {
      id: 'QR001',
      orderRef: 'ORD-2024-001',
      wasteType: 'PET',
      weight: 500,
      qualityScore: 8.5,
      testDate: '2024-01-15',
      inspector: 'John Adeyemi',
      issues: [],
      approved: true
    },
    {
      id: 'QR002',
      orderRef: 'ORD-2024-002',
      wasteType: 'HDPE',
      weight: 300,
      qualityScore: 6.2,
      testDate: '2024-01-14',
      inspector: 'Sarah Okafor',
      issues: ['Minor contamination detected', 'Color inconsistency'],
      approved: false
    },
    {
      id: 'QR003',
      orderRef: 'ORD-2024-003',
      wasteType: 'PP',
      weight: 750,
      qualityScore: 9.1,
      testDate: '2024-01-13',
      inspector: 'Michael Eze',
      issues: [],
      approved: true
    }
  ];

  const getQualityColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getQualityGrade = (score: number) => {
    if (score >= 9) return 'A+';
    if (score >= 8) return 'A';
    if (score >= 7) return 'B+';
    if (score >= 6) return 'B';
    if (score >= 5) return 'C';
    return 'D';
  };

  const averageQuality = reports.reduce((sum, report) => sum + report.qualityScore, 0) / reports.length;
  const approvedCount = reports.filter(report => report.approved).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quality Assessment Reports
          </CardTitle>
          <Badge variant="secondary">
            {reports.length} reports
          </Badge>
        </div>
        
        {/* Quality Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {averageQuality.toFixed(1)}/10
            </div>
            <div className="text-sm text-gray-600">Average Quality</div>
            <div className="text-xs text-blue-600 mt-1">Grade: {getQualityGrade(averageQuality)}</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {approvedCount}/{reports.length}
            </div>
            <div className="text-sm text-gray-600">Approved Batches</div>
            <div className="text-xs text-green-600 mt-1">
              {((approvedCount / reports.length) * 100).toFixed(0)}% success rate
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {reports.reduce((sum, report) => sum + report.weight, 0)}kg
            </div>
            <div className="text-sm text-gray-600">Total Assessed</div>
            <div className="text-xs text-purple-600 mt-1">This month</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono text-xs">
                    {report.id}
                  </Badge>
                  <Badge className={`text-xs ${getQualityColor(report.qualityScore)}`}>
                    {report.qualityScore}/10 • Grade {getQualityGrade(report.qualityScore)}
                  </Badge>
                  {report.approved ? (
                    <Badge className="text-xs bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge className="text-xs bg-red-100 text-red-800">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Rejected
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setSelectedReport(
                      selectedReport === report.id ? null : report.id
                    )}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    {selectedReport === report.id ? 'Hide' : 'View'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Order Ref:</span>
                  <p className="font-medium">{report.orderRef}</p>
                </div>
                <div>
                  <span className="text-gray-500">Material:</span>
                  <p className="font-medium">{report.wasteType} • {report.weight}kg</p>
                </div>
                <div>
                  <span className="text-gray-500">Test Date:</span>
                  <p className="font-medium">{new Date(report.testDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Inspector:</span>
                  <p className="font-medium">{report.inspector}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Quality Score</span>
                  <span className="font-medium">{report.qualityScore}/10</span>
                </div>
                <Progress value={report.qualityScore * 10} className="h-2" />
              </div>
              
              {report.issues.length > 0 && (
                <div className="mb-3">
                  <div className="text-sm text-gray-500 mb-2">Issues Identified:</div>
                  <div className="space-y-1">
                    {report.issues.map((issue, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        <span className="text-gray-700">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedReport === report.id && (
                <div className="mt-4 pt-4 border-t bg-gray-50 rounded p-4">
                  <h4 className="font-medium text-sm mb-3">Detailed Assessment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Physical Properties</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Purity:</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contamination:</span>
                          <span className="font-medium">6%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Color consistency:</span>
                          <span className="font-medium">Good</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Processing Suitability</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Melt flow rate:</span>
                          <span className="font-medium">Within specs</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Moisture content:</span>
                          <span className="font-medium">0.02%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recyclability:</span>
                          <span className="font-medium">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityReports;
