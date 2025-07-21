import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, CreditCard, TrendingUp, Receipt, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FinancialManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const mockTransactions = [
    { id: 'txn-1', type: 'credit', user: 'John Doe', amount: 12750, status: 'completed', date: '2024-06-15' },
    { id: 'txn-2', type: 'payment', user: 'Green Recyclers Inc', amount: 625000, status: 'pending', date: '2024-06-15' },
    { id: 'txn-3', type: 'credit', user: 'Jane Smith', amount: 9375, status: 'completed', date: '2024-06-14' },
  ];

  const mockPayments = [
    { id: 'pay-1', recycler: 'EcoPlastics Ltd', amount: 2750000, dueDate: '2024-06-20', status: 'pending' },
    { id: 'pay-2', recycler: 'Green Solutions Co', amount: 1600000, dueDate: '2024-06-18', status: 'overdue' },
    { id: 'pay-3', recycler: 'Plastic Masters', amount: 1400000, dueDate: '2024-06-25', status: 'scheduled' },
  ];

  const handleProcessPayment = (paymentId: string) => {
    toast({
      title: "Payment Processed",
      description: "Payment has been successfully processed.",
    });
  };

  const handleUpdatePricing = (wasteType: string, newPrice: number) => {
    toast({
      title: "Pricing Updated",
      description: `New price for ${wasteType} has been set to ₦${newPrice}/kg`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Management</h2>
          <p className="text-gray-600">Manage payments, credits, and financial operations</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Receipt className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₦12,290,000</p>
              </div>
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">₦5,750,000</p>
              </div>
              <CreditCard className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Credits Issued</p>
                <p className="text-2xl font-bold text-blue-600">₦4,460,000</p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-2xl font-bold text-purple-600">+15.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Models</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowUpDown className="w-5 h-5" />
                <span>Recent Transactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.user}</h4>
                        <p className="text-sm text-gray-600">
                          {transaction.type === 'credit' ? 'Credits Earned' : 'Payment to Recycler'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₦{transaction.amount.toLocaleString()}</p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{payment.recycler}</h4>
                      <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                      <p className="text-lg font-semibold">₦{payment.amount.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={
                        payment.status === 'overdue' ? 'destructive' :
                        payment.status === 'pending' ? 'secondary' : 'default'
                      }>
                        {payment.status}
                      </Badge>
                      <Button 
                        size="sm"
                        onClick={() => handleProcessPayment(payment.id)}
                        disabled={payment.status === 'overdue'}
                      >
                        {payment.status === 'pending' ? 'Process Payment' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Models Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Waste Type Pricing (per kg)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { type: 'PET', price: 1250, demand: 'High' },
                      { type: 'HDPE', price: 1100, demand: 'Medium' },
                      { type: 'PP', price: 900, demand: 'Medium' },
                      { type: 'LDPE', price: 800, demand: 'Low' },
                      { type: 'PVC', price: 700, demand: 'Low' },
                      { type: 'PS', price: 600, demand: 'Very Low' },
                    ].map((item) => (
                      <div key={item.type} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{item.type}</h5>
                          <Badge variant={
                            item.demand === 'High' ? 'default' :
                            item.demand === 'Medium' ? 'secondary' : 'outline'
                          }>
                            {item.demand} Demand
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input 
                            type="number" 
                            value={item.price} 
                            step="50"
                            className="w-24"
                          />
                          <span className="text-sm text-gray-600">₦/kg</span>
                          <Button 
                            size="sm" 
                            onClick={() => handleUpdatePricing(item.type, item.price)}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Quality Multipliers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Premium Quality (9-10)</h5>
                      <div className="flex items-center space-x-2">
                        <Input type="number" value="1.5" step="0.1" className="w-20" />
                        <span className="text-sm text-gray-600">× base price</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Standard Quality (7-8)</h5>
                      <div className="flex items-center space-x-2">
                        <Input type="number" value="1.0" step="0.1" className="w-20" />
                        <span className="text-sm text-gray-600">× base price</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Lower Quality (5-6)</h5>
                      <div className="flex items-center space-x-2">
                        <Input type="number" value="0.8" step="0.1" className="w-20" />
                        <span className="text-sm text-gray-600">× base price</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Poor Quality (1-4)</h5>
                      <div className="flex items-center space-x-2">
                        <Input type="number" value="0.5" step="0.1" className="w-20" />
                        <span className="text-sm text-gray-600">× base price</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Generate Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Receipt className="w-4 h-4 mr-2" />
                      Monthly Revenue Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Wallet className="w-4 h-4 mr-2" />
                      Payment Processing Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Financial Analytics Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Wallet className="w-4 h-4 mr-2" />
                      Credits & Transactions Report
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Reports</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">June 2024 Revenue</p>
                      <p className="text-sm text-gray-600">Generated: 2024-06-15</p>
                      <Button size="sm" variant="link" className="p-0 h-auto">Download</Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Q2 Financial Summary</p>
                      <p className="text-sm text-gray-600">Generated: 2024-06-01</p>
                      <Button size="sm" variant="link" className="p-0 h-auto">Download</Button>
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

export default FinancialManagementTab;
