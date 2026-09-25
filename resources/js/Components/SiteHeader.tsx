/**
 * The site header: one ink band across the full width of every page.
 *
 * The mark anchors the left; account and basket sit at the right, as
 * icon-only circles matching the social buttons in the footer — same
 * size, same enlarge interaction, inverted because this band is ink
 * rather than paper.
 *
 * Static, not pinned: the homepage hero is built to fit one viewport
 * exactly, and a fixed bar would take ~80px out of it at every size.
 */
type IconProps = { className?: string };

const base = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'currentColor',
    'aria-hidden': true,
    focusable: 'false',
} as const;

function Account({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M12 12.2a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Zm0 1.8c-4.1 0-7.4 2.4-7.4 5.3 0 .6.5 1.1 1.1 1.1h12.6c.6 0 1.1-.5 1.1-1.1 0-2.9-3.3-5.3-7.4-5.3Z" />
        </svg>
    );
}

function Basket({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M8.2 7.2V6a3.8 3.8 0 1 1 7.6 0v1.2h2.5c.7 0 1.2.5 1.3 1.1l1 9.8a2.6 2.6 0 0 1-2.6 2.9H6a2.6 2.6 0 0 1-2.6-2.9l1-9.8c.1-.6.6-1.1 1.3-1.1h2.5Zm1.8 0h4V6a2 2 0 1 0-4 0v1.2Z" />
        </svg>
    );
}

export default function SiteHeader() {
    return (
        <header className="site-header">
            <a className="site-mark" href="/" aria-label="MYO, către pagina principală">
                <img src="/brand/myo-logo.svg" alt="MYO" width={116} height={40} />
            </a>

            <nav className="header-actions" aria-label="Cont și coș">
                <a className="btn btn-icon btn-on-ink" href="/cont" aria-label="Contul meu">
                    <Account />
                </a>
                <a className="btn btn-icon btn-on-ink" href="/cos" aria-label="Coșul meu">
                    <Basket />
                </a>
            </nav>
        </header>
    );
}
