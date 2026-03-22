// types/match.ts
export interface Match {
  matchId: number;
  name?: string;         
  team1: string;
  team1Logo: string | null;
  team2: string;
  team2Logo: string | null;
  winner: string;
  league: string;
  score?: string;          
  date: string | null;
}