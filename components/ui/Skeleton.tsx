export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton ${className}`} />
  );
}

export function PriceSkeleton() {
  return (
    <div className="price-ticker">
      <div className="skeleton" style={{ width: '200px', height: '20px' }} />
    </div>
  );
}

export function PositionSkeleton() {
  return (
    <div className="position-card">
      <div className="skeleton" style={{ width: '100%', height: '100px' }} />
    </div>
  );
}
