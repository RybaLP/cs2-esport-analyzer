// app/components/matchFilters.tsx
'use client';

import { Search, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface MatchFiltersProps {
  onFilterChange: (filters: { league: string; team: string }) => void;
  leagues: string[];
  teams: string[];
  loading?: boolean;
}

export default function MatchFilters({ onFilterChange, leagues, teams, loading }: MatchFiltersProps) {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleApply = () => {
    onFilterChange({ league: selectedLeague, team: selectedTeam });
  };

  const handleReset = () => {
    setSelectedLeague('');
    setSelectedTeam('');
    onFilterChange({ league: '', team: '' });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* League dropdown */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">League</label>
          <div className="relative">
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              disabled={loading}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">All leagues</option>
              {leagues.map((league) => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Team dropdown */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">Team</label>
          <div className="relative">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              disabled={loading}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">All teams</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleApply}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl transition flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Apply
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 px-5 py-2.5 rounded-xl transition flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}