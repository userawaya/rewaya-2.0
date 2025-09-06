export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      collation_centers: {
        Row: {
          address: string
          capacity_kg: number | null
          controller_id: string | null
          created_at: string | null
          current_stock_kg: number | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          address: string
          capacity_kg?: number | null
          controller_id?: string | null
          created_at?: string | null
          current_stock_kg?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          capacity_kg?: number | null
          controller_id?: string | null
          created_at?: string | null
          current_stock_kg?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collation_centers_controller_id_fkey"
            columns: ["controller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credits: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          transaction_type: string
          user_id: string
          waste_record_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_type: string
          user_id: string
          waste_record_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_type?: string
          user_id?: string
          waste_record_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_waste_record_id_fkey"
            columns: ["waste_record_id"]
            isOneToOne: false
            referencedRelation: "waste_records"
            referencedColumns: ["id"]
          },
        ]
      }
      field_marshals: {
        Row: {
          created_at: string
          full_name: string
          id: string
          nickname: string | null
          notes: string | null
          phone: string | null
          registered_by: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          nickname?: string | null
          notes?: string | null
          phone?: string | null
          registered_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          nickname?: string | null
          notes?: string | null
          phone?: string | null
          registered_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      marshal_waste_deliveries: {
        Row: {
          center_id: string
          created_at: string
          credits_earned: number | null
          id: string
          marshal_id: string
          notes: string | null
          paid_amount: number | null
          payment_method: string | null
          processed_by: string | null
          quality_score: number | null
          updated_at: string
          waste_type: Database["public"]["Enums"]["waste_type"]
          weight_kg: number
        }
        Insert: {
          center_id: string
          created_at?: string
          credits_earned?: number | null
          id?: string
          marshal_id: string
          notes?: string | null
          paid_amount?: number | null
          payment_method?: string | null
          processed_by?: string | null
          quality_score?: number | null
          updated_at?: string
          waste_type: Database["public"]["Enums"]["waste_type"]
          weight_kg: number
        }
        Update: {
          center_id?: string
          created_at?: string
          credits_earned?: number | null
          id?: string
          marshal_id?: string
          notes?: string | null
          paid_amount?: number | null
          payment_method?: string | null
          processed_by?: string | null
          quality_score?: number | null
          updated_at?: string
          waste_type?: Database["public"]["Enums"]["waste_type"]
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "marshal_waste_deliveries_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "collation_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marshal_waste_deliveries_marshal_id_fkey"
            columns: ["marshal_id"]
            isOneToOne: false
            referencedRelation: "field_marshals"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      pickup_requests: {
        Row: {
          center_id: string
          created_at: string | null
          delivery_date: string | null
          driver_id: string | null
          id: string
          pickup_date: string | null
          price_per_kg: number
          quantity_kg: number
          recycler_id: string
          status: Database["public"]["Enums"]["pickup_status"] | null
          total_amount: number
          updated_at: string | null
          waste_type: Database["public"]["Enums"]["waste_type"]
        }
        Insert: {
          center_id: string
          created_at?: string | null
          delivery_date?: string | null
          driver_id?: string | null
          id?: string
          pickup_date?: string | null
          price_per_kg: number
          quantity_kg: number
          recycler_id: string
          status?: Database["public"]["Enums"]["pickup_status"] | null
          total_amount: number
          updated_at?: string | null
          waste_type: Database["public"]["Enums"]["waste_type"]
        }
        Update: {
          center_id?: string
          created_at?: string | null
          delivery_date?: string | null
          driver_id?: string | null
          id?: string
          pickup_date?: string | null
          price_per_kg?: number
          quantity_kg?: number
          recycler_id?: string
          status?: Database["public"]["Enums"]["pickup_status"] | null
          total_amount?: number
          updated_at?: string | null
          waste_type?: Database["public"]["Enums"]["waste_type"]
        }
        Relationships: [
          {
            foreignKeyName: "pickup_requests_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "collation_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pickup_requests_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pickup_requests_recycler_id_fkey"
            columns: ["recycler_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plastic_inventory: {
        Row: {
          available: boolean | null
          center_id: string
          created_at: string | null
          id: string
          price_per_kg: number
          quality_score: number
          updated_at: string | null
          waste_type: Database["public"]["Enums"]["waste_type"]
          weight_kg: number
        }
        Insert: {
          available?: boolean | null
          center_id: string
          created_at?: string | null
          id?: string
          price_per_kg: number
          quality_score: number
          updated_at?: string | null
          waste_type: Database["public"]["Enums"]["waste_type"]
          weight_kg: number
        }
        Update: {
          available?: boolean | null
          center_id?: string
          created_at?: string | null
          id?: string
          price_per_kg?: number
          quality_score?: number
          updated_at?: string | null
          waste_type?: Database["public"]["Enums"]["waste_type"]
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "plastic_inventory_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "collation_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          email_verified: boolean | null
          full_name: string
          id: string
          last_login: string | null
          location: string | null
          phone: string | null
          profile_completion: number | null
          role: Database["public"]["Enums"]["user_role"]
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email_verified?: boolean | null
          full_name: string
          id: string
          last_login?: string | null
          location?: string | null
          phone?: string | null
          profile_completion?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email_verified?: boolean | null
          full_name?: string
          id?: string
          last_login?: string | null
          location?: string | null
          phone?: string | null
          profile_completion?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      role_hierarchy: {
        Row: {
          can_manage_roles: Database["public"]["Enums"]["user_role"][] | null
          created_at: string
          hierarchy_level: number
          id: string
          permissions: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          can_manage_roles?: Database["public"]["Enums"]["user_role"][] | null
          created_at?: string
          hierarchy_level?: number
          id?: string
          permissions?: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          can_manage_roles?: Database["public"]["Enums"]["user_role"][] | null
          created_at?: string
          hierarchy_level?: number
          id?: string
          permissions?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          notification_email: boolean | null
          notification_sms: boolean | null
          theme: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          notification_email?: boolean | null
          notification_sms?: boolean | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          notification_email?: boolean | null
          notification_sms?: boolean | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waste_records: {
        Row: {
          center_id: string
          created_at: string | null
          credits_earned: number | null
          generator_id: string
          id: string
          photo_url: string | null
          quality_score: number | null
          status: Database["public"]["Enums"]["waste_status"] | null
          updated_at: string | null
          waste_type: Database["public"]["Enums"]["waste_type"]
          weight_kg: number
        }
        Insert: {
          center_id: string
          created_at?: string | null
          credits_earned?: number | null
          generator_id: string
          id?: string
          photo_url?: string | null
          quality_score?: number | null
          status?: Database["public"]["Enums"]["waste_status"] | null
          updated_at?: string | null
          waste_type: Database["public"]["Enums"]["waste_type"]
          weight_kg: number
        }
        Update: {
          center_id?: string
          created_at?: string | null
          credits_earned?: number | null
          generator_id?: string
          id?: string
          photo_url?: string | null
          quality_score?: number | null
          status?: Database["public"]["Enums"]["waste_status"] | null
          updated_at?: string | null
          waste_type?: Database["public"]["Enums"]["waste_type"]
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "waste_records_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "collation_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waste_records_generator_id_fkey"
            columns: ["generator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_profile_completion: {
        Args: { profile_id: string }
        Returns: number
      }
      calculate_waste_credits: {
        Args: {
          waste_type_param: Database["public"]["Enums"]["waste_type"]
          weight_kg_param: number
          quality_score_param: number
        }
        Returns: number
      }
      can_manage_role: {
        Args: {
          manager_role: Database["public"]["Enums"]["user_role"]
          target_role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_hierarchy_level: {
        Args: { user_id: string }
        Returns: number
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_permission: {
        Args: { user_id: string; permission: string }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_controller: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      pickup_status:
        | "pending"
        | "assigned"
        | "in_transit"
        | "completed"
        | "cancelled"
      user_role:
        | "generator"
        | "controller"
        | "driver"
        | "recycler"
        | "admin"
        | "super_admin"
        | "system_admin"
        | "operations_admin"
        | "finance_admin"
      waste_status:
        | "pending"
        | "sorted"
        | "picked_up"
        | "delivered"
        | "recycled"
      waste_type: "PET" | "HDPE" | "PVC" | "LDPE" | "PP" | "PS" | "OTHER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      pickup_status: [
        "pending",
        "assigned",
        "in_transit",
        "completed",
        "cancelled",
      ],
      user_role: [
        "generator",
        "controller",
        "driver",
        "recycler",
        "admin",
        "super_admin",
        "system_admin",
        "operations_admin",
        "finance_admin",
      ],
      waste_status: ["pending", "sorted", "picked_up", "delivered", "recycled"],
      waste_type: ["PET", "HDPE", "PVC", "LDPE", "PP", "PS", "OTHER"],
    },
  },
} as const
