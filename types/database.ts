export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      experiences: {
        Row: {
          company: string | null;
          created_at: string;
          description: string | null;
          end_date: string | null;
          id: string;
          is_current: boolean;
          location: string | null;
          profile_id: string;
          sort_order: number;
          start_date: string | null;
          title: string;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          is_current?: boolean;
          location?: string | null;
          profile_id: string;
          sort_order?: number;
          start_date?: string | null;
          title: string;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          is_current?: boolean;
          location?: string | null;
          profile_id?: string;
          sort_order?: number;
          start_date?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "experiences_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profile_views: {
        Row: {
          id: number;
          profile_id: string;
          referrer: string | null;
          time_bucket: string;
          user_agent: string | null;
          viewed_at: string;
          visitor_hash: string;
        };
        Insert: {
          id?: never;
          profile_id: string;
          referrer?: string | null;
          time_bucket: string;
          user_agent?: string | null;
          viewed_at?: string;
          visitor_hash: string;
        };
        Update: {
          id?: never;
          profile_id?: string;
          referrer?: string | null;
          time_bucket?: string;
          user_agent?: string | null;
          viewed_at?: string;
          visitor_hash?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_views_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          accent_color: string;
          avatar_path: string | null;
          avatar_shape: string;
          bio: string | null;
          company_name: string | null;
          cover_path: string | null;
          created_at: string;
          display_name: string;
          email_public: string | null;
          email_public_type: string;
          email_home: string | null;
          email_office: string | null;
          id: string;
          is_published: boolean;
          job_title: string | null;
          phone_public: string | null;
          phone_public_type: string;
          phone_home: string | null;
          phone_office: string | null;
          profile_alignment: string;
          profile_style: string;
          slug: string;
          updated_at: string;
          username: string;
        };
        Insert: {
          address?: string | null;
          accent_color?: string;
          avatar_path?: string | null;
          avatar_shape?: string;
          bio?: string | null;
          company_name?: string | null;
          cover_path?: string | null;
          created_at?: string;
          display_name: string;
          email_public?: string | null;
          email_public_type?: string;
          email_home?: string | null;
          email_office?: string | null;
          id: string;
          is_published?: boolean;
          job_title?: string | null;
          phone_public?: string | null;
          phone_public_type?: string;
          phone_home?: string | null;
          phone_office?: string | null;
          profile_alignment?: string;
          profile_style?: string;
          slug: string;
          updated_at?: string;
          username: string;
        };
        Update: {
          address?: string | null;
          accent_color?: string;
          avatar_path?: string | null;
          avatar_shape?: string;
          bio?: string | null;
          company_name?: string | null;
          cover_path?: string | null;
          created_at?: string;
          display_name?: string;
          email_public?: string | null;
          email_public_type?: string;
          email_home?: string | null;
          email_office?: string | null;
          id?: string;
          is_published?: boolean;
          job_title?: string | null;
          phone_public?: string | null;
          phone_public_type?: string;
          phone_home?: string | null;
          phone_office?: string | null;
          profile_alignment?: string;
          profile_style?: string;
          slug?: string;
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
      social_links: {
        Row: {
          created_at: string;
          id: string;
          label: string | null;
          platform: string;
          profile_id: string;
          sort_order: number;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          label?: string | null;
          platform: string;
          profile_id: string;
          sort_order?: number;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          label?: string | null;
          platform?: string;
          profile_id?: string;
          sort_order?: number;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "social_links_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          role: "user" | "admin";
          user_id: string;
        };
        Insert: {
          role?: "user" | "admin";
          user_id: string;
        };
        Update: {
          role?: "user" | "admin";
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_unique_slug: {
        Args: {
          base_slug: string;
          user_id: string;
        };
        Returns: string;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      profile_views_daily: {
        Args: {
          target_profile_id: string;
          from_date: string;
        };
        Returns: {
          day: string;
          views: number;
        }[];
      };
      slug_available: {
        Args: {
          desired_slug: string;
          current_profile_id?: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
