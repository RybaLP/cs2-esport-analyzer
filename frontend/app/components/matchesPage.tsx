'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchMatchesWithFilters, fetchUniqueTeamsAndLeagues, MatchesResponse } from '@/lib/api';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import MatchFilters from './matchFilters';
import MatchList from './matchList';

export default function MatchesPage() {
  const [matchesData, setMatchesData] = useState<MatchesResponse | null>(null);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ league: '', team: '' });
  const [page, setPage] = useState(0);
  const [leagues, setLeagues] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const pageSize = 12;

  // Pobierz listy lig i drużyn (jednorazowo)
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const { leagues: leagueList, teams: teamList } = await fetchUniqueTeamsAndLeagues();
        setLeagues(leagueList);
        setTeams(teamList);
      } catch (err) {
        console.error('Failed to load filter options', err);
      } finally {
        setOptionsLoading(false);
      }
    };
    loadOptions();
  }, []);

  // Pobierz mecze z aktualnymi filtrami i stroną
  const loadMatches = useCallback(async () => {
    setLoadingMatches(true);
    setError(null);
    try {
      const data = await fetchMatchesWithFilters({
        league: filters.league || undefined,
        team: filters.team || undefined,
        page,
        size: pageSize,
      });
      setMatchesData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoadingMatches(false);
    }
  }, [filters, page]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const handleFilterChange = (newFilters: { league: string; team: string }) => {
    setFilters(newFilters);
    setPage(0); 
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (optionsLoading) {
    // todo 
    // add loading animation
  }

  return (
    <>
      <MatchFilters
        onFilterChange={handleFilterChange}
        leagues={leagues}
        teams={teams}
      />

      {loadingMatches && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-400">Error: {error}</div>
      )}

      {!loadingMatches && !error && matchesData && (
        <>
          <MatchList matches={matchesData.content} />

          {matchesData.totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-400">
                Page {page + 1} of {matchesData.totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page + 1 >= matchesData.totalPages}
                className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}