export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          brand: string;
          model: string;
          category: string;
          part_number: string | null;
          compatible_printers: string | null;
          image_url: string;
          description: string;
          stock: number;
          inquiry_only: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          slug: string;
          brand: string;
          model: string;
          category: string;
          part_number?: string | null;
          compatible_printers?: string | null;
          image_url: string;
          description: string;
          stock?: number;
          inquiry_only?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          brand?: string;
          model?: string;
          category?: string;
          part_number?: string | null;
          compatible_printers?: string | null;
          image_url?: string;
          description?: string;
          stock?: number;
          inquiry_only?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_config: {
        Row: {
          id: number;
          password_hash: string;
          created_at: string;
        };
        Insert: {
          id: number;
          password_hash: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          password_hash?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          id: number;
          type: 'contact' | 'quote';
          name: string;
          phone: string;
          organization: string | null;
          subject: string | null;
          message: string | null;
          items_json: Json;
          created_at: string;
        };
        Insert: {
          id?: number;
          type: 'contact' | 'quote';
          name: string;
          phone: string;
          organization?: string | null;
          subject?: string | null;
          message?: string | null;
          items_json?: Json;
          created_at?: string;
        };
        Update: {
          id?: number;
          type?: 'contact' | 'quote';
          name?: string;
          phone?: string;
          organization?: string | null;
          subject?: string | null;
          message?: string | null;
          items_json?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
