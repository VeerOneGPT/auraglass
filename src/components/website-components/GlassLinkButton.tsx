"use client";

import { forwardRef, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "neutral" | "success" | "warning";
  noise?: boolean;
  children: React.ReactNode;
}

const GlassLinkButton = forwardRef<HTMLAnchorElement, GlassLinkButtonProps>(
  ({ className, variant = "primary", size = "md", intent = "primary", noise = false, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-glass font-semibold transition-all duration-200 ease-out hover:text-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2",
          "active:translate-y-px disabled:opacity-50 disabled:pointer-events-none isolate",

          {
            "px-3 py-2 sm:py-1.5 text-responsive-sm touch-target": size === "sm",
            "px-4 py-2.5 sm:py-2 text-responsive-base touch-target": size === "md",
            "px-5 sm:px-6 py-3 text-responsive-lg touch-target": size === "lg",
          },

          {
            "text-white bg-gradient-to-r from-blue-500/80 to-purple-500/80 border border-white/20 backdrop-blur-glass-medium shadow-glass": variant === "primary",
            "hover:shadow-glass-strong sm:hover:-translate-y-0.5": variant === "primary",

            "glass-base text-white border border-white/14 backdrop-blur-glass-subtle": variant === "secondary",
            "hover:bg-white/10 hover:border-white/25": variant === "secondary",

            "bg-transparent text-white/88 border border-white/10": variant === "ghost",
            "hover:bg-white/5 hover:text-white hover:border-white/20": variant === "ghost",
          },

          variant !== "primary" && intent === "primary" && "bg-gradient-to-r from-cyan-400/15 to-purple-500/15",
          variant !== "primary" && intent === "success" && "bg-gradient-to-r from-emerald-400/10 to-cyan-400/10",
          variant !== "primary" && intent === "warning" && "bg-gradient-to-r from-amber-400/10 to-orange-500/10",

          className
        )}
        {...props}
      >
        {(variant === "primary" || variant === "secondary") && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: 'inherit',
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(147,51,234,0.25) 50%, rgba(255,255,255,0.16) 100%)',
              mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.8,
            }}
          />
        )}

        {variant === "primary" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{
              borderRadius: 'inherit',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.16), transparent 45%)',
            }}
          />
        )}

        <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-indigo-50">{children}</span>
      </a>
    );
  }
);

GlassLinkButton.displayName = "GlassLinkButton";

export { GlassLinkButton };
export type { GlassLinkButtonProps };
