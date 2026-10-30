import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  iconBgColor?: string;
  iconColor?: string;
  onClick?: () => void;
  to?: string;
  active?: boolean;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  trend,
  iconBgColor = 'bg-primary-bg',
  iconColor = 'text-primary',
  onClick,
  to,
  active = false,
}: StatCardProps) {
  const isClickable = Boolean(onClick || to);

  const cardContent = (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable && onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      className={`rounded-3xl border bg-card p-5 shadow-sm shadow-slate-900/5 transition-all text-left w-full select-none ${
        active
          ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md bg-emerald-50/20'
          : 'border-border/80'
      } ${
        isClickable
          ? 'group cursor-pointer hover:-translate-y-1 hover:shadow-md hover:shadow-slate-900/10 hover:border-emerald-600/40'
          : 'hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/8'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">{title}</p>
            {isClickable && (
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            )}
          </div>
          <p className="mb-1 text-3xl font-extrabold tracking-tight text-foreground tabular-nums">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3 text-success" />
              ) : (
                <TrendingDown className="w-3 h-3 text-destructive" />
              )}
              <span className={trend.direction === 'up' ? 'text-success' : 'text-destructive'}>
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className={`${iconBgColor} ${iconColor} flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="block no-underline focus:outline-none">{cardContent}</Link>;
  }

  return cardContent;
}
