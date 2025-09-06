
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function FieldMarshalRegistrationForm({
  onRegistered,
}: { onRegistered?: () => void }) {
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data: userData } = await supabase.auth.getUser();
    const registered_by = userData?.user?.id ?? null;
    
    const { error } = await supabase
      .from("field_marshals")
      .insert([
        {
          full_name: fullName,
          nickname,
          phone,
          notes,
          registered_by,
        },
      ]);
      
    setLoading(false);
    
    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Field marshal registered successfully.",
      });
      setFullName("");
      setNickname("");
      setPhone("");
      setNotes("");
      onRegistered?.();
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 py-6">
        <h2 className="text-lg font-semibold mb-2">
          Register Field Marshal
        </h2>
        <form className="space-y-3" onSubmit={handleRegister}>
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            placeholder="Nickname (optional)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
