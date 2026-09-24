import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Arrow from '@/Components/Arrow';
import GradeMark from '@/Components/GradeMark';
import CatalogGrid, { type Unit } from '@/Components/CatalogGrid';
import SiteFooter from '@/Components/SiteFooter';

type Grade = { label: string; step: number; note: string };
type Category = { label: string; href: string; count: number };

type Props = {
    catalog: { unitCount: number; gradedCount: number; grades: Grade[] };
    categories: Category[];
    featured: Unit;
    units: Unit[];
    company: {
        legalName: string;
        cui: string;
        address: string;
        phone: string;
        returnDays: number;
        warrantyMonths: number;
    };
};

const lei = new Intl.NumberFormat('ro-RO');
const screens = ['screen screen-50', 'screen screen-20', 'screen screen-05'];

export default function Home({ catalog, categories, featured, units, company }: Props) {
    const [activeGrade, setActiveGrade] = useState<string | null>(null);
    const steps = catalog.grades.length;
    const featuredStep = catalog.grades.find((g) => g.label === featured.grade)?.step ?? 1;
    const railUnits = activeGrade ? units.filter((u) => u.grade === activeGrade) : units;

    return (
        <>
            <Head title="Telefoane și laptopuri verificate" />

            {/* ------------------------------------- first screen:
                hero + category index share one viewport. The hero takes
                whatever the category row does not. */}
            <div className="screen-one">
            <div className="module hero rule-strong-bottom">
                <div className="cell masthead">
                    <div className="mark-field">
                        <img src="/brand/myo-logo.svg" alt="MYO" width={116} height={40} />
                    </div>
                </div>

                <main className="cell statement">
                    <div>
                    <h1 className="display">
                        HARDWARE
                        <br />
                        PREMIUM.
                        <br />
                        PREȚ
                        <br />
                        INTELIGENT.
                    </h1>

                    <p className="sub" style={{ marginTop: '2rem' }}>
                        Fiecare aparat primește o notă de stare înainte să ajungă la tine. Telefoane,
                        tablete și laptopuri verificate, cu garanție și plată în rate.
                    </p>

                    <div className="actions">
                        <a className="btn btn-primary" href="#catalog">
                            Vezi catalogul
                            <Arrow />
                        </a>
                        <a className="btn" href="/cum-notam">
                            Cum notăm aparatele
                            <Arrow />
                        </a>
                    </div>

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
                        <div className="trust-line">
                            <span>Plată în rate</span>
                            <span>LeanPay · TBI Credit</span>
                        </div>
                    </div>
                </main>

                <header className="cell rail">
                    <div className="rail-head">
                    <nav aria-label="Categorii">
                        <ul className="nav-list">
                            {categories.map((c) => (
                                <li key={c.href}>
                                    <a href={c.href}>{c.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <p className="label">Catalog</p>
                    <p className="price tabular" style={{ margin: '0 0 1.5rem' }}>
                        {lei.format(catalog.unitCount)}
                        <span className="label" style={{ marginLeft: '0.5rem' }}>
                            produse
                        </span>
                    </p>

                    </div>

                    <div className="axis-field">
                        <p className="label">Scara de stare</p>
                        <div role="group" aria-label="Filtrează după starea aparatului">
                            {catalog.grades.map((g) => {
                                const pressed = activeGrade === g.label;
                                return (
                                    <button
                                        key={g.label}
                                        type="button"
                                        className="grade"
                                        aria-pressed={pressed}
                                        onClick={() => setActiveGrade(pressed ? null : g.label)}
                                    >
                                        <span className="grade-track">
                                            <span
                                                className="grade-fill"
                                                style={{ transform: `scaleX(${g.step / steps})` }}
                                            />
                                        </span>
                                        <span className="grade-name">{g.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </header>

                <aside className="cell feature">
                    <div className="feature-head">
                    <div className="mark-box">
                        {featured.image ? (
                            <img
                                className="product-photo"
                                src={featured.image}
                                alt={`${featured.name}, stare ${featured.grade}`}
                                fetchPriority="high"
                                decoding="async"
                            />
                        ) : (
                            <GradeMark step={featuredStep} steps={steps} />
                        )}
                    </div>

                    <h2 className="section-title" style={{ marginTop: '1.25rem' }}>
                        {featured.name}
                    </h2>
                    <p className="label" style={{ marginTop: '0.5rem' }}>
                        {featured.grade}
                        {featured.storage ? ` · ${featured.storage}` : ''}
                    </p>
                    <p className="price tabular" style={{ margin: '0.75rem 0 0' }}>
                        {lei.format(featured.price)} lei
                    </p>
                    <p className="finance-note">Rate prin LeanPay și TBI</p>

                    </div>

                    <div>
                    <p className="label">
                        {activeGrade ? `Din catalog · ${activeGrade}` : 'Din catalog'}
                    </p>

                    <p className="sr-only" role="status" aria-live="polite">
                        {activeGrade
                            ? `${railUnits.length} produse cu nota ${activeGrade}.`
                            : `${railUnits.length} produse afișate.`}
                    </p>

                    {railUnits.slice(0, 3).map((u) => (
                        <a className="row" key={u.href} href={u.href}>
                            <span>
                                {u.name}
                                <span className="label" style={{ display: 'block' }}>
                                    {u.grade}
                                </span>
                            </span>
                            <span className="tabular">{lei.format(u.price)} lei</span>
                            <Arrow className="row-arrow" />
                        </a>
                    ))}
                    </div>
                </aside>
            </div>

            {/* ---------------------------------------------- categories */}
            <section className="module rule-strong-bottom" aria-label="Categorii">
                {categories.map((c) => (
                    <a className="cell cat span-2" key={c.href} href={c.href}>
                        <span className="cat-count tabular">{lei.format(c.count)}</span>
                        <span className="cat-name">
                            {c.label}
                            <Arrow className="row-arrow" />
                        </span>
                    </a>
                ))}
            </section>
            </div>

            {/* ---------------------------------------------- graded catalog */}
            <section id="catalog" className="module rule-strong-bottom" aria-label="Catalog notat">
                <CatalogGrid
                        units={units}
                        grades={catalog.grades}
                        active={activeGrade}
                        onSelect={setActiveGrade}
                    />
            </section>

            {/* ---------------------------------------------- grading explained */}
            <section className="module rule-strong-bottom" aria-label="Cum notăm aparatele">
                <div className="cell span-12 rule-bottom">
                    <div className="section-head">
                        <h2 className="section-title">Ce înseamnă fiecare notă</h2>
                        <a className="btn" href="/cum-notam">
                            Procesul complet
                            <Arrow />
                        </a>
                    </div>
                </div>

                {catalog.grades.map((g, i) => (
                    <div className="cell span-4" key={g.label}>
                        <div className={`grade-plate ${screens[i] ?? screens[screens.length - 1]}`} />
                        <h3 className="section-title">{g.label}</h3>
                        <p style={{ margin: '0.6rem 0 0', maxWidth: '38ch' }}>{g.note}</p>
                        <p className="note" style={{ margin: '0.5rem 0 0' }}>
                            Treapta {g.step} din {steps} pe scara de stare.
                        </p>
                    </div>
                ))}
            </section>

            {/* ---------------------------------------------- financing */}
            <section className="module rule-strong-bottom" aria-label="Plată în rate">
                <div className="cell span-4 finance-block">
                    <p className="label">Plată în rate</p>
                    <p className="section-title" style={{ marginTop: '0.5rem' }}>
                        LeanPay și TBI Credit
                    </p>
                </div>
                <div className="cell span-8">
                    <p className="sub" style={{ maxWidth: '54ch' }}>
                        Poți împărți plata în rate direct la finalizarea comenzii, prin LeanPay sau
                        TBI Credit. Suma și numărul de rate se stabilesc în pasul de checkout, în
                        funcție de produsul ales.
                    </p>
                    <p className="note" style={{ marginTop: '1rem' }}>
                        Condițiile finale sunt cele afișate de furnizorul de creditare.
                    </p>
                </div>
            </section>

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
