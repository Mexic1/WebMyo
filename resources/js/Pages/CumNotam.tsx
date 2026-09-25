import { Head } from '@inertiajs/react';
import Arrow from '@/Components/Arrow';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';

type Grade = { label: string; step: number; note?: string };
type Row = { label: string; values?: Record<string, string>; pending?: string };

type Props = {
    grades: Grade[];
    matrix: Row[];
    unaffected: string[];
    pending: { title: string; note: string }[];
    faq: { q: string; a: string }[];
    categories: Category[];
    company: Company;
};

export default function CumNotam({
    grades,
    matrix,
    unaffected,
    pending,
    faq,
    categories,
    company,
}: Props) {
    return (
        <>
            <Head title="Cum notăm aparatele" />

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
                    <span aria-current="page">Cum notăm aparatele</span>
                </nav>
            </div>

            {/* The promise the whole ladder rests on: the grade is about
                looks, and nothing else moves with it. */}
            <div className="module rule-bottom">
                <div className="cell span-8 doc-lede">
                    <h1 className="display-sm">Nota descrie aspectul, nu funcționarea.</h1>
                    <p className="sub" style={{ marginTop: '1.5rem' }}>
                        Fiecare aparat primește una dintre cele {grades.length} note de stare.
                        Nota spune cât de vizibil este că aparatul a mai fost folosit — atât.
                        Un aparat cu nota „Bun” funcționează la fel ca unul cu nota „Ca nou”.
                    </p>
                </div>

                {/* .axis-field bleeds a gutter each side, so it has to sit
                    INSIDE a cell rather than be one — as a cell its own
                    padding stacks with the bleed and the labels run off
                    the right edge. */}
                <aside className="cell span-4">
                    <div className="axis-field">
                        <p className="label">Scara de stare</p>
                        {grades.map((g) => (
                            <div className="grade-static" key={g.label}>
                                <span className="grade-track">
                                    <span
                                        className="grade-fill"
                                        style={{ transform: `scaleX(${g.step / grades.length})` }}
                                    />
                                </span>
                                <span className="grade-name">{g.label}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {/* Grades across, attributes down — the layout every seller
                researched converges on. */}
            <section className="module rule-bottom" aria-label="Comparație între note">
                <div className="cell span-12">
                    <h2 className="section-title">Ce înseamnă fiecare notă</h2>

                    <div className="grade-table-wrap">
                        <table className="grade-table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <span className="sr-only">Caracteristică</span>
                                    </th>
                                    {grades.map((g) => (
                                        <th scope="col" key={g.label}>
                                            {g.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {matrix.map((row) => (
                                    <tr key={row.label}>
                                        <th scope="row">{row.label}</th>

                                        {row.pending ? (
                                            <td colSpan={grades.length}>
                                                <span className="pending-mark">De confirmat</span>
                                                <span className="pending-note">{row.pending}</span>
                                            </td>
                                        ) : (
                                            grades.map((g) => (
                                                <td key={g.label}>{row.values?.[g.label] ?? '—'}</td>
                                            ))
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="module rule-bottom" aria-label="Ce nu depinde de notă">
                <div className="cell span-5">
                    <h2 className="section-title">Ce nu depinde de notă</h2>
                </div>

                <div className="cell span-7">
                    <ul className="plain-list">
                        {unaffected.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="module rule-bottom" aria-label="Garanție și retur">
                <div className="cell span-5">
                    <h2 className="section-title">Garanție și retur</h2>
                </div>

                <div className="cell span-7">
                    <div className="trust-field" style={{ marginTop: 0 }}>
                        <div className="trust-line">
                            <span>Garanție comercială</span>
                            <span className="tabular">{company.warrantyMonths} luni</span>
                        </div>
                        <div className="trust-line">
                            <span>Drept de retur</span>
                            <span className="tabular">{company.returnDays} zile</span>
                        </div>
                    </div>

                    {/* Two different rights. Sellers routinely blur them;
                        they are not the same thing and the page says so. */}
                    <p className="note" style={{ marginTop: '1.5rem' }}>
                        Dreptul de retur de {company.returnDays} zile și garanția de conformitate
                        sunt două lucruri diferite. Primul îți permite să renunți la cumpărătură
                        fără să explici de ce. A doua acoperă situația în care aparatul nu
                        corespunde descrierii.
                    </p>

                    <p className="pending-block">
                        <span className="pending-mark">De confirmat</span>
                        Durata garanției comerciale și raportul ei cu garanția legală de
                        conformitate pentru bunuri second-hand. Formularea juridică trebuie
                        verificată de un avocat înainte de publicare.
                    </p>
                </div>
            </section>

            {/* Addressed to the client, not to a customer. */}
            <section className="module rule-bottom" aria-label="Secțiuni în așteptare">
                <div className="cell span-12">
                    <h2 className="section-title">Ce lipsește din această pagină</h2>
                    <p className="note" style={{ marginTop: '0.75rem', maxWidth: '62ch' }}>
                        Fiecare punct de mai jos este o secțiune pe care comercianții serioși
                        o publică cu cifre exacte. Le putem scrie doar cu informații reale de
                        la MYO — un număr preluat de la un concurent ar fi o afirmație
                        nesusținută.
                    </p>

                    <ol className="pending-list">
                        {pending.map((item) => (
                            <li key={item.title}>
                                <span className="pending-title">{item.title}</span>
                                <span className="pending-note">{item.note}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="module rule-strong-bottom" aria-label="Întrebări frecvente">
                <div className="cell span-12">
                    <h2 className="section-title">Întrebări frecvente</h2>

                    <dl className="faq">
                        {faq.map((item) => (
                            <div className="faq-item" key={item.q}>
                                <dt>{item.q}</dt>
                                <dd>{item.a}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="actions">
                        <a className="btn btn-primary" href="/magazin">
                            Vezi catalogul
                            <Arrow />
                        </a>
                    </div>
                </div>
            </section>

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
