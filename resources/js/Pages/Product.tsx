import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Arrow from '@/Components/Arrow';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';

type Variant = {
    colour: string | null;
    colourSlug: string | null;
    storage: string | null;
    price: number | null;
    inStock: boolean;
    sku: string | null;
};

type Product = {
    slug: string;
    name: string;
    grade: string;
    gradeStep: number;
    priceFrom: number | null;
    priceTo: number | null;
    image: string | null;
    thumb: string | null;
    dimensions: string | null;
    weightKg: number | null;
    variants: Variant[];
};

type GradeOption = {
    label: string;
    step: number;
    note: string;
    slug: string | null;
    price: number | null;
    available: boolean;
};

type Combo = {
    grade: string;
    colour: string | null;
    storage: string | null;
    slug: string;
    price: number | null;
    inStock: boolean;
    sku: string | null;
    image: string | null;
    thumb: string | null;
};

type Matrix = {
    colours: { slug: string; label: string }[];
    storages: string[];
    combos: Combo[];
};

type Specs = {
    display: string | null;
    chipset: string | null;
    ram: string | null;
    cameraMain: string | null;
    cameraFront: string | null;
    battery: string | null;
    gsmarena: string | null;
};

type Props = {
    product: Product;
    grade: { label: string; step: number; note: string } | null;
    gradeCount: number;
    gradeOptions: GradeOption[];
    specs: Specs | null;
    matrix: Matrix;
    initial: { colour: string | null; storage: string | null };
    categories: Category[];
    company: Company;
};

const lei = new Intl.NumberFormat('ro-RO');

const uniqueImages = (combos: Combo[], current: string | null) =>
    Array.from(new Set(combos.map((c) => c.image).filter((x): x is string => !!x && x !== current)));

