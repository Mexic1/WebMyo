import { Facebook, Instagram, TikTok } from '@/Components/SocialIcons';

const SOCIALS = [
    { label: 'Facebook', href: 'https://www.facebook.com/myomobile.ro/', Icon: Facebook },
    { label: 'Instagram', href: 'https://www.instagram.com/myomobile.ro/', Icon: Instagram },
    { label: 'TikTok', href: 'https://www.tiktok.com/@myomobile.ro', Icon: TikTok },
];

export type Company = {
    legalName: string;
    cui: string;
    address: string;
    phone: string;
    returnDays: number;
    warrantyMonths: number;
};

export type Category = { label: string; href: string; count?: number };

/**
 * Seller identification and the terms Romanian consumer law requires.
 * Every value is verified; nothing here is invented.
 */
export default function SiteFooter({
    company,
    categories,
}: {
    company: Company;
    categories: Category[];
}) {
    return (
        <footer className="module">
            <div className="cell span-3">
                <p className="label">Vânzătorul</p>
                <p style={{ margin: '0.5rem 0 0' }}>
                    {company.legalName}
                    <br />
                    CUI {company.cui}
                    <br />
                    {company.address}
                </p>
                <p style={{ margin: '0.75rem 0 0' }}>
                    <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                </p>

                <ul className="socials" aria-label="Rețele sociale">
                    {SOCIALS.map(({ label, href, Icon }) => (
                        <li key={label}>
                            <a
                                className="btn btn-icon"
                                href={href}
                                rel="noopener noreferrer"
                                target="_blank"
                                aria-label={label}
                                title={label}
                            >
                                <Icon />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="cell span-3">
                <p className="label">Catalog</p>
                <ul className="nav-list" style={{ marginTop: '0.5rem' }}>
                    {categories.map((c) => (
                        <li key={c.href}>
                            <a href={c.href}>{c.label}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="cell span-3">
                <p className="label">Cumpărare</p>
                <p style={{ margin: '0.5rem 0 0' }}>
                    Retur în {company.returnDays} de zile.
                    <br />
                    Garanție {company.warrantyMonths} de luni.
                    <br />
                    Plată în rate prin LeanPay și TBI Credit.
                </p>
                <ul className="nav-list" style={{ marginTop: '0.75rem' }}>
                    <li>
                        <a href="/help/returneaza-un-produs">Returnează un produs</a>
                    </li>
                    <li>
                        <a href="/help/trimite-un-produs-in-service">Trimite în service</a>
                    </li>
                </ul>
            </div>

            <div className="cell span-3">
                <p className="label">Protecția consumatorului</p>
                <ul className="nav-list" style={{ marginTop: '0.5rem' }}>
                    <li>
                        <a href="https://anpc.ro" rel="noopener noreferrer" target="_blank">
                            ANPC
                        </a>
                    </li>
                    <li>
                        <a href="https://reclamatiisal.anpc.ro" rel="noopener noreferrer" target="_blank">
                            ANPC — SAL
                        </a>
                    </li>
                    <li>
                        <a href="/help/termeni-si-conditii">Termeni și condiții</a>
                    </li>
                    <li>
                        <a href="/help/politica-de-confidentialitate">Confidențialitate</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
