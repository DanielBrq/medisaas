'use client'
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    label?: string;
    className?: string;
    invalid?: boolean;
    errorMessage?: string[];
    value?: string | number;
}

export function Input({ name, label, className, invalid, errorMessage, value, ...props }: InputProps) {
    const baseStyles = "w-full border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 bg-white shadow-xs transition duration-150 ease-in-out focus:outline-none focus:ring-2"

    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {label}
                </label>
            )}
            <input
                name={name}
                placeholder={label}
                {...props}
                value={value}
                className={`${baseStyles} ${className ?? ""} ${
                    invalid
                        ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-rose-500/20 focus:border-rose-500"
                        : "border-slate-200 hover:border-slate-300 focus:ring-teal-500/20 focus:border-teal-600"
                }`}
            />
            {invalid && errorMessage && errorMessage.length > 0 && (
                <div className="mt-1.5 space-y-0.5">
                    {errorMessage.map((error, index) => (
                        <p key={index} className="text-xs font-medium text-rose-600 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-rose-500"></span>
                            {error}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
