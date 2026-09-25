import { useEffect, useMemo, useState } from 'react';
import { useFlip } from '@/Hooks/useFlip';

export type ListingProduct = {
    slug: string;
    name: string;
    price: number | null;
    attributes: Record<string, string[]>;
};

export type ListingFacet = { key: string; label: string };

export type Sort = { value: string; label: string };

/**
 * Romanian is written with diacritics and searched without them. Folding
 * both sides means "rasnita" finds "Râșniță" and "garantie" finds
 * "garanție" — the alternative is a search box that looks broken to
 * anyone typing on a non-Romanian keyboard.
 */
export const fold = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase();

const readParam = (key: string): string => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get(key) ?? '';
};

const readList = (key: string): string[] => {
    if (typeof window === 'undefined') return [];
    const raw = new URLSearchParams(window.location.search).get(key);
    return raw ? raw.split(',').filter(Boolean) : [];
};

/**
 * The behaviour every product listing shares: facet selection, free-text
 * search, sorting, and the URL that carries all three.
 *
 * The category pages and the catalog-wide page differ in what they show
 * — different facets, different default sort, different text to search —
 * but not in how any of it works. Keeping that here means a fix lands
 * once instead of twice, which is how the two drift apart.
 */
export function useProductListing<T extends ListingProduct>({
    products,
    facets,
    sorts,
    haystack,
}: {
    products: T[];
    facets: ListingFacet[];
    sorts: Sort[];
    /** The text free-text search matches against, per product. */
    haystack: (product: T) => (string | null | undefined)[];
}) {
    const [selected, setSelected] = useState<Record<string, string[]>>(() =>
        Object.fromEntries(facets.map((f) => [f.key, readList(f.key)])),
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

    // Clearing removes everything that narrowed the listing, the query
    // included — otherwise the button leaves results hidden and reads
    // as broken.
    const clearAll = () => {
        setSelected(Object.fromEntries(facets.map((f) => [f.key, []])));
        setQuery('');
    };

    const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0);
    // A query of only whitespace is not a query. One trimmed value
    // decides the URL, the chip, the empty state and the count.
    const term = query.trim();
    const appliedCount = activeCount + (term === '' ? 0 : 1);

    // The URL carries the state, so a narrowed listing can be shared and
    // reopened. Replace, not push: a checkbox click should not become a
    // browser-history entry.
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
            queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname,
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

            if (!matchesFacets) return false;
            if (terms.length === 0) return true;

            const text = fold(haystack(p).filter(Boolean).join(' '));

            return terms.every((t) => text.includes(t));
        });

        // A product with no price is not the cheapest one. Treating a
        // null as 0 would float it to the top of "preț crescător" and
        // show a dash where the lowest price should be, so it sorts to
        // the end whichever direction is asked for.
        const byPrice = (x: T, y: T, dir: 1 | -1) => {
            if (x.price === null && y.price === null) return 0;
            if (x.price === null) return 1;
            if (y.price === null) return -1;
            return (x.price - y.price) * dir;
        };

        return [...out].sort((a, b) => {
            if (sort === 'price-asc') return byPrice(a, b, 1);
            if (sort === 'name-asc') return collator.compare(a.name, b.name);
            if (sort === 'rank-desc') {
                const rank = (p: T) => (p as { rank?: number }).rank ?? 0;
                return rank(b) - rank(a) || byPrice(a, b, -1);
            }
            return byPrice(a, b, -1);
        });
        // `haystack` is a fresh closure each render; the values it reads
        // are already in the dependency list.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, selected, term, sort]);

    // FLIP animates a re-sort. Typing removes cards rather than moving
    // them, and re-keying per character would measure every card on
    // every keystroke, so the query is deliberately not part of the key.
    const register = useFlip(`${JSON.stringify(selected)}|${sort}`);

    const chips = facets.flatMap((f) =>
        (selected[f.key] ?? []).map((value) => ({ key: f.key, value })),
    );

    return {
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
    };
}

const collator = new Intl.Collator('ro');
