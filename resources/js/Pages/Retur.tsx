import { Head } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import Arrow from '@/Components/Arrow';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';
import { Field, Select, TextArea } from '@/Components/Field';

type Props = { categories: Category[]; company: Company; courierUrl: string };

const REASONS = [
    'Produs deteriorat',
    'Am primit alt produs decât cel comandat',
    'Produs comandat greșit',
    'Am găsit un preț mai bun',
    'Produsul nu funcționează',
    'Nu corespunde specificațiilor de pe site',
];

const empty = {
    nume: '',
    prenume: '',
    firma: '',
    cui: '',
    email: '',
    telefon: '',
    banca: '',
    cont: '',
    factura: '',
    produs: '',
    cantitate: '',
    motiv: '',
    problema: '',
    acord: false,
};

export default function Retur({ categories, company, courierUrl }: Props) {
    const [form, setForm] = useState(empty);

    const set = (key: keyof typeof empty) => (value: string | boolean) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // Deliberately inert: the form collects and validates, but nothing is
    // submitted until a destination exists for it.
    const onSubmit = (e: FormEvent) => e.preventDefault();

    return (
        <>
            <Head title="Returnează un produs" />

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
                    <span aria-current="page">Returnează un produs</span>
                </nav>
            </div>

            {/* ------------------------------------------------- details */}
            <section className="module rule-strong-bottom" aria-label="Dreptul de retragere">
                <div className="cell span-7">
                    <h1 className="pdp-title">Returnează un produs</h1>
                    <p className="lede" style={{ marginTop: '0.75rem' }}>
                        Dreptul de retragere conform OUG 34/2014
                    </p>

                    <p className="sub" style={{ marginTop: '1.25rem' }}>
                        Pot beneficia de posibilitatea de returnare în 14 zile atât consumatorii
                        individuali cât și grupurile de consumatori organizate în asociații, cu
                        condiția respectării normelor actuale referitoare la dreptul de retragere.
                        Detalii suplimentare sunt disponibile în OUG 34/2014, articolul 9.
                    </p>

                    <p style={{ marginTop: '1.5rem', maxWidth: '68ch' }}>
                        Pentru o experiență fără probleme în procesul de retur, iată ce ar trebui să
                        știi:
                    </p>

                    <ol className="steps">
                        <li>
                            Verifică dacă produsul pe care dorești să îl returnezi se califică pentru
                            retur, consultând criteriile specificate în{' '}
                            <a className="inline-link" href="/help/termeni-si-conditii">
                                termeni și condiții
                            </a>
                            .
                        </li>
                        <li>
                            <strong>Completează formularul de retur</strong> de mai jos.
                        </li>
                        <li>
                            Returnează produsul prin{' '}
                            <a
                                className="inline-link"
                                href={courierUrl}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                generarea unui AWB de retur
                            </a>
                            . Costurile de expediere sunt în sarcina ta. Recomandăm ambalarea
                            produsului într-o cutie secundară, pentru a preveni deteriorarea
                            ambalajului original, și evitarea aplicării AWB-ului direct pe cutia
                            produsului.
                        </li>
                        <li>
                            Urmărește recomandările pe care le vei primi prin e-mailul de confirmare.
                        </li>
                    </ol>

                    <p style={{ marginTop: '1.5rem', maxWidth: '68ch' }}>
                        Reamintim: conform articolului 7 din Ordonanța Guvernului nr. 34/2014, ai
                        dreptul de a te retrage din contract, fără a suporta penalități și fără a
                        oferi un motiv, în termen de 14 zile calendaristice de la data la care ai
                        intrat în posesia fizică a produsului.
                    </p>
                </div>

                <div className="cell span-5">
                    <p className="label">Pe scurt</p>
                    <dl className="specs" style={{ marginTop: '1rem' }}>
                        <div className="spec">
                            <dt>Termen de retragere</dt>
                            <dd className="tabular">14 zile calendaristice</dd>
                        </div>
                        <div className="spec">
                            <dt>De când curge termenul</dt>
                            <dd>De la primirea produsului</dd>
                        </div>
                        <div className="spec">
                            <dt>Motiv necesar</dt>
                            <dd>Nu</dd>
                        </div>
                        <div className="spec">
                            <dt>Penalități</dt>
                            <dd>Niciuna</dd>
                        </div>
                        <div className="spec">
                            <dt>Costul expedierii</dt>
                            <dd>În sarcina ta</dd>
                        </div>
                        <div className="spec">
                            <dt>Temei legal</dt>
                            <dd>OUG 34/2014, art. 7 și 9</dd>
                        </div>
                    </dl>
                    <p className="note" style={{ marginTop: '1rem' }}>
                        Banii se întorc în contul bancar pe care îl completezi în formular, de aceea
                        îți cerem IBAN-ul.
                    </p>
                </div>
            </section>

            {/* ------------------------------------------------- form */}
            <form className="module rule-strong-bottom" onSubmit={onSubmit}>
                <div className="cell span-12 rule-bottom">
                    <h2 className="section-title">Formular de retur</h2>
                    <p className="note" style={{ marginTop: '0.5rem' }}>
                        Câmpurile marcate cu <abbr title="obligatoriu">*</abbr> sunt obligatorii.
                    </p>
                </div>

                <Field className="span-3" id="nume" label="Nume" required autoComplete="family-name" value={form.nume} onChange={set('nume')} />
                <Field className="span-3" id="prenume" label="Prenume" required autoComplete="given-name" value={form.prenume} onChange={set('prenume')} />
                <Field className="span-3" id="firma" label="Nume firmă" autoComplete="organization" value={form.firma} onChange={set('firma')} />
                <Field className="span-3" id="cui" label="CUI" value={form.cui} onChange={set('cui')} />

                <Field className="span-6" id="email" label="Email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} />
                <Field className="span-6" id="telefon" label="Telefon" type="tel" required autoComplete="tel" value={form.telefon} onChange={set('telefon')} />

                <Field className="span-4" id="banca" label="Banca" required value={form.banca} onChange={set('banca')} />
                <Field className="span-8" id="cont" label="Cont bancar (IBAN)" required inputMode="text" hint="Aici primești contravaloarea produsului returnat." value={form.cont} onChange={set('cont')} />

                <div className="cell span-12 rule-bottom">
                    <p className="label">Date comandă</p>
                </div>

                <Field className="span-4" id="factura" label="Număr factură" value={form.factura} onChange={set('factura')} />
                <Field className="span-4" id="produs" label="Produs / cod produs" value={form.produs} onChange={set('produs')} />
                <Field className="span-4" id="cantitate" label="Cantitate" type="number" min="1" value={form.cantitate} onChange={set('cantitate')} />

                <Select className="span-5" id="motiv" label="Motivul returului" required value={form.motiv} onChange={set('motiv')}>
                    <option value="">Selectează</option>
                    {REASONS.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </Select>

                <TextArea className="span-7" id="problema" label="Descrie problema" required rows={4} value={form.problema} onChange={set('problema')} />

                <div className="cell span-12">
                    <label className="consent">
                        <input
                            type="checkbox"
                            required
                            checked={form.acord}
                            onChange={(e) => set('acord')(e.target.checked)}
                        />
                        <span>
                            Prin apăsarea butonului trimite, sunt de acord cu prelucrarea datelor în
                            sistemul CRM al myomobile.ro.
                        </span>
                    </label>

                    <div className="actions">
                        <button type="submit" className="btn btn-primary">
                            Trimite formularul
                            <Arrow />
                        </button>
                    </div>

                    <p className="note" style={{ marginTop: '1rem' }}>
                        Formularul validează datele, dar încă nu are o destinație: trimiterea va fi
                        conectată odată cu sistemul de retur.
                    </p>
                </div>
            </form>

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
