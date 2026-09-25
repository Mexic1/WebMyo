import { useId } from 'react';

/**
 * Free-text search over a category listing.
 *
 * Sits between the facets and the sort control and behaves like them:
 * it applies as you type, with no submit. There is no button because
 * there is nothing to submit to — the listing is already in the page.
 *
 * It announces nothing itself. The listing owns the one live region on
 * the page; a second one here would talk over it on every keystroke.
 */
export default function SearchField({
    value,
    onChange,
    placeholder = 'Caută',
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    const id = useId();

    return (
        <div className="search-field">
            <svg
                className="search-icon"
                viewBox="0 0 16 16"
                width="14"
                height="14"
                aria-hidden="true"
                focusable="false"
            >
                <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line
                    x1="10.5"
                    y1="10.5"
                    x2="14.5"
                    y2="14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                />
            </svg>

            <label className="sr-only" htmlFor={id}>
                {placeholder}
            </label>

            <input
                id={id}
                className="search-input"
                type="search"
                value={value}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="search"
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    // Escape clears a half-typed query. The event is
                    // deliberately NOT stopped: tabbing here from an
                    // open dropdown leaves that panel open, and it
                    // listens for Escape on the document to close.
                    if (e.key === 'Escape' && value !== '') onChange('');
                }}
            />

            {value !== '' && (
                <button
                    type="button"
                    className="search-clear"
                    onClick={() => onChange('')}
                    aria-label="Golește căutarea"
                >
                    <span aria-hidden="true">×</span>
                </button>
            )}
        </div>
    );
}
