import { Head } from '@inertiajs/react';
import SiteHeader from '@/Components/SiteHeader';
import Arrow from '@/Components/Arrow';

export default function Pending({ title, note }: { title: string; note: string }) {
    return (
        <>
            <Head title={title} />

            <SiteHeader />

            <div className="module hero rule-strong-bottom">

                <main className="cell statement">
                    <h1 className="display">{title.toUpperCase()}</h1>

                    <p className="sub" style={{ marginTop: '2rem' }}>{note}</p>

                    <p className="label" style={{ marginTop: '1.5rem' }}>
                        Această pagină este în construcție.
                    </p>

                    <div className="actions">
                        <a className="btn btn-primary" href="/">
                            Înapoi la început
                            <Arrow />
                        </a>
                    </div>
                </main>

                <aside className="cell feature" />
                <header className="cell rail" />
            </div>
        </>
    );
}
