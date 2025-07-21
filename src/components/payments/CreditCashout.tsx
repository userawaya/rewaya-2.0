
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, CreditCard, Smartphone, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToastNotifications } from '@/hooks/useToastNotifications';
import { creditsToNaira } from '@/hooks/useWasteRecords';

interface CreditCashoutProps {
  totalCredits: number;
  onCashoutSuccess?: () => void;
}

const CreditCashout: React.FC<CreditCashoutProps> = ({ totalCredits, onCashoutSuccess }) => {
  const { user } = useAuth();
  const { showSuccess, showError, showLoading } = useToastNotifications();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountDetails, setAccountDetails] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    phoneNumber: ''
  });
  const [processing, setProcessing] = useState(false);

  const maxCashout = Math.floor(creditsToNaira(totalCredits));
  const minimumCashout = 500; // ₦500 minimum

  const paymentMethods = [
    { value: 'bank_transfer', label: 'Bank Transfer', icon: CreditCard },
    { value: 'mobile_money', label: 'Mobile Money', icon: Smartphone },
  ];

  const nigeriaBanks = [
    'Access Bank', 'Guaranty Trust Bank', 'United Bank for Africa', 'Zenith Bank',
    'First Bank of Nigeria', 'Ecobank Nigeria', 'Fidelity Bank', 'Union Bank',
    'Sterling Bank', 'Stanbic IBTC Bank', 'Polaris Bank', 'Wema Bank'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cashoutAmount = parseInt(amount);
    
    if (cashoutAmount < minimumCashout) {
      showError(`Minimum cashout amount is ₦${minimumCashout}`);
      return;
    }
    
    if (cashoutAmount > maxCashout) {
      showError(`Insufficient credits. Maximum available: ₦${maxCashout}`);
      return;
    }

    if (!paymentMethod) {
      showError('Please select a payment method');
      return;
    }

    try {
      setProcessing(true);
      const loadingToast = showLoading('Processing cashout request...');

      // Simulate API call to payment processor
      await new Promise(resolve => setTimeout(resolve, 3000));

      // In a real implementation, you would:
      // 1. Send request to your backend
      // 2. Process payment through Flutterwave/Paystack
      // 3. Update user credits in database
      // 4. Send confirmation notifications

      showSuccess(`Cashout request submitted! ₦${cashoutAmount} will be sent to your ${paymentMethod.replace('_', ' ')}`);
      
      // Reset form
      setAmount('');
      setPaymentMethod('');
      setAccountDetails({
        bankName: '',
        accountNumber: '',
        accountName: '',
        phoneNumber: ''
      });

      onCashoutSuccess?.();
    } catch (error) {
      showError('Failed to process cashout request. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="w-5 h-5" />
          <span>Cash Out Credits</span>
        </CardTitle>
        <div className="text-sm text-gray-600">
          Available: <span className="font-bold text-green-600">{totalCredits} credits</span>
          {' '}(≈ ₦{maxCashout})
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min: ₦${minimumCashout}, Max: ₦${maxCashout}`}
              min={minimumCashout}
              max={maxCashout}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum cashout: ₦{minimumCashout}
            </p>
          </div>

          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    <div className="flex items-center space-x-2">
                      <method.icon className="w-4 h-4" />
                      <span>{method.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === 'bank_transfer' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="bank-name">Bank Name</Label>
                <Select 
                  value={accountDetails.bankName} 
                  onValueChange={(value) => setAccountDetails(prev => ({ ...prev, bankName: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigeriaBanks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  value={accountDetails.accountNumber}
                  onChange={(e) => setAccountDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                  placeholder="10-digit account number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required={paymentMethod === 'bank_transfer'}
                />
              </div>
              
              <div>
                <Label htmlFor="account-name">Account Name</Label>
                <Input
                  id="account-name"
                  value={accountDetails.accountName}
                  onChange={(e) => setAccountDetails(prev => ({ ...prev, accountName: e.target.value }))}
                  placeholder="Account holder name"
                  required={paymentMethod === 'bank_transfer'}
                />
              </div>
            </div>
          )}

          {paymentMethod === 'mobile_money' && (
            <div>
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                value={accountDetails.phoneNumber}
                onChange={(e) => setAccountDetails(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+234 8XX XXX XXXX"
                pattern="[+][0-9]{13}"
                required={paymentMethod === 'mobile_money'}
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be registered for mobile money services
              </p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-xs text-yellow-800">
                <p className="font-medium">Processing Time:</p>
                <p>Bank transfers: 1-3 business days</p>
                <p>Mobile money: Instant to 1 hour</p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={processing || !amount || !paymentMethod}
          >
            {processing ? 'Processing...' : `Cash Out ₦${amount || '0'}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreditCashout;
