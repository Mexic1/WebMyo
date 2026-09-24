import { useId, useRef } from 'react';
import { useDismiss } from '@/Hooks/useDismiss';

export type Option = { value: string; count: number };

/**
 * One facet as a dropdown button plus a panel of options.
 *
 * Instant application, no Apply button: clicking an option filters
 * immediately, which is what the verified same-market pattern does.
 * Only one facet is open at a time — a horizontal bar of panels that
 * can all open at once overlaps itself.
 */
export default function FilterDropdown({
    label,
    options,
    selected,
    onToggle,
    onClear,
    open,
    onOpenChange,
}: {
    label: string;
    options: Option[];
    selected: string[];
    onToggle: (value: string) => void;
    onClear: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const root = useRef<HTMLDivElement>(null);
    const panelId = useId();

    useDismiss(open, root, () => onOpenChange(false));

    if (options.length === 0) return null;

    return (
        <div className="dropdown" ref={root}>
            <button
                type="button"
                className="dropdown-trigger"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => onOpenChange(!open)}
            >
                <span>{label}</span>
                {selected.length > 0 && (
                    <span className="dropdown-badge tabular">{selected.length}</span>
                )}
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
                <div className="dropdown-panel" id={panelId}>
                    <ul className="facet-list">
                        {options.map((o) => (
                            <li key={o.value}>
                                <button
                                    type="button"
                                    className="facet-option"
                                    aria-pressed={selected.includes(o.value)}
                                    onClick={() => onToggle(o.value)}
                                >
                                    <span className="facet-box" aria-hidden="true" />
                                    <span className="facet-name">{o.value}</span>
                                    <span className="facet-count tabular">{o.count}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {selected.length > 0 && (
                        <button type="button" className="clear dropdown-clear" onClick={onClear}>
                            Șterge {label.toLowerCase()}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
