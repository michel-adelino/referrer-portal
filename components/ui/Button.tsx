import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantStyles = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  secondary:
    "bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  outline:
    "border-2 border-card-border bg-transparent hover:bg-card focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  ghost: "hover:bg-accent-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
};

const sizeStyles = {
  sm: "h-9 px-3 text-sm rounded-sm",
  md: "h-11 px-5 text-base rounded",
  lg: "h-12 px-6 text-lg rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-heading font-semibold transition-all duration-200
          disabled:pointer-events-none disabled:opacity-50
          ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}
        `}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
