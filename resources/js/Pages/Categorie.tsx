import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import Arrow from '@/Components/Arrow';
import FilterDropdown, { type Option } from '@/Components/FilterDropdown';
import SearchField from '@/Components/SearchField';
import SortDropdown from '@/Components/SortDropdown';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';
import { useFlip } from '@/Hooks/useFlip';

type Product = {
    slug: string;
    name: string;
    price: number | null;
    /** Set only when the product is a range, so the card reads "de la". */
    priceMax?: number | null;
    wasPrice?: number | null;
    thumb: string | null;
    href: string;
    badge: string;
    meta: string;
    inStock: boolean;
    rank: number;
    attributes: Record<string, string[]>;
};

type Facet = { key: string; label: string; options: Option[] };

type Props = {
    category: Category & { slug: string; count: number };
    products: Product[];
    facets: Facet[];
    sorts: { value: string; label: string }[];
    categories: Category[];
    company: Company;
};

const lei = new Intl.NumberFormat('ro-RO');
const collator = new Intl.Collator('ro');

/**
 * Romanian is written with diacritics and searched without them. Folding
 * both sides means "rasnita" finds "Râșniță" and "garantie" finds
 * "garanție" — the alternative is a search box that looks broken to
 * anyone typing on a non-Romanian keyboard.
 */
const fold = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

const readParam = (key: string): string => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get(key) ?? '';
};

const readUrl = (key: string): string[] => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get(key);
    return raw ? raw.split(',').filter(Boolean) : [];
};

