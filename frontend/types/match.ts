// types/match.ts
export interface Match {
  id: number;
  name?: string;         
  team1: string;
  team1_logo: string | null;
  team2: string;
  team2_logo: string | null;
  winner: string;
  league: string;
  score?: string;          
  date: string | null;
}