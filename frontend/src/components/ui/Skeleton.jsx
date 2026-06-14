import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';

export function Skeleton({ className }) {
  const { theme } = useTheme();
  return (
    <div className={clsx(
      'rounded-lg skeleton',
      theme === 'dark' ? 'bg-dark-elevated' : 'bg-light-secondary',
      className
    )} />
  );
}

export function MeetingCardSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-dark-border/30">
      <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="w-9 h-9 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-16 mb-1" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 p-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-40" />
      <div className="grid grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}