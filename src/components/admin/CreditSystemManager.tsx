
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Settings,
  History,
  RefreshCw,
  Eye
} from 'lucide-react';

interface CreditTransaction {
  id: string;
  user_name: string;
  transaction_type: 'earned' | 'redeemed' | 'bonus' | 'penalty';
  amount: number;
  description: string;
  created_at: string;
  status: 'completed' | 'pending' | 'failed';
}

const CreditSystemManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'settings'>('overview');

  // Mock data
  const creditTransactions: CreditTransaction[] = [
    {
      id: '1',
      user_name: 'John Doe',
      transaction_type: 'earned',
      amount: 125,
      description: 'PET bottles submission - Quality Score: 8.5',
      created_at: '2024-01-15T10:30:00Z',
      status: 'completed',
    },
    {
      id: '2',
      user_name: 'Jane Smith',
      transaction_type: 'redeemed',
      amount: -500,
      description: 'Cash out to bank account',
      created_at: '2024-01-15T09:15:00Z',
      status: 'completed',
    },
    {
      id: '3',
      user_name: 'Mike Johnson',
      transaction_type: 'bonus',
      amount: 50,
      description: 'First-time submission bonus',
      created_at: '2024-01-14T16:45:00Z',
      status: 'completed',
    },
  ];

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'bg-green-100 text-green-800';
      case 'redeemed': return 'bg-red-100 text-red-800';
      case 'bonus': return 'bg-blue-100 text-blue-800';
      case 'penalty': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned': return <TrendingUp className="w-4 h-4" />;
      case 'redeemed': return <TrendingDown className="w-4 h-4" />;
      case 'bonus': return <DollarSign className="w-4 h-4" />;
      case 'penalty': return <TrendingDown className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Credit System</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage credits, transactions, and system settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
            size="sm"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('transactions')}
            size="sm"
          >
            <History className="w-4 h-4 mr-2" />
            Transactions
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('settings')}
            size="sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Credit System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">487,523</p>
                    <p className="text-sm text-gray-600">Total Credits Issued</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">156,890</p>
                    <p className="text-sm text-gray-600">Credits Redeemed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">₦78,445</p>
                    <p className="text-sm text-gray-600">Total Payouts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-gray-600">Active Credit Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Credit Distribution and Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Credit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credits Earned</span>
                    <span className="font-medium text-green-600">+24,567</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credits Redeemed</span>
                    <span className="font-medium text-red-600">-8,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bonus Credits</span>
                    <span className="font-medium text-blue-600">+1,456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Net Balance</span>
                    <span className="font-medium">+17,789</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Rate Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Credits per KG (PET)</span>
                    <span className="font-medium">5.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Quality Score Impact</span>
                    <span className="font-medium">+23% avg boost</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Redemption Rate</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User Satisfaction</span>
                    <span className="font-medium text-green-600">4.7/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Credit Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="font-medium">{transaction.user_name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getTransactionColor(transaction.transaction_type)} flex items-center space-x-1 w-fit`}>
                        {getTransactionIcon(transaction.transaction_type)}
                        <span className="capitalize">{transaction.transaction_type}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-xs truncate">{transaction.description}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(transaction.created_at)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Rates Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">PET Rate (credits/kg)</label>
                  <Input type="number" defaultValue="5" className="w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">HDPE Rate (credits/kg)</label>
                  <Input type="number" defaultValue="4" className="w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">PP Rate (credits/kg)</label>
                  <Input type="number" defaultValue="3" className="w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Quality Multiplier Max</label>
                  <Input type="number" step="0.1" defaultValue="2.0" className="w-20" />
                </div>
              </div>
              <Button className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Update Rates
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Minimum Cashout (credits)</label>
                  <Input type="number" defaultValue="100" className="w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Exchange Rate (₦/credit)</label>
                  <Input type="number" step="0.01" defaultValue="0.50" className="w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Bonus Credit %</label>
                  <Input type="number" defaultValue="10" className="w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Processing Fee %</label>
                  <Input type="number" step="0.1" defaultValue="2.5" className="w-20" />
                </div>
              </div>
              <Button className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreditSystemManager;
