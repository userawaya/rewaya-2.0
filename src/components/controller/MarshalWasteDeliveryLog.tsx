
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";
import { wasteTypes, WasteType } from "./marshal/types";
import { QualityScoreSelector } from "./marshal/QualityScoreSelector";
import { CreditsEstimateCard } from "./marshal/CreditsEstimateCard";
import { PaymentValidation } from "./marshal/PaymentValidation";
import { useMarshalDeliveryForm } from "./marshal/useMarshalDeliveryForm";

export default function MarshalWasteDeliveryLog() {
  const {
    marshals,
    centers,
    selectedMarshal,
    setSelectedMarshal,
    selectedCenter,
    setSelectedCenter,
    wasteType,
    setWasteType,
    weight,
    setWeight,
    qualityScore,
    setQualityScore,
    estimatedCredits,
    paidAmount,
    setPaidAmount,
    paymentMethod,
    setPaymentMethod,
    notes,
    setNotes,
    loading,
    handleSubmit
  } = useMarshalDeliveryForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="w-5 h-5" />
          <span>Log Field Marshal Waste Delivery</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label className="block text-sm font-medium mb-2">Marshal</Label>
            <Select value={selectedMarshal} onValueChange={setSelectedMarshal} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Marshal" />
              </SelectTrigger>
              <SelectContent>
                {marshals.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.full_name} {m.nickname && `(${m.nickname})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-2">Center</Label>
            <Select value={selectedCenter} onValueChange={setSelectedCenter} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Center" />
              </SelectTrigger>
              <SelectContent>
                {centers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-2">Waste Type</Label>
            <Select value={wasteType} onValueChange={(value) => setWasteType(value as WasteType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-2">Weight (kg)</Label>
            <Input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              min="0"
              step="0.1"
            />
          </div>

          <QualityScoreSelector
            value={qualityScore}
            onChange={setQualityScore}
            required
          />

          <CreditsEstimateCard estimatedCredits={estimatedCredits} />

          <PaymentValidation
            paidAmount={paidAmount}
            estimatedCredits={estimatedCredits}
            onChange={setPaidAmount}
          />

          <div>
            <Label className="block text-sm font-medium mb-2">Payment Method (optional)</Label>
            <Input
              placeholder="Payment Method (e.g. cash, POS, mobile)"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-2">Notes (optional)</Label>
            <Textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging..." : "Log Delivery"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
