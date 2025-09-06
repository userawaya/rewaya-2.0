
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { WasteType, FieldMarshal, Center } from "./types";
import { calculateCredits } from "./utils";

export const useMarshalDeliveryForm = () => {
  const [marshals, setMarshals] = useState<FieldMarshal[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [selectedMarshal, setSelectedMarshal] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [wasteType, setWasteType] = useState<WasteType>("PET");
  const [weight, setWeight] = useState("");
  const [qualityScore, setQualityScore] = useState("");
  const [estimatedCredits, setEstimatedCredits] = useState(0);
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load marshals and centers
  useEffect(() => {
    const loadData = async () => {
      const { data: marshalData } = await supabase
        .from("field_marshals")
        .select("id,full_name,nickname");
      setMarshals(marshalData || []);

      const { data: centerData } = await supabase
        .from("collation_centers")
        .select("id,name");
      setCenters(centerData || []);
    };

    loadData();
  }, []);

  // Calculate estimated credits when weight or quality changes
  useEffect(() => {
    if (weight && qualityScore) {
      const credits = calculateCredits(wasteType, Number(weight), Number(qualityScore));
      setEstimatedCredits(credits);
    } else {
      setEstimatedCredits(0);
    }
  }, [weight, qualityScore, wasteType]);

  const validatePayment = (): boolean => {
    if (!paidAmount || !estimatedCredits) return true;
    
    const paid = Number(paidAmount);
    
    if (paid !== estimatedCredits) {
      toast({
        title: "Payment Amount Mismatch",
        description: `Amount paid (₦${paid}) does not match estimated credits (₦${estimatedCredits}). The disbursed amount should be exactly ₦${estimatedCredits}.`,
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const resetForm = () => {
    setSelectedMarshal("");
    setSelectedCenter("");
    setWasteType("PET");
    setWeight("");
    setQualityScore("");
    setEstimatedCredits(0);
    setPaidAmount("");
    setPaymentMethod("");
    setNotes("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePayment()) return;
    
    setLoading(true);
    
    const { data: userData } = await supabase.auth.getUser();
    const processed_by = userData?.user?.id ?? null;

    const deliveryData = {
      marshal_id: selectedMarshal,
      center_id: selectedCenter,
      waste_type: wasteType,
      weight_kg: Number(weight),
      quality_score: qualityScore ? Number(qualityScore) : null,
      credits_earned: estimatedCredits,
      paid_amount: paidAmount ? Number(paidAmount) : null,
      payment_method: paymentMethod || null,
      notes,
      processed_by,
    };

    const { error } = await supabase
      .from("marshal_waste_deliveries")
      .insert([deliveryData]);
      
    setLoading(false);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ 
        title: "Success", 
        description: `Delivery logged successfully. ${estimatedCredits} credits calculated.`
      });
      resetForm();
    }
  };

  return {
    // Data
    marshals,
    centers,
    // Form state
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
    // Actions
    handleSubmit
  };
};
