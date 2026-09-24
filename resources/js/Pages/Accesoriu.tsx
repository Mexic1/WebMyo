import { Head } from '@inertiajs/react';
import Arrow from '@/Components/Arrow';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';

type Accessory = {
    slug: string;
    name: string;
    price: number;
    thumb: string | null;
    tip: string;
    compatibilitate: string;
};

type Props = {
    accessory: Accessory;
    related: Accessory[];
    categories: Category[];
    company: Company;
};

const lei = new Intl.NumberFormat('ro-RO');

export default function Accesoriu({ accessory, related, categories, company }: Props) {
    const compatible = accessory.compatibilitate !== 'Altele';

    return (
        <>
            <Head title={accessory.name} />

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
                    <a href="/categorie/accesorii">Accesorii</a>
                    <span aria-hidden="true">·</span>
                    <span aria-current="page">{accessory.tip}</span>
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
                        <span className="unit-grade">{accessory.tip}</span>
                        {compatible && (
                            <span className="note">Compatibil {accessory.compatibilitate}</span>
                        )}
                    </p>

                    <p className="pdp-price tabular">{lei.format(accessory.price)} lei</p>
                    <p className="finance-note">Rate prin LeanPay și TBI</p>

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

                    <p className="note" style={{ marginTop: '1.5rem' }}>
                        Verifică denumirea completă a produsului pentru modelul exact cu care este
                        compatibil.
                    </p>
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
                                <span className="unit-grade">{r.tip}</span>
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
