import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`rounded-lg border border-card-border bg-card p-6 shadow-md ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`mb-4 font-heading text-lg font-semibold text-foreground ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);
