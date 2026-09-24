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
    price: number | null;
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
    const clearAll = () => setSelected(Object.fromEntries(facets.map((f) => [f.key, []])));

    const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0);

    // The URL carries the filter state, so a filtered listing can be
    // shared and reopened. Replace, not push: a checkbox click should
    // not become a browser-history entry.
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams();
        Object.entries(selected).forEach(([key, values]) => {
            if (values.length > 0) params.set(key, values.join(','));
        });

        const query = params.toString();
        window.history.replaceState(
            null,
            '',
            query ? `${window.location.pathname}?${query}` : window.location.pathname,
        );
    }, [selected]);

    const shown = useMemo(() => {
        // Values narrow within a facet, facets stack across each other.
        const out = products.filter((p) =>
            Object.entries(selected).every(([key, values]) => {
                if (values.length === 0) return true;
                return (p.attributes[key] ?? []).some((v) => values.includes(v));
            }),
        );

        return [...out].sort((a, b) => {
            if (sort === 'price-asc') return (a.price ?? 0) - (b.price ?? 0);
            if (sort === 'name-asc') return collator.compare(a.name, b.name);
            if (sort === 'rank-desc') return b.rank - a.rank || (b.price ?? 0) - (a.price ?? 0);
            return (b.price ?? 0) - (a.price ?? 0);
        });
    }, [products, selected, sort]);

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

                            {activeCount > 0 && (
                                <button type="button" className="clear" onClick={clearAll}>
                                    Șterge filtrele ({activeCount})
                                </button>
                            )}

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
                                            width={500}
                                            height={500}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </span>
                                )}
                                <span className="unit-grade">{p.badge}</span>
                                <span className="unit-name">{p.name}</span>
                                {p.meta && <span className="label">{p.meta}</span>}
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
