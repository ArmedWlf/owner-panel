import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-ink-900 text-white hover:bg-ink-700 focus-visible:outline-ink-900 disabled:bg-ink-300',
  accent:
    'bg-amber-500 text-ink-950 hover:bg-amber-600 focus-visible:outline-amber-600 disabled:bg-amber-100 disabled:text-ink-300',
  ghost:
    'bg-transparent text-ink-700 hover:bg-ink-50 focus-visible:outline-ink-300 disabled:text-ink-300',
  danger:
    'bg-white text-red-600 border border-red-200 hover:bg-red-50 focus-visible:outline-red-400',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  className = '',
  children,
  disabled,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-colors duration-150 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && Icon && <Icon size={16} />}
      {children}
    </Component>
  );
}
