import { Calendar, Trophy, Users } from 'lucide-react';
import { Match } from '@/types/match';
import Image from 'next/image';

interface MatchCardProps {
  match: Match;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'TBD';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function MatchCard({ match }: MatchCardProps) {
  const isWinnerTeam1 = match.winner === match.team1;
  const isWinnerTeam2 = match.winner === match.team2;
  const [scoreTeam1, scoreTeam2] = match.score ? match.score.split(':') : [];

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all duration-200 shadow-lg hover:shadow-gray-900/50">
      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{match.league}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(match.date)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Team 1 */}
        <div className="flex flex-col items-center w-full sm:w-2/5 gap-2">
          {match.team1Logo ? (
            <div className="relative w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Image
                src={match.team1Logo}
                alt={match.team1}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-xs">No logo</span>
            </div>
          )}
          <span className={`font-semibold text-center ${isWinnerTeam1 ? 'text-green-400' : 'text-gray-200'}`}>
            {match.team1}
          </span>
        </div>

        {/* Score / VS */}
        <div className="flex flex-col items-center">
          {match.score ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{scoreTeam1}</span>
              <span className="text-xs font-mono text-gray-500">:</span>
              <span className="text-lg font-bold text-white">{scoreTeam2}</span>
            </div>
          ) : (
            <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
              VS
            </span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center w-full sm:w-2/5 gap-2">
          {match.team2Logo ? (
            <div className="relative w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Image
                src={match.team2Logo}
                alt={match.team2}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-xs">No logo</span>
            </div>
          )}
          <span className={`font-semibold text-center ${isWinnerTeam2 ? 'text-green-400' : 'text-gray-200'}`}>
            {match.team2}
          </span>
        </div>
      </div>

      {/* Winner */}
      {match.winner && (
        <div className="mt-5 pt-3 border-t border-gray-800 flex items-center justify-center gap-2 text-sm">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-300">Winner: </span>
          <span className="font-medium text-green-400">{match.winner}</span>
        </div>
      )}
    </div>
  );
}