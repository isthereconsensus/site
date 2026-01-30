import { getConsensusLevel, getConsensusLabel, getConsensusColor, getScoreBarColor } from '../utils/consensus';

interface ConsensusIndicatorProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ConsensusIndicator({ score, showLabel = true, size = 'md' }: ConsensusIndicatorProps) {
  const level = getConsensusLevel(score);
  const label = getConsensusLabel(level);
  const badgeColor = getConsensusColor(level);
  const barColor = getScoreBarColor(score);

  const sizeClasses = {
    sm: { bar: 'h-1.5', text: 'text-xs', badge: 'text-xs px-2 py-0.5' },
    md: { bar: 'h-2', text: 'text-sm', badge: 'text-xs px-2.5 py-1' },
    lg: { bar: 'h-3', text: 'text-base', badge: 'text-sm px-3 py-1.5' },
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 bg-stone-200 rounded-full overflow-hidden">
          <div
            className={`${classes.bar} ${barColor} rounded-full transition-all duration-500`}
            style={{ width: `${score * 10}%` }}
          />
        </div>
        <span className={`${classes.text} font-medium text-stone-700 min-w-[2rem] text-right`}>
          {score}/10
        </span>
      </div>
      {showLabel && (
        <span className={`${classes.badge} ${badgeColor} border rounded-full font-medium self-start`}>
          {label}
        </span>
      )}
    </div>
  );
}
