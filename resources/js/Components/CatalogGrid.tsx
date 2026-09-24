import { useLayoutEffect, useRef } from 'react';
import Arrow from '@/Components/Arrow';

export type Unit = {
    name: string;
    grade: string;
    price: number;
    storage?: string;
    image?: string;
    thumb?: string;
    href: string;
};

type Grade = { label: string; step: number; note?: string };

const lei = new Intl.NumberFormat('ro-RO');

/**
 * The module re-sorts itself. Selecting a grade re-lays the grid and the
 * surviving cells TRAVEL to their new positions (FLIP) rather than
 * crossfading, so the grid is visibly the instrument doing the sorting.
 */
export default function CatalogGrid({
    units,
    grades,
    active,
    onSelect,
}: {
    units: Unit[];
    grades: Grade[];
    active: string | null;
    onSelect: (grade: string | null) => void;
}) {
    const cells = useRef(new Map<string, HTMLAnchorElement>());
    const before = useRef(new Map<string, DOMRect>());

    const shown = active ? units.filter((u) => u.grade === active) : units;
    const select = (grade: string | null) => onSelect(grade);

    // The snapshot is taken at the END of each layout effect, so the map
    // still holds pre-change geometry when the next change lands. That
    // keeps the travel working no matter which control triggered it —
    // the grid's own filter bar or the rail's condition ladder.
    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reduce && before.current.size > 0) {
            cells.current.forEach((el, key) => {
                const prev = before.current.get(key);
                if (!prev) return;

                const next = el.getBoundingClientRect();
                const dx = prev.left - next.left;
                const dy = prev.top - next.top;

                if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

                el.animate(
                    [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
                    { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
                );
            });
        }

        const snapshot = new Map<string, DOMRect>();
        cells.current.forEach((el, key) => snapshot.set(key, el.getBoundingClientRect()));
        before.current = snapshot;
    }, [active]);

    return (
        <>
            <div className="cell span-12 rule-bottom">
                <div className="section-head">
                    <h2 className="section-title">Catalog notat</h2>

                    <div className="filter-bar" role="group" aria-label="Filtrează după notă de stare">
                        <button
                            type="button"
                            className="filter"
                            aria-pressed={active === null}
                            onClick={() => select(null)}
                        >
                            Toate
                        </button>
                        {grades.map((g) => (
                            <button
                                key={g.label}
                                type="button"
                                className="filter"
                                aria-pressed={active === g.label}
                                onClick={() => select(active === g.label ? null : g.label)}
                            >
                                {g.label}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="sr-only" role="status" aria-live="polite">
                    {active
                        ? `${shown.length} produse cu nota ${active}.`
                        : `${shown.length} produse notate.`}
                </p>
            </div>

            <div className="units span-12">
                {shown.map((u) => (
                    <a
                        className="unit"
                        key={u.href}
                        href={u.href}
                        ref={(el) => {
                            if (el) cells.current.set(u.href, el);
                            else cells.current.delete(u.href);
                        }}
                    >
                        {u.image ? (
                            <span className="unit-photo">
                                <img
                                    src={u.thumb ?? u.image}
                                    alt=""
                                    width={600}
                                    height={600}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </span>
                        ) : null}
                        <span className="unit-grade">{u.grade}</span>
                        <span className="unit-name">{u.name}</span>
                        {u.storage ? <span className="label">{u.storage}</span> : null}
                        <span className="unit-price tabular">{lei.format(u.price)} lei</span>
                        <span className="label" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            Vezi unitatea <Arrow className="row-arrow" />
                        </span>
                    </a>
                ))}
            </div>
        </>
    );
}
