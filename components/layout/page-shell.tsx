import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BackgroundVariant = "plain" | "soft" | "hero" | "mesh";

const backgroundMap: Record<BackgroundVariant, ReactNode> = {
    plain: null,
    soft: (
        <>
            <span className='absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl' />
            <span className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl' />
        </>
    ),
    hero: (
        <>
            <span className='absolute top-0 h-56 w-full bg-linear-to-b from-primary/30 via-primary/5 to-transparent' />
            <span className='absolute bottom-[-6rem] right-[-4rem] h-64 w-64 rounded-full bg-accent/20 blur-3xl' />
        </>
    ),
    mesh: (
        <>
            <span className='absolute -top-24 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl' />
            <span className='absolute top-1/3 right-10 h-56 w-56 rounded-full bg-secondary/25 blur-3xl' />
            <span className='absolute bottom-[-4rem] left-1/4 h-72 w-72 rounded-full bg-accent/20 blur-[120px]' />
        </>
    ),
};

export interface PageShellProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Controls the background overlays rendered behind the content.
     * Use `soft` for gentle glows, `hero` for a top gradient, and `mesh` for a richer look.
     */
    background?: BackgroundVariant;
    /**
     * Optional wrapper when you want extra control over the inner container.
     */
    containerClassName?: string;
    /**
     * Allows tweaking the default spacing applied to the content stack.
     */
    contentClassName?: string;
}

/**
 * Shared page wrapper that provides consistent spacing, responsive max-width,
 * and decorative background treatments across screens.
 */
export function PageShell({ children }: PageShellProps) {
    return <div className='px-5 py-5'>{children}</div>;
}