export default function Categorie({
    category,
    products,
    facets,
    sorts,
    categories,
    company,
}: Props) {
    const [selected, setSelected] = useState<Record<string, string[]>>(() =>
        Object.fromEntries(facets.map((f) => [f.key, readUrl(f.key)])),
    );
    const [query, setQuery] = useState(() => readParam('q'));
    const [sort, setSort] = useState(sorts[0]?.value ?? 'price-desc');
    const [openPanel, setOpenPanel] = useState<string | null>(null);

    const toggle = (key: string) => (value: string) =>
        setSelected((prev) => {
            const current = prev[key] ?? [];
            return {
                ...prev,
                [key]: current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value],
            };
        });

    const clearFacet = (key: string) => () => setSelected((prev) => ({ ...prev, [key]: [] }));

    // "Clear filters" clears everything that narrowed the listing, the
    // query included — otherwise the button leaves results hidden and
    // reads as broken.
    const clearAll = () => {
        setSelected(Object.fromEntries(facets.map((f) => [f.key, []])));
        setQuery('');
    };

    const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0);
    const term = query.trim();
    // The query narrows the listing exactly as a facet value does, so it
    // counts as one of the applied filters.
    const appliedCount = activeCount + (term === '' ? 0 : 1);

    // The URL carries the filter state, so a filtered listing can be
    // shared and reopened. Replace, not push: a checkbox click should
    // not become a browser-history entry.
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams();
        Object.entries(selected).forEach(([key, values]) => {
            if (values.length > 0) params.set(key, values.join(','));
        });
        if (term !== '') params.set('q', term);

        const queryString = params.toString();
        window.history.replaceState(
            null,
            '',
            queryString
                ? `${window.location.pathname}?${queryString}`
                : window.location.pathname,
        );
    }, [selected, term]);

    const shown = useMemo(() => {
        // Every whitespace-separated word must match somewhere, so
        // "tab s11" narrows instead of widening the way OR would.
        const terms = fold(term).split(/\s+/).filter(Boolean);

        // Values narrow within a facet, facets stack across each other,
        // and the query narrows whatever survives them.
        const out = products.filter((p) => {
            const matchesFacets = Object.entries(selected).every(([key, values]) => {
                if (values.length === 0) return true;
                return (p.attributes[key] ?? []).some((v) => values.includes(v));
            });

            if (! matchesFacets) return false;
            if (terms.length === 0) return true;

            // Name, badge and the card's second line: what a visitor can
            // actually see on the card they are looking for.
            const haystack = fold([p.name, p.badge, p.meta].filter(Boolean).join(' '));

            return terms.every((t) => haystack.includes(t));
        });

        return [...out].sort((a, b) => {
            if (sort === 'price-asc') return (a.price ?? 0) - (b.price ?? 0);
            if (sort === 'name-asc') return collator.compare(a.name, b.name);
            if (sort === 'rank-desc') return b.rank - a.rank || (b.price ?? 0) - (a.price ?? 0);
            return (b.price ?? 0) - (a.price ?? 0);
        });
    }, [products, selected, term, sort]);

    const register = useFlip(`${JSON.stringify(selected)}|${sort}`);

    const chips = facets.flatMap((f) =>
        (selected[f.key] ?? []).map((value) => ({ key: f.key, value })),
    );

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

            <nav className="module rule-bottom" aria-label="Categorii">
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

            <div className="module rule-bottom">
                <div className="cell span-12">
                    <h1 className="section-title">{category.label}</h1>
                    <p className="note" style={{ marginTop: '0.4rem' }}>
                        {shown.length === products.length
                            ? `${products.length} produse`
                            : `${shown.length} din ${products.length} produse`}
                    </p>
                </div>
            </div>

            {products.length > 0 && (
                <>
                    <div className="module rule-bottom">
                        <div className="cell span-12 facet-bar">
                            {facets.map((f) => (
                                <FilterDropdown
                                    key={f.key}
                                    label={f.label}
                                    options={f.options}
                                    selected={selected[f.key] ?? []}
                                    onToggle={toggle(f.key)}
                                    onClear={clearFacet(f.key)}
                                    open={openPanel === f.key}
                                    onOpenChange={(o) => setOpenPanel(o ? f.key : null)}
                                />
                            ))}

                            <SearchField
                                value={query}
                                onChange={setQuery}
                                placeholder={`Caută în ${category.label}`}
                            />

                            <SortDropdown
                                label="Sortare"
                                options={sorts}
                                value={sort}
                                onChange={setSort}
                                open={openPanel === 'sortare'}
                                onOpenChange={(o) => setOpenPanel(o ? 'sortare' : null)}
                            />
                        </div>
                    </div>

                    {appliedCount > 0 && (
                        <div className="module rule-bottom">
                            <div className="cell span-12 chips-bar">
                                <ul className="chips" aria-label="Filtre active">
                                    {term !== '' && (
                                        <li>
                                            <button
                                                type="button"
                                                className="chip-active"
                                                onClick={() => setQuery('')}
                                            >
                                                „{term}”
                                                <span aria-hidden="true">×</span>
                                                <span className="sr-only">Elimină căutarea</span>
                                            </button>
                                        </li>
                                    )}

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

                                <button type="button" className="clear" onClick={clearAll}>
                                    Șterge filtrele ({appliedCount})
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            <p className="sr-only" role="status" aria-live="polite">
                {shown.length} produse afișate.
            </p>

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
                        <h2 className="section-title">
                            {term !== ''
                                ? `Niciun produs pentru „${term}”`
                                : 'Niciun produs cu aceste filtre'}
                        </h2>
                        <p className="note" style={{ marginTop: '0.75rem' }}>
                            {term !== '' && activeCount > 0
                                ? 'Încearcă alți termeni sau elimină unul dintre filtre.'
                                : term !== ''
                                  ? 'Încearcă alți termeni de căutare.'
                                  : 'Încearcă să elimini unul dintre filtrele selectate.'}
                        </p>
                        <div className="actions">
                            <button type="button" className="btn" onClick={clearAll}>
                                {term !== '' && activeCount === 0
                                    ? 'Golește căutarea'
                                    : 'Șterge filtrele'}
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
                                            width={500}
                                            height={500}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </span>
                                )}
                                {p.badge && <span className="unit-grade">{p.badge}</span>}
                                <span className="unit-name">{p.name}</span>
                                {p.meta && <span className="label">{p.meta}</span>}
                                <span className="unit-price tabular">
                                    {p.price !== null
                                        ? `${p.priceMax ? 'de la ' : ''}${lei.format(p.price)} lei`
                                        : '—'}
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
