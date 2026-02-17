import * as React from "react";
import type { LeadStatus } from "@/lib/types";

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-accent-muted text-accent border border-accent/30",
  Booked: "bg-warning-muted text-warning border border-warning/30",
  Completed: "bg-success-muted text-success border border-success/30",
  Paid: "bg-success-muted text-success border border-success font-semibold",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: LeadStatus;
  variant?: "default" | "reward";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", status, variant = "default", children, ...props }, ref) => {
    const style = status ? statusStyles[status] : "bg-muted/20 text-muted-foreground border border-card-border";
    const rewardStyle = variant === "reward" ? "bg-success-muted text-success border-success font-semibold" : "";
    return (
      <span
        ref={ref}
        className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium ${status ? style : ""} ${rewardStyle} ${className}`}
        {...props}
      >
        {children ?? (status && status)}
      </span>
    );
  }
);
Badge.displayName = "Badge";
