import { createClient } from "@supabase/supabase-js";

// Database schema
export type Database = {
	public: {
		Tables: {
			users: {
				Row: {
					id: string;
					timezone: string;
					referral_code: string;
					referral_url: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					timezone?: string;
					referral_code: string;
					referral_url: string;
					created_at?: string;
				};
				Update: {
					timezone?: string;
					referral_code?: string;
					referral_url?: string;
				};
			};
			rewards: {
				Row: {
					user_id: string;
					points: number;
					referrals_count: number;
					referral_points_earned: number;
					next_reward_threshold: number;
					current_streak: number;
					last_claimed_at: string | null;
					reward_per_day: number;
				};
				Insert: {
					user_id: string;
					points?: number;
					referrals_count?: number;
					referral_points_earned?: number;
					next_reward_threshold?: number;
					current_streak?: number;
					last_claimed_at?: string | null;
					reward_per_day?: number;
				};
				Update: {
					points?: number;
					referrals_count?: number;
					referral_points_earned?: number;
					current_streak?: number;
					last_claimed_at?: string | null;
				};
			};
		};
	};
};

// Vite uses import.meta.env for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		"Missing Supabase Environment Variables. Check your .env file."
	);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
