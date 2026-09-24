import { Head } from '@inertiajs/react';
import Arrow from '@/Components/Arrow';

export default function Pending({ title, note }: { title: string; note: string }) {
    return (
        <>
            <Head title={title} />

            <div className="module hero rule-strong-bottom">
                <div className="cell masthead">
                    <div className="mark-field">
                        <a href="/">
                            <img src="/brand/myo-logo.svg" alt="MYO" width={116} height={40} />
                        </a>
                    </div>
                </div>

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
