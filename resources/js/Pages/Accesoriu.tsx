import { Head } from '@inertiajs/react';
import SiteHeader from '@/Components/SiteHeader';
import Arrow from '@/Components/Arrow';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';

type Spec = { label: string; value: string };

type Accessory = {
    slug: string;
    name: string;
    price: number;
    /** Set only when the product is a range, so the price reads "de la". */
    priceMax?: number | null;
    /** A genuine former price, for products currently reduced. */
    wasPrice?: number | null;
    thumb: string | null;
    inStock?: boolean;
    tip: string;
    compatibilitate: string;
    /** Published attributes. Empty for accessories, which have none. */
    specs?: Spec[];
};

type Props = {
    accessory: Accessory;
    category: { label: string; href: string } | null;
    related: Accessory[];
    categories: Category[];
    company: Company;
};

const lei = new Intl.NumberFormat('ro-RO');

export default function Accesoriu({ accessory, category, related, categories, company }: Props) {
    const compatible = accessory.compatibilitate !== 'Altele';

    return (
        <>
            <Head title={accessory.name} />

            <SiteHeader />

            <div className="module rule-bottom">

                <nav className="cell span-12 crumbs" aria-label="Navigare">
                    <a href="/">Acasă</a>
                    <span aria-hidden="true">·</span>
                    <a href={category?.href ?? '/categorie/accesorii'}>
                        {category?.label ?? 'Accesorii'}
                    </a>
                    <span aria-hidden="true">·</span>
                    <span aria-current="page">{accessory.tip || accessory.name}</span>
                </nav>
            </div>

            <div className="module rule-strong-bottom">
                <div className="cell span-6 pdp-plate">
                    {accessory.thumb && (
                        <img
                            className="product-photo pdp-photo"
                            src={accessory.thumb}
                            alt={accessory.name}
                            fetchPriority="high"
                            decoding="async"
                        />
                    )}
                </div>

                <main className="cell span-6 pdp-buy">
                    <h1 className="pdp-title">{accessory.name}</h1>

                    <p className="pdp-grade">
                        {accessory.tip && <span className="unit-grade">{accessory.tip}</span>}
                        {compatible && (
                            <span className="note">Compatibil {accessory.compatibilitate}</span>
                        )}
                    </p>

                    <p className="pdp-price tabular">
                        {accessory.priceMax ? 'de la ' : ''}
                        {lei.format(accessory.price)} lei
                        {accessory.wasPrice && (
                            <span className="pdp-was tabular">{lei.format(accessory.wasPrice)} lei</span>
                        )}
                    </p>
                    <p className="finance-note">Rate prin LeanPay și TBI</p>

                    {accessory.inStock === false && <p className="note">Stoc epuizat</p>}

                    <div className="actions">
                        <a className="btn btn-primary" href="/cos">
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

                    {accessory.specs && accessory.specs.length > 0 ? (
                        <div className="trust-field" style={{ marginTop: '1.5rem' }}>
                            {accessory.specs.map((spec) => (
                                <div className="trust-line" key={spec.label}>
                                    <span>{spec.label}</span>
                                    <span>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="note" style={{ marginTop: '1.5rem' }}>
                            Verifică denumirea completă a produsului pentru modelul exact cu care
                            este compatibil.
                        </p>
                    )}
                </main>
            </div>

            {related.length > 0 && (
                <section className="module rule-strong-bottom" aria-label="Produse similare">
                    <div className="cell span-12 rule-bottom">
                        <h2 className="section-title">
                            {accessory.tip}
                            {compatible ? ` pentru ${accessory.compatibilitate}` : ''}
                        </h2>
                    </div>

                    <div className="units span-12">
                        {related.map((r) => (
                            <a className="unit" key={r.slug} href={`/produs/${r.slug}`}>
                                {r.thumb && (
                                    <span className="unit-photo">
                                        <img
                                            src={r.thumb}
                                            alt=""
                                            width={500}
                                            height={500}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </span>
                                )}
                                {r.tip && <span className="unit-grade">{r.tip}</span>}
                                <span className="unit-name">{r.name}</span>
                                <span className="unit-price tabular">
                                    {lei.format(r.price)} lei
                                </span>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
