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
    priceMax?: number | null;
    wasPrice?: number | null;
    thumb: string | null;
    href: string;
    badge: string;
    meta: string;
    inStock: boolean;
    category: string;
    categorySlug: string;
    attributes: Record<string, string[]>;
};

type Facet = { key: string; label: string; options: Option[] };

type Props = {
    products: Product[];
    facets: Facet[];
    sorts: { value: string; label: string }[];
    categories: Category[];
    company: Company;
};

const lei = new Intl.NumberFormat('ro-RO');

export default function Catalog({ products, facets, sorts, categories, company }: Props) {
    const {
        selected,
        toggle,
        clearFacet,
        clearAll,
        query,
        setQuery,
        term,
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
        // The category name is searchable here in a way it is not on a
        // category page: "husa tab" should find accessories without the
        // visitor first knowing which category they are in.
        haystack: (p) => [p.name, p.badge, p.meta, p.category],
    });

    return (
        <>
            <Head title="Catalog" />

            <SiteHeader />

            <div className="module rule-bottom">

                <nav className="cell span-12 crumbs" aria-label="Navigare">
                    <a href="/">Acasă</a>
                    <span aria-hidden="true">·</span>
                    <span aria-current="page">Catalog</span>
                </nav>
            </div>

            <nav className="module rule-bottom" aria-label="Categorii">
                {categories.map((c) => (
                    <a key={c.href} className="cell cat-nav-item" href={c.href}>
                        {c.label}
                        <span className="tabular">{c.count}</span>
                    </a>
                ))}
            </nav>

            {/* Search leads the page, because finding is what the page is
                for. On a category listing it is one control among the
                filters; here it is the way in. */}
            <div className="module rule-bottom">
                <div className="cell span-12 catalog-head">
                    <h1 className="section-title">Catalog</h1>
                    <p className="note" style={{ marginTop: '0.4rem' }}>
                        {shown.length === products.length
                            ? `${products.length} produse, din toate categoriile`
                            : `${shown.length} din ${products.length} produse`}
                    </p>

                    <div className="catalog-search">
                        <SearchField
                            value={query}
                            onChange={setQuery}
                            placeholder="Caută în tot catalogul"
                        />
                    </div>
                </div>
            </div>

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

            <p className="sr-only" role="status" aria-live="polite">
                {shown.length} produse afișate.
            </p>

            <div className="module rule-strong-bottom">
                {shown.length === 0 ? (
                    <div className="cell span-12 empty-state">
                        <h2 className="section-title">
                            {term !== ''
                                ? `Niciun produs pentru „${term}”`
                                : 'Niciun produs cu aceste filtre'}
                        </h2>
                        <p className="note" style={{ marginTop: '0.75rem' }}>
                            Căutarea acoperă toate categoriile, așa că merită încercați alți
                            termeni înainte de a restrânge filtrele.
                        </p>
                        <div className="actions">
                            <button type="button" className="btn" onClick={clearAll}>
                                Șterge tot
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
                                {/* Which category a result came from is the
                                    thing a cross-catalog card has to say. */}
                                <span className="unit-grade">{p.category}</span>
                                <span className="unit-name">{p.name}</span>
                                {(p.badge || p.meta) && (
                                    <span className="label">
                                        {[p.badge, p.meta].filter(Boolean).join(' · ')}
                                    </span>
                                )}
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
