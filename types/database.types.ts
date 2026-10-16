/**
 * Tipos de la base de datos Supabase (esquema `public`).
 *
 * Escritos a mano para reflejar exactamente `supabase/schema.sql`, que es la
 * fuente de verdad del esquema. Se mantienen sincronizados manualmente: se
 * decidió no depender del CLI (`supabase gen types`), que exige credenciales y
 * se rompe con proyectos pausados por inactividad.
 *
 * Si alguna vez se regeneran con el CLI, revisar el resultado a mano:
 *
 *   supabase gen types typescript --project-id <ref> --schema public \
 *     > types/database.types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string;
          id: string;
          movie_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          movie_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          movie_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      genres: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          tmdb_id: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          tmdb_id: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          tmdb_id?: number;
        };
        Relationships: [];
      };
      movie_genres: {
        Row: {
          created_at: string;
          genre_id: string;
          movie_id: string;
        };
        Insert: {
          created_at?: string;
          genre_id: string;
          movie_id: string;
        };
        Update: {
          created_at?: string;
          genre_id?: string;
          movie_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "movie_genres_genre_id_fkey";
            columns: ["genre_id"];
            isOneToOne: false;
            referencedRelation: "genres";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "movie_genres_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
        ];
      };
      movie_sources: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          movie_id: string;
          name: string;
          quality: string;
          sort_order: number;
          type: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          movie_id: string;
          name: string;
          quality?: string;
          sort_order?: number;
          type: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          movie_id?: string;
          name?: string;
          quality?: string;
          sort_order?: number;
          type?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "movie_sources_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
        ];
      };
      movies: {
        Row: {
          backdrop_path: string | null;
          created_at: string;
          id: string;
          overview: string | null;
          poster_path: string | null;
          release_date: string | null;
          title: string;
          tmdb_id: number;
          updated_at: string;
          vote_average: number;
        };
        Insert: {
          backdrop_path?: string | null;
          created_at?: string;
          id?: string;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          title: string;
          tmdb_id: number;
          updated_at?: string;
          vote_average?: number;
        };
        Update: {
          backdrop_path?: string | null;
          created_at?: string;
          id?: string;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          title?: string;
          tmdb_id?: number;
          updated_at?: string;
          vote_average?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          role: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id: string;
          role?: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          role?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      watch_history: {
        Row: {
          duration_seconds: number;
          id: string;
          last_position_seconds: number;
          movie_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          duration_seconds?: number;
          id?: string;
          last_position_seconds?: number;
          movie_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          duration_seconds?: number;
          id?: string;
          last_position_seconds?: number;
          movie_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "watch_history_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "watch_history_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

/* ---------------------------------------------------------------------------
 * Helpers de conveniencia
 * ------------------------------------------------------------------------ */

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Movie = Tables<"movies">;
export type Genre = Tables<"genres">;
export type MovieSource = Tables<"movie_sources">;
export type Profile = Tables<"profiles">;
export type Favorite = Tables<"favorites">;
export type WatchHistory = Tables<"watch_history">;

/** Roles posibles de un perfil (definido con CHECK en `profiles.role`). */
export type UserRole = "user" | "admin";

/** Tipos de fuente de vídeo (definido con CHECK en `movie_sources.type`). */
export type MovieSourceType = "youtube" | "embed";

/** Calidades soportadas (definido con CHECK en `movie_sources.quality`). */
export type MovieSourceQuality = "4k" | "1080p" | "720p" | "480p" | "360p" | "auto";
