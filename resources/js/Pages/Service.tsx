import { Head } from '@inertiajs/react';
import SiteHeader from '@/Components/SiteHeader';
import { useState, type FormEvent } from 'react';
import Arrow from '@/Components/Arrow';
import SiteFooter, { type Category, type Company } from '@/Components/SiteFooter';
import { Field, TextArea } from '@/Components/Field';

type Props = { categories: Category[]; company: Company };

const empty = {
    prenume: '',
    nume: '',
    firma: '',
    email: '',
    telefon: '',
    factura: '',
    produs: '',
    cantitate: '',
    problema: '',
    adresa: '',
    oras: '',
    judet: '',
    codPostal: '',
    acord: false,
};

export default function Service({ categories, company }: Props) {
    const [form, setForm] = useState(empty);

    const set = (key: keyof typeof empty) => (value: string | boolean) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // Deliberately inert: the form collects and validates, but nothing is
    // submitted until a destination exists for it.
    const onSubmit = (e: FormEvent) => e.preventDefault();

    return (
        <>
            <Head title="Trimite un produs în service" />

            <SiteHeader />

            <div className="module rule-bottom">

                <nav className="cell span-12 crumbs" aria-label="Navigare">
                    <a href="/">Acasă</a>
                    <span aria-hidden="true">·</span>
                    <span aria-current="page">Trimite un produs în service</span>
                </nav>
            </div>

            {/* ------------------------------------------------- details */}
            <section className="module rule-strong-bottom" aria-label="Detalii">
                <div className="cell span-7">
                    <h1 className="pdp-title">Trimite un produs în service</h1>

                    <p className="sub" style={{ marginTop: '1.5rem' }}>
                        Pentru a-ți asigura liniștea, toate produsele de pe myomobile.ro vin cu o
                        perioadă standard de garanție de 12 luni la produsele openbox, și 24 de luni
                        la produsele sigilate. În cazul în care experimentezi dificultăți cu orice
                        produs cumpărat de la noi, îți oferim servicii de asistență complet gratuit,
                        inclusiv colectarea și livrarea dispozitivului.
                    </p>

                    <p style={{ marginTop: '1.25rem', maxWidth: '68ch' }}>
                        Pentru a începe procesul de service, te rugăm să completezi formularul
                        atașat. Este esențial să nu trimiți niciun articol în service fără a completa
                        acest formular și a fi apoi contactat de un reprezentant MyoMobile. Fără
                        formularul precompletat, procesul de identificare și rezolvare a problemei
                        tale poate deveni mai complicat, ceea ce ar putea prelungi durata de
                        soluționare. După ce produsul ajunge în centrul nostru de service, acesta va
                        fi evaluat și apoi reparat sau înlocuit conform necesităților, într-o
                        perioadă maximă de 15 zile lucrătoare.
                    </p>

                    <p style={{ marginTop: '1.25rem', maxWidth: '68ch' }}>
                        Dacă produsul tău nu poate fi reparat și nu este disponibil în stocul
                        MyoMobile, îți vom returna contravaloarea acestuia.
                    </p>

                    <p style={{ marginTop: '1.25rem', maxWidth: '68ch' }}>
                        După trimiterea formularului, un consultant MyoMobile te va contacta
                        telefonic în cel mult 48 de ore, în timpul săptămânii de lucru, pentru a-ți
                        detalia pașii următori.
                    </p>
                </div>

                <div className="cell span-5">
                    <p className="label">Pe scurt</p>
                    <dl className="specs" style={{ marginTop: '1rem' }}>
                        <div className="spec">
                            <dt>Garanție openbox</dt>
                            <dd className="tabular">12 luni</dd>
                        </div>
                        <div className="spec">
                            <dt>Garanție produse sigilate</dt>
                            <dd className="tabular">24 de luni</dd>
                        </div>
                        <div className="spec">
                            <dt>Colectare și livrare</dt>
                            <dd>Gratuit</dd>
                        </div>
                        <div className="spec">
                            <dt>Durata maximă de service</dt>
                            <dd className="tabular">15 zile lucrătoare</dd>
                        </div>
                        <div className="spec">
                            <dt>Te contactăm în</dt>
                            <dd className="tabular">48 de ore</dd>
                        </div>
                    </dl>
                    <p className="note" style={{ marginTop: '1rem', maxWidth: '40ch' }}>
                        Nu trimite niciun produs înainte de a completa formularul și de a fi contactat
                        de un reprezentant MyoMobile.
                    </p>
                </div>
            </section>

            {/* ------------------------------------------------- form */}
            <form className="module rule-strong-bottom" onSubmit={onSubmit} noValidate={false}>
                <div className="cell span-12 rule-bottom">
                    <h2 className="section-title">Formular de service</h2>
                    <p className="note" style={{ marginTop: '0.5rem' }}>
                        Câmpurile marcate cu <abbr title="obligatoriu">*</abbr> sunt obligatorii.
                    </p>
                </div>

                <Field className="span-4" id="prenume" label="Prenume" value={form.prenume} onChange={set('prenume')} />
                <Field className="span-4" id="nume" label="Nume" value={form.nume} onChange={set('nume')} />
                <Field className="span-4" id="firma" label="Nume firmă" value={form.firma} onChange={set('firma')} />

                <Field className="span-6" id="email" label="Email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} />
                <Field className="span-6" id="telefon" label="Telefon" type="tel" required autoComplete="tel" value={form.telefon} onChange={set('telefon')} />

                <Field className="span-4" id="factura" label="Număr factură" value={form.factura} onChange={set('factura')} />
                <Field className="span-4" id="produs" label="Produs / cod produs" value={form.produs} onChange={set('produs')} />
                <Field className="span-4" id="cantitate" label="Cantitate" type="number" min="1" value={form.cantitate} onChange={set('cantitate')} />

                <TextArea className="span-12" id="problema" label="Descrie problema" required value={form.problema} onChange={set('problema')} />

                <Field className="span-6" id="adresa" label="Adresa de livrare" autoComplete="street-address" value={form.adresa} onChange={set('adresa')} />
                <Field className="span-2" id="oras" label="Oraș" autoComplete="address-level2" value={form.oras} onChange={set('oras')} />
                <Field className="span-2" id="judet" label="Județ" autoComplete="address-level1" value={form.judet} onChange={set('judet')} />
                <Field className="span-2" id="codPostal" label="Cod poștal" autoComplete="postal-code" value={form.codPostal} onChange={set('codPostal')} />

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
                            Trimite
                            <Arrow />
                        </button>
                    </div>

                    <p className="note" style={{ marginTop: '1rem' }}>
                        Formularul validează datele, dar încă nu are o destinație: trimiterea va fi
                        conectată odată cu sistemul de service.
                    </p>
                </div>
            </form>

            <SiteFooter company={company} categories={categories} />
        </>
    );
}
