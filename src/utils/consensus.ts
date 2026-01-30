export type ConsensusLevel = 'none' | 'weak' | 'somewhat' | 'strong' | 'full';

export function getConsensusLevel(score: number): ConsensusLevel {
  if (score === 0) return 'none';
  if (score > 0 && score <= 3) return 'weak';
  if (score > 3 && score < 7) return 'somewhat';
  if (score >= 7 && score < 10) return 'strong';
  return 'full';
}

export function getConsensusLabel(level: ConsensusLevel): string {
  const labels: Record<ConsensusLevel, string> = {
    none: 'No Consensus',
    weak: 'Weak Consensus',
    somewhat: 'Moderate Consensus',
    strong: 'Strong Consensus',
    full: 'Full Consensus',
  };
  return labels[level];
}

export function getConsensusColor(level: ConsensusLevel): string {
  const colors: Record<ConsensusLevel, string> = {
    none: 'bg-red-100 text-red-800 border-red-200',
    weak: 'bg-orange-100 text-orange-800 border-orange-200',
    somewhat: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    strong: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    full: 'bg-teal-100 text-teal-800 border-teal-200',
  };
  return colors[level];
}

export function getScoreBarColor(score: number): string {
  if (score === 0) return 'bg-red-500';
  if (score <= 3) return 'bg-orange-500';
  if (score < 7) return 'bg-yellow-500';
  if (score < 10) return 'bg-emerald-500';
  return 'bg-teal-600';
}