export default function Product({
    product,
    grade,
    gradeCount,
    gradeOptions,
    specs,
    matrix,
    initial,
    categories,
    company,
}: Props) {
    const gradeLabel = product.grade;
    const combos = matrix.combos;

    const find = (g: string, c: string | null, st: string | null) =>
        combos.find(
            (x) =>
                x.grade === g &&
                (c === null || x.colour === c) &&
                (st === null || x.storage === st),
        ) ?? null;

    // Open on what the visitor carried over from the previous gradeLabel, when
    // this gradeLabel can honour it; otherwise the first combination it has.
    const opening = useMemo(() => {
        const wanted = find(gradeLabel, initial.colour, initial.storage);
        if (wanted) return wanted;

        const byColour = initial.colour ? find(gradeLabel, initial.colour, null) : null;
        if (byColour) return byColour;

        const byStorage = initial.storage ? find(gradeLabel, null, initial.storage) : null;
        if (byStorage) return byStorage;

        return find(gradeLabel, null, null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gradeLabel, initial.colour, initial.storage]);

    const [colour, setColour] = useState<string | null>(opening?.colour ?? null);
    const [storage, setStorage] = useState<string | null>(opening?.storage ?? null);

    const selected = find(gradeLabel, colour, storage) ?? opening;

    /**
     * Last-clicked-wins. The option the visitor just pressed is always
     * honoured; whatever else has to move, moves. Clicking is never a
     * dead end, so nothing needs to be disabled to protect the state.
     */
    const choose = (next: { colour?: string | null; storage?: string | null }) => {
        const c = next.colour !== undefined ? next.colour : colour;
        const st = next.storage !== undefined ? next.storage : storage;

        // 1. The pair exists in this gradeLabel.
        if (find(gradeLabel, c, st)) {
            setColour(c);
            setStorage(st);
            return;
        }

        // 2. It exists in this gradeLabel against a different value of the
        //    other axis: keep the click, move the other one.
        const here = next.colour !== undefined ? find(gradeLabel, c, null) : find(gradeLabel, null, st);
        if (here) {
            setColour(here.colour);
            setStorage(here.storage);
            return;
        }

        // 3. Only another gradeLabel has it: go there, carrying the pair.
        const elsewhere = (next.colour !== undefined ? find(gradeLabel, c, null) : null)
            ?? combos.find((x) => (c === null || x.colour === c) && (st === null || x.storage === st))
            ?? combos.find((x) =>
                next.colour !== undefined ? x.colour === c : x.storage === st);

        if (elsewhere) {
            router.visit(
                `/produs/${elsewhere.slug}?culoare=${elsewhere.colour ?? ''}&memorie=${encodeURIComponent(elsewhere.storage ?? '')}`,
                { preserveScroll: true },
            );
        }
    };

    /** Where a given option can be had, when this gradeLabel cannot supply it. */
    const otherGradeFor = (c: string | null, st: string | null) =>
        combos.find(
            (x) =>
                x.grade !== gradeLabel &&
                (c === null || x.colour === c) &&
                (st === null || x.storage === st),
        ) ?? null;

    const price = selected?.price ?? product.priceFrom;
    const inStock = selected?.inStock ?? false;
    const photo = selected?.image ?? product.image;
    const colourLabel = matrix.colours.find((c) => c.slug === colour)?.label ?? null;

    // Swapping colour swaps the picture, so the other colours' images are
    // warmed up rather than fetched on click.
    const preload = uniqueImages(matrix.combos, photo);

    return (
        <>
            <Head title={`${product.name}, ${product.grade}`}>
                {preload.map((src) => (
                    <link key={src} rel="prefetch" as="image" href={src} />
                ))}
            </Head>

            {/* ------------------------------------------------- header */}
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
                    <a href="/categorie/telefoane">Telefoane</a>
                    <span aria-hidden="true">·</span>
                    <span aria-current="page">{product.name}</span>
                </nav>
            </div>

            {/* ------------------------------------------------- the unit */}
            <div className="module rule-strong-bottom">
                <div className="cell span-6 pdp-plate">
                    {photo ? (
                        <img
                            className="product-photo pdp-photo"
                            src={photo}
                            alt={`${product.name}${colourLabel ? `, ${colourLabel}` : ''}, stare ${product.grade}`}
                            fetchPriority="high"
                            decoding="async"
                        />
                    ) : null}
                </div>

                <main className="cell span-6 pdp-buy">
                    <h1 className="pdp-title">{product.name}</h1>

                    <p className="pdp-grade">
                        <span className="unit-grade">{product.grade}</span>
                        <span className="note">
                            Treapta {product.gradeStep} din {gradeCount} pe scara de stare
                        </span>
                    </p>

                    <p className="pdp-price tabular">
                        {price !== null ? `${lei.format(price)} lei` : 'Preț indisponibil'}
                    </p>
                    <p className="finance-note">Rate prin LeanPay și TBI</p>

                    {matrix.colours.length > 0 && (
                        <fieldset className="chooser">
                            <legend className="label">Culoare</legend>
                            <div className="chooser-options">
                                {matrix.colours.map((c) => {
                                    const here = find(gradeLabel, c.slug, null) !== null;
                                    const other = here ? null : otherGradeFor(c.slug, null);

                                    return (
                                        <button
                                            key={c.slug}
                                            type="button"
                                            className="chip"
                                            aria-pressed={colour === c.slug}
                                            onClick={() => choose({ colour: c.slug })}
                                        >
                                            {c.label}
                                            {other && (
                                                <span className="chip-note">doar {other.grade}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>
                    )}

                    {matrix.storages.length > 0 && (
                        <fieldset className="chooser">
                            <legend className="label">Memorie</legend>
                            <div className="chooser-options">
                                {matrix.storages.map((st) => {
                                    const here = find(gradeLabel, null, st) !== null;
                                    const other = here ? null : otherGradeFor(null, st);

                                    return (
                                        <button
                                            key={st}
                                            type="button"
                                            className="chip tabular"
                                            aria-pressed={storage === st}
                                            onClick={() => choose({ storage: st })}
                                        >
                                            {st}
                                            {other && (
                                                <span className="chip-note">doar {other.grade}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>
                    )}

                    {gradeOptions.length > 0 && (
                        <fieldset className="chooser chooser-grade">
                            <legend className="label">Stare</legend>
                            <div className="chooser-options">
                                {gradeOptions.map((g) =>
                                    g.available && g.slug && g.label !== product.grade ? (
                                        <Link
                                            key={g.label}
                                            className="chip chip-link"
                                            href={`/produs/${g.slug}?culoare=${colour ?? ''}&memorie=${encodeURIComponent(storage ?? '')}`}
                                            preserveScroll
                                        >
                                            {g.label}
                                            {g.price !== null && (
                                                <span className="chip-price tabular">
                                                    {lei.format(g.price)} lei
                                                </span>
                                            )}
                                        </Link>
                                    ) : (
                                        <button
                                            key={g.label}
                                            type="button"
                                            className="chip"
                                            aria-pressed={g.label === product.grade}
                                            disabled={!g.available}
                                            aria-current={g.label === product.grade ? 'true' : undefined}
                                        >
                                            {g.label}
                                            {g.price !== null && (
                                                <span className="chip-price tabular">
                                                    {lei.format(g.price)} lei
                                                </span>
                                            )}
                                        </button>
                                    ),
                                )}
                            </div>
                            <p className="note" style={{ marginTop: '0.6rem' }}>
                                {grade?.note}{' '}
                                <a className="inline-link" href="/cum-notam">
                                    Cum notăm aparatele
                                </a>
                            </p>
                        </fieldset>
                    )}

                    <p className={inStock ? 'stock stock-in' : 'stock stock-out'} role="status">
                        {inStock ? 'În stoc' : 'Stoc epuizat'}
                    </p>

                    <div className="actions">
                        <a
                            className="btn btn-primary"
                            href="/cos"
                            aria-disabled={!inStock}
                            onClick={(e) => {
                                if (!inStock) e.preventDefault();
                            }}
                        >
                            Adaugă în coș
                            <Arrow />
                        </a>
                    </div>

                    <div className="trust-field">
                        <div className="trust-line">
                            <span>Retur</span>
                            <span className="tabular">{company.returnDays} zile</span>
                        </div>
                        <div className="trust-line">
                            <span>Garanție</span>
                            <span className="tabular">{company.warrantyMonths} luni</span>
                        </div>
                    </div>
                </main>
            </div>

            {/* ------------------------------------------------- specs */}
            <section className="module rule-strong-bottom" aria-label="Specificații">
                <div className="cell span-6">
                    <h2 className="section-title">Această unitate</h2>
                    <dl className="specs">
                        <div className="spec">
                            <dt>Model</dt>
                            <dd>{product.name}</dd>
                        </div>
                        <div className="spec">
                            <dt>Stare</dt>
                            <dd>{product.grade}</dd>
                        </div>
                        {colourLabel && (
                            <div className="spec">
                                <dt>Culoare</dt>
                                <dd>{colourLabel}</dd>
                            </div>
                        )}
                        {selected?.storage && (
                            <div className="spec">
                                <dt>Memorie</dt>
                                <dd className="tabular">{selected.storage}</dd>
                            </div>
                        )}
                        {product.dimensions && (
                            <div className="spec">
                                <dt>Dimensiuni</dt>
                                <dd className="tabular">{product.dimensions}</dd>
                            </div>
                        )}
                        {product.weightKg && (
                            <div className="spec">
                                <dt>Greutate</dt>
                                <dd className="tabular">{Math.round(product.weightKg * 1000)} g</dd>
                            </div>
                        )}
                        {selected?.sku && (
                            <div className="spec">
                                <dt>Cod produs</dt>
                                <dd className="tabular">{selected.sku}</dd>
                            </div>
                        )}
                        <div className="spec">
                            <dt>Garanție</dt>
                            <dd className="tabular">{company.warrantyMonths} luni</dd>
                        </div>
                    </dl>
                </div>

                <div className="cell span-6">
                    <h2 className="section-title">Hardware</h2>

                    {specs ? (
                        <>
                            <dl className="specs">
                                {specs.display && (
                                    <div className="spec">
                                        <dt>Ecran</dt>
                                        <dd className="tabular">{specs.display}</dd>
                                    </div>
                                )}
                                {specs.chipset && (
                                    <div className="spec">
                                        <dt>Procesor</dt>
                                        <dd>{specs.chipset}</dd>
                                    </div>
                                )}
                                {specs.ram && (
                                    <div className="spec">
                                        <dt>Memorie RAM</dt>
                                        <dd className="tabular">{specs.ram}</dd>
                                    </div>
                                )}
                                {specs.cameraMain && (
                                    <div className="spec">
                                        <dt>Cameră principală</dt>
                                        <dd className="tabular">{specs.cameraMain}</dd>
                                    </div>
                                )}
                                {specs.cameraFront && (
                                    <div className="spec">
                                        <dt>Cameră frontală</dt>
                                        <dd className="tabular">{specs.cameraFront}</dd>
                                    </div>
                                )}
                                {specs.battery && (
                                    <div className="spec">
                                        <dt>Baterie</dt>
                                        <dd className="tabular">{specs.battery}</dd>
                                    </div>
                                )}
                            </dl>

                            <p className="note" style={{ marginTop: '0.9rem', maxWidth: '46ch' }}>
                                Specificații de model, conform producătorului. Capacitatea bateriei
                                este cea de fabrică, nu starea actuală a acumulatorului.
                            </p>

                            {specs.gsmarena && (
                                <a
                                    className="spec-source"
                                    href={specs.gsmarena}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Specificații complete pe GSMArena
                                    <Arrow />
                                </a>
                            )}
                        </>
                    ) : (
                        <p className="note" style={{ marginTop: '1rem' }}>
                            Specificațiile de model pentru acest produs nu sunt încă disponibile.
                        </p>
                    )}
                </div>
            </section>

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
