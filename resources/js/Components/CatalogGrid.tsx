import { useFlip } from '@/Hooks/useFlip';
import Arrow from '@/Components/Arrow';

export type Unit = {
    name: string;
    grade: string;
    price: number;
    storage?: string;
    image?: string;
    thumb?: string;
    href: string;
    /** False once every variant is sold; ranks a unit below the rest. */
    inStock: boolean;
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
    const shown = active ? units.filter((u) => u.grade === active) : units;
    const select = (grade: string | null) => onSelect(grade);
    const register = useFlip(active);

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
                        ref={register(u.href)}
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
