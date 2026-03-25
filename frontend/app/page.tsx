import { Suspense } from 'react';
import MatchesPage from './components/matchesPage';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
          CS Esport Analyzer
        </h1>
        <p className="text-gray-400 mt-2">
          Live results and match overview
        </p>
      </header>

      <Suspense fallback={<div className="text-center py-20">Loading filters...</div>}>
        <MatchesPage />
      </Suspense>
    </main>
  );
}