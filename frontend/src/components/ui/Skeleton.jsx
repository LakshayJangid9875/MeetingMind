import clsx from 'clsx';

export function Skeleton({ className }) {
  return (
    <div className={clsx('animate-pulse bg-gray-800 rounded-lg', className)} />
  );
}

export function MeetingCardSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-800">
      <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/5" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-8 w-12 mb-1" />
    </div>
  );
}