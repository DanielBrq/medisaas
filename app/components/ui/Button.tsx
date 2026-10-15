'use client'

import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow active:scale-[0.99]",
    secondary: "bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/60 active:scale-[0.99]",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-sm active:scale-[0.99]",
    outline: "text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 active:scale-[0.99]",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "py-1.5 px-3 text-xs rounded-lg font-medium",
    md: "py-2 px-4 text-sm rounded-xl font-medium",
    lg: "py-2.5 px-5 text-sm rounded-xl font-semibold",
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

    return (
        <button
            disabled={disabled || loading}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
}
