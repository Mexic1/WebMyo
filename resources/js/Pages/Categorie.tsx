import { Head } from '@inertiajs/react';
import SiteHeader from '@/Components/SiteHeader';
import Arrow from '@/Components/Arrow';
import FilterDropdown, { type Option } from '@/Components/FilterDropdown';
import SearchField from '@/Components/SearchField';
import SortDropdown from '@/Components/SortDropdown';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';
import { useProductListing } from '@/Hooks/useProductListing';

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

export default function Categorie({
    category,
    products,
    facets,
    sorts,
    categories,
    company,
}: Props) {
    const {
        selected,
        toggle,
        clearFacet,
        clearAll,
        query,
        setQuery,
        term,
        activeCount,
        appliedCount,
        sort,
        setSort,
        openPanel,
        setOpenPanel,
        shown,
        chips,
        register,
    } = useProductListing({
        products,
        facets,
        sorts,
        // What a visitor can see on the card they are looking for.
        haystack: (p) => [p.name, p.badge, p.meta],
    });

    return (
        <>
            <Head title={category.label} />

            <SiteHeader />

            <div className="module rule-bottom">

                <nav className="cell span-12 crumbs" aria-label="Navigare">
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
