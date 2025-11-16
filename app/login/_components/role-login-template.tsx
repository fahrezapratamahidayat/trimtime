"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubmitResult = {
    success: boolean;
    message?: string;
    redirect?: string;
};

type LoginField = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    description?: string;
    required?: boolean;
};

type SecondaryAction = {
    href: string;
    label: string;
    description?: string;
    icon?: LucideIcon;
    variant?: "outline" | "ghost" | "link";
};

export type RoleLoginTemplateProps = {
    icon: LucideIcon;
    badge: string;
    heading: string;
    description: string;
    accessNotes: string[];
    loginFields: LoginField[];
    submitLabel: string;
    submitIcon?: LucideIcon;
    secondaryActions?: SecondaryAction[];
    footerNote?: ReactNode;
    children?: ReactNode;
    mockCredentials?: Record<string, string>;
    successRedirect?: string;
    errorMessage?: string;
    onSubmit?: (
        values: Record<string, string>
    ) => Promise<SubmitResult> | SubmitResult;
};

export function RoleLoginTemplate({
    icon: Icon,
    badge,
    heading,
    description,
    accessNotes,
    loginFields,
    submitLabel,
    submitIcon: SubmitIcon,
    secondaryActions = [],
    footerNote,
    children,
    mockCredentials,
    successRedirect,
    errorMessage,
    onSubmit,
}: RoleLoginTemplateProps) {
    const router = useRouter();
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const values: Record<string, string> = {};
        loginFields.forEach(({ id }) => {
            const value = formData.get(id);
            values[id] = typeof value === "string" ? value.trim() : "";
        });

        setSubmitting(true);
        setFormError(null);

        try {
            let result: SubmitResult | void | undefined = undefined;

            if (onSubmit) {
                result = await onSubmit(values);
            } else if (mockCredentials && successRedirect) {
                const isValid = Object.entries(mockCredentials).every(
                    ([key, expected]) => {
                        return (values[key] ?? "") === expected;
                    }
                );
                result = isValid
                    ? { success: true, redirect: successRedirect }
                    : {
                          success: false,
                          message:
                              errorMessage ??
                              "Kredensial tidak sesuai. Silakan coba lagi.",
                      };
            }

            if (result?.success) {
                if (result.redirect) {
                    router.push(result.redirect);
                }
            } else if (result) {
                setFormError(
                    result.message ??
                        errorMessage ??
                        "Kredensial tidak sesuai. Silakan coba lagi."
                );
            } else if (!result && successRedirect) {
                router.push(successRedirect);
            }
        } catch (error) {
            console.error(error);
            setFormError(errorMessage ?? "Terjadi kesalahan. Coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageShell
            background='plain'
            containerClassName='pb-16'
            contentClassName='gap-10'
        >
            <div className='mx-auto w-full max-w-xl space-y-6'>
                <Button
                    asChild
                    variant='ghost'
                    size='sm'
                    className='w-fit gap-2 px-0 text-muted-foreground hover:text-foreground'
                >
                    <Link href='/login'>
                        <ArrowLeft className='h-4 w-4' />
                        Kembali ke pemilihan peran
                    </Link>
                </Button>

                <div className='space-y-6 rounded-2xl border border-border/60 bg-card/90 p-6 shadow-sm backdrop-blur'>
                    <header className='space-y-4'>
                        <div className='flex items-center gap-3'>
                            <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                                <Icon className='h-6 w-6' />
                            </span>
                            <div className='space-y-1'>
                                <h1 className='text-xl font-semibold leading-tight text-foreground'>
                                    {heading}
                                </h1>
                                <Badge
                                    variant='outline'
                                    className='border-primary/40 bg-primary/10 text-xs font-medium uppercase tracking-wide text-primary'
                                >
                                    {badge}
                                </Badge>
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            {description}
                        </p>
                        <div className='space-y-2'>
                            <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                Alur akses
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                {accessNotes.map((note) => (
                                    <Badge
                                        key={note}
                                        variant='secondary'
                                        className='border border-border/60 bg-background text-[11px] font-medium uppercase tracking-wide text-muted-foreground'
                                    >
                                        {note}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </header>

                    <form className='space-y-5' onSubmit={handleSubmit}>
                        <div className='space-y-4'>
                            {loginFields.map(
                                ({
                                    id,
                                    label,
                                    type = "text",
                                    placeholder,
                                    autoComplete,
                                    description: fieldDescription,
                                    required,
                                }) => (
                                    <div key={id} className='space-y-2'>
                                        <label
                                            htmlFor={id}
                                            className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'
                                        >
                                            {label}
                                        </label>
                                        <Input
                                            id={id}
                                            name={id}
                                            type={type}
                                            placeholder={placeholder}
                                            autoComplete={autoComplete}
                                            required={required}
                                            className='rounded-xl border-border'
                                            defaultValue={
                                                mockCredentials?.[id] ?? ""
                                            }
                                        />
                                        {fieldDescription ? (
                                            <p className='text-xs text-muted-foreground'>
                                                {fieldDescription}
                                            </p>
                                        ) : null}
                                    </div>
                                )
                            )}
                        </div>

                        {formError ? (
                            <p className='rounded-lg bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive'>
                                {formError}
                            </p>
                        ) : null}

                        <Button
                            type='submit'
                            className='w-full justify-center gap-2'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    Memproses
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                </>
                            ) : (
                                <>
                                    {submitLabel}
                                    {SubmitIcon ? (
                                        <SubmitIcon className='h-4 w-4' />
                                    ) : (
                                        <ArrowRight className='h-4 w-4' />
                                    )}
                                </>
                            )}
                        </Button>
                    </form>

                    {children}

                    {footerNote ? (
                        <div className='text-xs text-muted-foreground'>
                            {footerNote}
                        </div>
                    ) : null}
                </div>
            </div>
        </PageShell>
    );
}
