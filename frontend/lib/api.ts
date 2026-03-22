import { Match } from '@/types/match';

interface FetchMatchesParams {
  league?: string;
  team?: string;
  page?: number;
  size?: number;
}

export interface MatchesResponse {
  content: Match[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export async function fetchMatchesWithFilters({
  league,
  team,
  page = 0,
  size = 12,
}: FetchMatchesParams = {}): Promise<MatchesResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not configured');
  }

  const params = new URLSearchParams();
  if (league) params.append('league', league);
  if (team) params.append('team', team);
  params.append('page', String(page));
  params.append('size', String(size));

  const url = `${apiUrl}/matches?${params.toString()}`;
  console.log('Fetching:', url);

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const data = await res.json();
  return {
    content: data.content || [],
    totalPages: data.totalPages || 0,
    totalElements: data.totalElements || 0,
    size: data.size || size,
    number: data.number || page,
  };
}

export async function fetchUniqueTeamsAndLeagues(): Promise<{ teams: string[]; leagues: string[] }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error('API URL not configured');

  const res = await fetch(`${apiUrl}/matches/teams/leagues`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch teams/leagues');

  const data = await res.json();
  return {
    teams: data.teams || [],
    leagues: data.leagues || [],
  };
}
