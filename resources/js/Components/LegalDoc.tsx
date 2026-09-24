import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';

export type Section = { id: string; n: number; title: string; body: ReactNode };

/**
 * The shell every legal document shares: a sticky contents index beside
 * the text. A Read surface — wayfinding first, measure held.
 */
export default function LegalDoc({
    title,
    subtitle,
    sections,
    closing,
    categories,
    company,
    current,
}: {
    title: string;
    subtitle?: ReactNode;
    sections: Section[];
    closing?: ReactNode;
    categories: Category[];
    company: Company;
    current: 'termeni' | 'confidentialitate';
}) {
    const others = [
        { href: '/help/termeni-si-conditii', label: 'Termeni și condiții', key: 'termeni' },
        {
            href: '/help/politica-de-confidentialitate',
            label: 'Confidențialitate',
            key: 'confidentialitate',
        },
        { href: '/help/returneaza-un-produs', label: 'Returnează un produs', key: 'retur' },
        { href: '/help/trimite-un-produs-in-service', label: 'Trimite în service', key: 'service' },
    ].filter((o) => o.key !== current);

    return (
        <>
            <Head title={title} />

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
                    <span aria-current="page">{title}</span>
                </nav>
            </div>

            <div className="module rule-strong-bottom">
                <nav className="cell span-3 toc" aria-label="Cuprins">
                    <p className="label">Cuprins</p>
                    <ol className="toc-list">
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a href={`#${s.id}`}>
                                    <span className="toc-n tabular">{s.n}</span>
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ol>

                    <p className="label" style={{ marginTop: '2rem' }}>
                        Alte informații
                    </p>
                    <ul className="nav-list" style={{ marginTop: '0.5rem' }}>
                        {others.map((o) => (
                            <li key={o.href}>
                                <a href={o.href}>{o.label}</a>
                            </li>
                        ))}
                    </ul>

                    <p className="label" style={{ marginTop: '2rem' }}>
                        Protecția consumatorului
                    </p>
                    <ul className="nav-list" style={{ marginTop: '0.5rem' }}>
                        <li>
                            <a href="https://anpc.ro" rel="noopener noreferrer" target="_blank">
                                ANPC
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://reclamatiisal.anpc.ro"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                ANPC — SAL
                            </a>
                        </li>
                    </ul>
                </nav>

                <main className="cell span-9 legal">
                    <h1 className="pdp-title">{title}</h1>
                    {subtitle && (
                        <p className="lede" style={{ marginTop: '0.75rem' }}>
                            {subtitle}
                        </p>
                    )}

                    {sections.map((s) => (
                        <section key={s.id} id={s.id} className="legal-section">
                            <h2 className="legal-h">
                                <span className="legal-n tabular">{s.n}</span>
                                {s.title}
                            </h2>
                            {s.body}
                        </section>
                    ))}

                    {closing && <div className="legal-close">{closing}</div>}
                </main>
            </div>

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
