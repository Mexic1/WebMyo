import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import Arrow from '@/Components/Arrow';
import FilterDropdown, { type Option } from '@/Components/FilterDropdown';
import SortDropdown from '@/Components/SortDropdown';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';
import { useFlip } from '@/Hooks/useFlip';

type Product = {
    slug: string;
    name: string;
    brand: string;
    model: string;
    grade: string;
    gradeStep: number;
    price: number | null;
    thumb: string | null;
    href: string;
    storages: string[];
    colours: string[];
    inStock: boolean;
};

type Counts = Record<string, number>;

type Props = {
    category: Category & { slug: string; count: number };
    products: Product[];
    facets: {
        brands: Counts;
        models: Counts;
        grades: Counts;
        storages: Counts;
        colours: Counts;
    };
    categories: Category[];
    company: Company;
};

type Sort = 'price-desc' | 'price-asc' | 'grade-desc';
type FacetKey = 'producator' | 'model' | 'memorie' | 'culoare' | 'stare';

const lei = new Intl.NumberFormat('ro-RO');

const SORTS: { value: Sort; label: string }[] = [
    { value: 'price-desc', label: 'Preț descrescător' },
    { value: 'price-asc', label: 'Preț crescător' },
    { value: 'grade-desc', label: 'Stare, de la cea mai bună' },
];

const toOptions = (counts: Counts): Option[] =>
    Object.entries(counts).map(([value, count]) => ({ value, count }));

const readUrl = (key: FacetKey): string[] => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get(key);
    return raw ? raw.split(',').filter(Boolean) : [];
};

