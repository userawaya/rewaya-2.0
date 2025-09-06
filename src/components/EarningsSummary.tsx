
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingUp, Calendar, Download, Star } from 'lucide-react';
import { 
  useWasteRecords, 
  calculateTotalCredits, 
  calculatePendingCredits, 
  creditsToNaira,
  CREDIT_TO_NAIRA_RATE 
} from '@/hooks/useWasteRecords';

const EarningsSummary: React.FC = () => {
  const { data: wasteRecords } = useWasteRecords();

  // Calculate different types of credits
  const totalCredits = calculateTotalCredits(wasteRecords || []);
  const pendingCredits = calculatePendingCredits(wasteRecords || []);
  const availableCredits = wasteRecords?.filter(r => r.status === 'recycled')
    .reduce((sum, record) => sum + (record.credits_earned || 0), 0) || 0;

  // Convert to Naira
  const totalNaira = creditsToNaira(totalCredits);
  const pendingNaira = creditsToNaira(pendingCredits);
  const availableNaira = creditsToNaira(availableCredits);

  // Mock payout history for demonstration
  const payoutHistory = [
    { id: 1, credits: 10280, amount: 15420, date: '2024-05-15', status: 'completed', method: 'Bank Transfer' },
    { id: 2, credits: 5833, amount: 8750, date: '2024-04-15', status: 'completed', method: 'Mobile Money' },
    { id: 3, credits: 8200, amount: 12300, date: '2024-03-15', status: 'completed', method: 'Bank Transfer' },
  ];

  return (
    <div className="space-y-6">
      {/* Credit Conversion Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">
              1 Credit Point = ₦{CREDIT_TO_NAIRA_RATE}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Credits & Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits Earned</p>
                <p className="text-2xl font-bold text-green-600">{totalCredits.toLocaleString()} pts</p>
                <p className="text-sm text-gray-600">≈ ₦{totalNaira.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available for Payout</p>
                <p className="text-2xl font-bold text-blue-600">{availableCredits.toLocaleString()} pts</p>
                <p className="text-sm text-gray-600">≈ ₦{availableNaira.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Assessment</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCredits.toLocaleString()} pts</p>
                <p className="text-sm text-gray-600">≈ ₦{pendingNaira.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout Request */}
      {availableCredits > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Ready for Payout</span>
              <Button className="bg-green-600 hover:bg-green-700">
                Request Payout
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You have {availableCredits.toLocaleString()} credit points (₦{availableNaira.toLocaleString()}) available for payout. 
              Minimum payout is 3,334 points (₦5,000). Payouts are processed monthly.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payout History</span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {payoutHistory.length === 0 ? (
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payouts yet</h3>
              <p className="text-gray-600">Your payout history will appear here once you receive payments.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payoutHistory.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Wallet className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payout.credits.toLocaleString()} points</p>
                      <p className="text-lg font-bold text-green-600">₦{payout.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{payout.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      {payout.status.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{payout.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsSummary;
