import { Match } from '@/types/match';
import MatchCard from './matchCard';

interface MatchListProps {
  matches: Match[];
}

export default function MatchList({ matches }: MatchListProps) {
  if (!matches || !Array.isArray(matches)) {
    console.error('MatchList: matches is not an array', matches);
    return (
      <div className="text-center py-20 text-red-400">
        Error: Invalid data format
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No matches available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} />
      ))}
    </div>
  );
}