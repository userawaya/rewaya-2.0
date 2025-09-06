
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface PaymentValidationProps {
  paidAmount: string;
  estimatedCredits: number;
  onChange: (value: string) => void;
}

export const PaymentValidation: React.FC<PaymentValidationProps> = ({
  paidAmount,
  estimatedCredits,
  onChange
}) => {
  const getPaymentValidationStatus = () => {
    if (!paidAmount || !estimatedCredits) return null;
    
    const paid = Number(paidAmount);
    
    if (paid === estimatedCredits) {
      return { type: "success", message: "Payment amount matches estimated credits" };
    } else if (paid > estimatedCredits) {
      return { type: "error", message: `Overpayment: ₦${(paid - estimatedCredits).toFixed(2)} above estimated credits` };
    } else {
      return { type: "error", message: `Underpayment: ₦${(estimatedCredits - paid).toFixed(2)} below estimated credits` };
    }
  };

  const paymentStatus = getPaymentValidationStatus();

  return (
    <div>
      <Label className="block text-sm font-medium mb-2">Amount Paid (optional)</Label>
      <Input
        type="number"
        placeholder="Amount Paid"
        value={paidAmount}
        onChange={(e) => onChange(e.target.value)}
        min="0"
        step="0.01"
      />
      {paymentStatus && (
        <div className={`mt-2 p-3 rounded-lg flex items-center space-x-2 ${
          paymentStatus.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {paymentStatus.type === "error" && <AlertTriangle className="w-4 h-4" />}
          <span className="text-sm font-medium">{paymentStatus.message}</span>
        </div>
      )}
    </div>
  );
};
