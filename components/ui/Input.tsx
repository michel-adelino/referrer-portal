import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id: idProp, ...props }, ref) => {
    const id = idProp ?? React.useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            w-full rounded border border-card-border bg-card px-4 py-3 text-foreground
            placeholder:text-muted-foreground
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20
            transition-colors duration-200
            disabled:cursor-not-allowed disabled:opacity-60
            ${error ? "border-warning focus:border-warning focus:ring-warning/20" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-warning">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