export default function Categorie({ category, products, facets, categories, company }: Props) {
    const [selected, setSelected] = useState<Record<FacetKey, string[]>>({
        producator: readUrl('producator'),
        model: readUrl('model'),
        memorie: readUrl('memorie'),
        culoare: readUrl('culoare'),
        stare: readUrl('stare'),
    });
    const [sort, setSort] = useState<Sort>('price-desc');
    const [openPanel, setOpenPanel] = useState<FacetKey | 'sortare' | null>(null);

    const toggle = (key: FacetKey) => (value: string) =>
        setSelected((prev) => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...prev[key], value],
        }));

    const clearFacet = (key: FacetKey) => () =>
        setSelected((prev) => ({ ...prev, [key]: [] }));

    const clearAll = () =>
        setSelected({ producator: [], model: [], memorie: [], culoare: [], stare: [] });

    const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0);

    // The URL carries the filter state, so a filtered listing can be
    // shared, bookmarked and reopened. Replace rather than push: each
    // checkbox click should not become a browser-history entry.
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams();
        (Object.keys(selected) as FacetKey[]).forEach((key) => {
            if (selected[key].length > 0) params.set(key, selected[key].join(','));
        });

        const query = params.toString();
        window.history.replaceState(
            null,
            '',
            query ? `${window.location.pathname}?${query}` : window.location.pathname,
        );
    }, [selected]);

    const shown = useMemo(() => {
        const out = products.filter(
            (p) =>
                (selected.producator.length === 0 || selected.producator.includes(p.brand)) &&
                (selected.model.length === 0 || selected.model.includes(p.model)) &&
                (selected.stare.length === 0 || selected.stare.includes(p.grade)) &&
                (selected.memorie.length === 0 ||
                    p.storages.some((s) => selected.memorie.includes(s))) &&
                (selected.culoare.length === 0 ||
                    p.colours.some((c) => selected.culoare.includes(c))),
        );

        return [...out].sort((a, b) => {
            if (sort === 'price-asc') return (a.price ?? 0) - (b.price ?? 0);
            if (sort === 'grade-desc')
                return b.gradeStep - a.gradeStep || (b.price ?? 0) - (a.price ?? 0);
            return (b.price ?? 0) - (a.price ?? 0);
        });
    }, [products, selected, sort]);

    const register = useFlip(`${JSON.stringify(selected)}|${sort}`);

    const chips = (Object.keys(selected) as FacetKey[]).flatMap((key) =>
        selected[key].map((value) => ({ key, value })),
    );

    const facetProps = (key: FacetKey, label: string, counts: Counts) => ({
        label,
        options: toOptions(counts),
        selected: selected[key],
        onToggle: toggle(key),
        onClear: clearFacet(key),
        open: openPanel === key,
        onOpenChange: (o: boolean) => setOpenPanel(o ? key : null),
    });

    return (
        <>
            <Head title={category.label} />

            <div className="module rule-bottom">
                <div className="cell masthead">
                    <div className="mark-field">
                        <a href="/">
                            <img src="/brand/myo-logo.svg" alt="MYO" width={116} height={40} />
                        </a>
                    </div>
                </div>

                <nav className="cell span-9 crumbs" aria-label="Navigare">
                    <a href="/">Acasă</a>
                    <span aria-hidden="true">·</span>
                    <span aria-current="page">{category.label}</span>
                </nav>
            </div>

            {/* ------------------------------------------- category nav */}
            <nav className="module rule-bottom cat-nav" aria-label="Categorii">
                {categories.map((c) => (
                    <a
                        key={c.href}
                        className="cell cat-nav-item"
                        href={c.href}
                        aria-current={c.href === `/categorie/${category.slug}` ? 'page' : undefined}
                    >
                        {c.label}
                        <span className="tabular">{c.count}</span>
                    </a>
                ))}
            </nav>

            {/* ------------------------------------------- title + sort */}
            <div className="module rule-bottom">
                <div className="cell span-12">
                    <div className="section-head">
                        <div>
                            <h1 className="section-title">{category.label}</h1>
                            <p className="note" style={{ marginTop: '0.4rem' }}>
                                {shown.length === products.length
                                    ? `${products.length} produse`
                                    : `${shown.length} din ${products.length} produse`}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {products.length > 0 && (
                <>
                    {/* --------------------------------------- filter bar */}
                    <div className="module rule-bottom">
                        <div className="cell span-12 facet-bar">
                            <FilterDropdown {...facetProps('producator', 'Producător', facets.brands)} />
                            <FilterDropdown {...facetProps('model', 'Model', facets.models)} />
                            <FilterDropdown {...facetProps('memorie', 'Memorie', facets.storages)} />
                            <FilterDropdown {...facetProps('culoare', 'Culoare', facets.colours)} />
                            <FilterDropdown {...facetProps('stare', 'Stare', facets.grades)} />

                            {activeCount > 0 && (
                                <button type="button" className="clear" onClick={clearAll}>
                                    Șterge filtrele ({activeCount})
                                </button>
                            )}

                            <SortDropdown
                                label="Sortare"
                                options={SORTS}
                                value={sort}
                                onChange={setSort}
                                open={openPanel === 'sortare'}
                                onOpenChange={(o) => setOpenPanel(o ? 'sortare' : null)}
                            />
                        </div>
                    </div>

                    {chips.length > 0 && (
                        <div className="module rule-bottom">
                            <ul className="cell span-12 chips" aria-label="Filtre active">
                                {chips.map(({ key, value }) => (
                                    <li key={`${key}-${value}`}>
                                        <button
                                            type="button"
                                            className="chip-active"
                                            onClick={() => toggle(key)(value)}
                                        >
                                            {value}
                                            <span aria-hidden="true">×</span>
                                            <span className="sr-only">Elimină filtrul</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            <p className="sr-only" role="status" aria-live="polite">
                {shown.length} produse afișate.
            </p>

            {/* ------------------------------------------- listing */}
            <div className="module rule-strong-bottom">
                {products.length === 0 ? (
                    <div className="cell span-12 empty-state">
                        <h2 className="section-title">Încă nu am mutat această categorie</h2>
                        <p className="sub" style={{ marginTop: '1rem' }}>
                            Pe site-ul actual această categorie are {category.count} produse.
                            Migrarea catalogului este în lucru.
                        </p>
                        <div className="actions">
                            <a className="btn btn-primary" href="/categorie/telefoane">
                                Vezi telefoanele
                                <Arrow />
                            </a>
                        </div>
                    </div>
                ) : shown.length === 0 ? (
                    <div className="cell span-12 empty-state">
                        <h2 className="section-title">Niciun produs cu aceste filtre</h2>
                        <p className="note" style={{ marginTop: '0.75rem' }}>
                            Încearcă să elimini unul dintre filtrele selectate.
                        </p>
                        <div className="actions">
                            <button type="button" className="btn" onClick={clearAll}>
                                Șterge filtrele
                                <Arrow />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="units span-12">
                        {shown.map((p) => (
                            <a className="unit" key={p.slug} href={p.href} ref={register(p.slug)}>
                                {p.thumb && (
                                    <span className="unit-photo">
                                        <img
                                            src={p.thumb}
                                            alt=""
                                            width={600}
                                            height={600}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </span>
                                )}
                                <span className="unit-grade">{p.grade}</span>
                                <span className="unit-name">{p.name}</span>
                                {p.storages.length > 0 && (
                                    <span className="label">{p.storages.join(', ')}</span>
                                )}
                                <span className="unit-price tabular">
                                    {p.price !== null ? `${lei.format(p.price)} lei` : '—'}
                                </span>
                                {!p.inStock && <span className="note">Stoc epuizat</span>}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
