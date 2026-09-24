import type { ReactNode } from 'react';

type Common = {
    className: string;
    id: string;
    label: string;
    required?: boolean;
    hint?: string;
};

/** A labelled input on the module. Shared by every form surface. */
export function Field({
    className,
    id,
    label,
    value,
    onChange,
    type = 'text',
    required = false,
    autoComplete,
    inputMode,
    min,
    hint,
}: Common & {
    value: string;
    onChange: (v: string) => void;
    type?: string;
    autoComplete?: string;
    inputMode?: 'text' | 'numeric' | 'tel' | 'email';
    min?: string;
}) {
    return (
        <div className={`cell field ${className}`}>
            <label className="label" htmlFor={id}>
                {label} {required && <abbr title="obligatoriu">*</abbr>}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                autoComplete={autoComplete}
                inputMode={inputMode}
                min={min}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-describedby={hint ? `${id}-hint` : undefined}
            />
            {hint && (
                <p className="note" id={`${id}-hint`} style={{ marginTop: '0.45rem' }}>
                    {hint}
                </p>
            )}
        </div>
    );
}

export function TextArea({
    className,
    id,
    label,
    value,
    onChange,
    required = false,
    rows = 5,
}: Common & { value: string; onChange: (v: string) => void; rows?: number }) {
    return (
        <div className={`cell field ${className}`}>
            <label className="label" htmlFor={id}>
                {label} {required && <abbr title="obligatoriu">*</abbr>}
            </label>
            <textarea
                id={id}
                name={id}
                rows={rows}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export function Select({
    className,
    id,
    label,
    value,
    onChange,
    required = false,
    children,
}: Common & { value: string; onChange: (v: string) => void; children: ReactNode }) {
    return (
        <div className={`cell field ${className}`}>
            <label className="label" htmlFor={id}>
                {label} {required && <abbr title="obligatoriu">*</abbr>}
            </label>
            <select
                id={id}
                name={id}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {children}
            </select>
        </div>
    );
}
