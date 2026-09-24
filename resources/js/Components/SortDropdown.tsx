import { useEffect, useId, useRef } from 'react';
import { useDismiss } from '@/Hooks/useDismiss';

export type SortOption<T extends string> = { value: T; label: string };

/**
 * Single-select dropdown built from the same trigger and panel as the
 * facet filters, so the open menu matches them.
 *
 * A native <select> cannot do this: its option list is drawn by the
 * operating system and takes no styling. The trade is that this loses
 * the platform picker on mobile, so it implements the listbox keyboard
 * contract itself — arrows to move, Enter to choose, Escape to close.
 */
export default function SortDropdown<T extends string>({
    label,
    options,
    value,
    onChange,
    open,
    onOpenChange,
}: {
    label: string;
    options: SortOption<T>[];
    value: T;
    onChange: (value: T) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const root = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const items = useRef<(HTMLButtonElement | null)[]>([]);
    const panelId = useId();

    useDismiss(open, root, () => onOpenChange(false));

    const current = options.findIndex((o) => o.value === value);

    useEffect(() => {
        if (open) items.current[Math.max(current, 0)]?.focus();
    }, [open, current]);

    const choose = (next: T) => {
        onChange(next);
        onOpenChange(false);
        trigger.current?.focus();
    };

    const onItemKey = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const next =
                e.key === 'ArrowDown'
                    ? (index + 1) % options.length
                    : (index - 1 + options.length) % options.length;
            items.current[next]?.focus();
        }

        if (e.key === 'Home' || e.key === 'End') {
            e.preventDefault();
            items.current[e.key === 'Home' ? 0 : options.length - 1]?.focus();
        }

        if (e.key === 'Tab') onOpenChange(false);
    };

    const selected = options.find((o) => o.value === value);

    return (
        <div className="dropdown sort" ref={root}>
            <button
                type="button"
                ref={trigger}
                className="dropdown-trigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={`${label}: ${selected?.label ?? ''}`}
                onClick={() => onOpenChange(!open)}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' && !open) {
                        e.preventDefault();
                        onOpenChange(true);
                    }
                }}
            >
                <span className="sort-value">{selected?.label}</span>
                <svg
                    className="dropdown-caret"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </button>

            {open && (
                <div className="dropdown-panel dropdown-panel-right" id={panelId}>
                    <ul className="facet-list" role="listbox" aria-label={label}>
                        {options.map((o, i) => (
                            <li key={o.value} role="option" aria-selected={o.value === value}>
                                <button
                                    type="button"
                                    ref={(el) => {
                                        items.current[i] = el;
                                    }}
                                    className="facet-option"
                                    aria-pressed={o.value === value}
                                    onClick={() => choose(o.value)}
                                    onKeyDown={(e) => onItemKey(e, i)}
                                >
                                    <span className="facet-box" aria-hidden="true" />
                                    <span className="facet-name">{o.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
