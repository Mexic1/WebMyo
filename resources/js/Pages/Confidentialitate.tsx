import LegalDoc, { type Section } from '@/Components/LegalDoc';
import type { Category, Company } from '@/Components/SiteFooter';

type Props = { categories: Category[]; company: Company; contactEmail: string; dpoPhone: string };

export default function Confidentialitate({ categories, company, contactEmail, dpoPhone }: Props) {
    const mail = (a: string) => (
        <a className="inline-link" href={`mailto:${a}`}>
            {a}
        </a>
    );
    const tel = (n: string) => (
        <a className="inline-link" href={`tel:${n.replace(/\s/g, '')}`}>
            {n}
        </a>
    );

    const sections: Section[] = [
        {
            id: 'scop',
            n: 1,
            title: 'Scopul politicii de confidențialitate',
            body: (
                <>
                    <p>
                        Această politică de confidențialitate se aplică datelor cu caracter personal
                        pe care le colectăm despre dumneavoastră cu scopul de a furniza produsele și
                        serviciile pe care le oferim.
                    </p>
                    <p>
                        Am dezvoltat această Politică de Confidențialitate cu scopul de a vă informa
                        asupra modului în care MyoMobile colectează, utilizează și procesează
                        informațiile cu caracter personal pe toate website-urile deținute, inclusiv
                        pe acest website.
                    </p>
                    <p>
                        Prin utilizarea acestui site, sunteți de acord cu practicile descrise în
                        această Politică de Confidențialitate. Dacă nu sunteți de acord cu această
                        Politică de Confidențialitate, vă rugăm să nu utilizați acest site. Ne
                        rezervăm dreptul de a face modificări la această Politică de
                        Confidențialitate în orice moment. Orice modificări vor fi postate în această
                        politică de confidențialitate, iar modificările se vor aplica pentru
                        activități și informații colectate ulterior publicării.
                    </p>
                    <p>
                        Pentru orice solicitare sau întrebare privind datele dumneavoastră cu
                        caracter personal, ne puteți contacta prin e-mail la {mail(contactEmail)} sau
                        prin telefon la {tel(dpoPhone)}, linie telefonică cu tarif normal.
                    </p>
                </>
            ),
        },
        {
            id: 'date-colectate',
            n: 2,
            title: 'Date cu caracter personal colectate',
            body: (
                <>
                    <p>MyoMobile poate colecta date despre dumneavoastră dintr-o varietate de surse:</p>
                    <ul className="legal-list">
                        <li>
                            Interacțiuni online sau electronice cu MyoMobile, inclusiv prin
                            site-urile noastre.
                        </li>
                        <li>
                            Interacțiuni offline cu MyoMobile, inclusiv prin campaniile promoționale,
                            concursuri etc.
                        </li>
                        <li>
                            Interacțiuni cu conținutul online, precum publicitatea, pe care MyoMobile
                            sau furnizorii săi îl furnizează prin intermediul website-urilor sau
                            aplicațiilor unor terțe părți.
                        </li>
                    </ul>

                    <h3 className="legal-sub">2.1 Date furnizate în mod direct</h3>
                    <p>
                        Aceste date pe care ni le furnizați cu consimțământul dumneavoastră pentru un
                        scop precis, sunt:
                    </p>
                    <ul className="legal-list">
                        <li>
                            date de contact, respectiv orice informații care permit MyoMobile să vă
                            contacteze (ex. nume, adresă, e-mail, număr de telefon etc.);
                        </li>
                        <li>informații de locație (ex. cod poștal, oraș, sector/județ etc.);</li>
                        <li>produse favorite;</li>
                        <li>informații legate de plăți — adresă de facturare, cont bancar;</li>
                        <li>
                            informații de înregistrare sau conectare solicitate de site-ul MyoMobile
                            (ex. ID logare/e-mail, nume de utilizator);
                        </li>
                        <li>
                            feedback oferit în calitate de consumator, respectiv informații pe care le
                            furnizați pe site despre experiența dumneavoastră în utilizarea
                            produselor și serviciilor (ex. comentarii și sugestii, testimoniale sau
                            alte informații legate de produsele comercializate de MyoMobile).
                        </li>
                    </ul>

                    <h3 className="legal-sub">2.2 Date colectate când interacționați cu site-ul</h3>
                    <p>
                        Utilizăm cookie-urile sau alte modalități de stocare automată a datelor
                        pentru a colecta anumite tipuri de informații în momentul în care
                        interacționați cu site-urile MyoMobile.
                    </p>

                    <h3 className="legal-sub">2.3 Date colectate din alte surse</h3>
                    <p>Nu colectăm date din alte surse.</p>

                    <h3 className="legal-sub">2.4 Datele cu caracter personal ale minorilor</h3>
                    <p>
                        MyoMobile nu solicită sau colectează în mod intenționat date personale de la
                        minori. În situația în care descoperă că a colectat în mod accidental date
                        personale de la un minor, va șterge acele date în cel mai scurt timp posibil.
                    </p>
                </>
            ),
        },
        {
            id: 'scopuri',
            n: 3,
            title: 'Cu ce scopuri folosim datele',
            body: (
                <>
                    <p>
                        În general, toate informațiile colectate sunt utilizate în scopul prevăzut,
                        pentru care le-ați trimis către noi, menționat în momentul colectării sau în
                        politica de confidențialitate.
                    </p>

                    <h3 className="legal-sub">Achiziția unor produse online</h3>
                    <p>
                        Dacă achiziționați unul sau mai multe produse din catalogul nostru online, vi
                        se va cere să furnizați informații precum nume, prenume, adresă, telefon și
                        adresă de e-mail. Aceste informații sunt utilizate pentru a finaliza achiziția
                        și pentru a confirma comanda.
                    </p>

                    <h3 className="legal-sub">Întreținerea contului</h3>
                    <p>
                        Pentru crearea și întreținerea conturilor dumneavoastră pe site-ul MyoMobile,
                        inclusiv prin intermediul programelor de loialitate și recompensare asociate
                        cu contul dumneavoastră.
                    </p>

                    <h3 className="legal-sub">Serviciul consumatorului</h3>
                    <p>
                        Pentru furnizarea serviciului consumatorului, inclusiv răspunsuri la
                        solicitările, plângerile sau feedback-ul general despre produsele noastre.
                        Serviciul poate fi furnizat prin e-mail, scrisori, telefon sau chat online.
                    </p>

                    <h3 className="legal-sub">Implicarea consumatorului și personalizarea</h3>
                    <p>
                        Pentru o implicare activă a consumatorului în cunoașterea produselor și
                        serviciilor noastre, inclusiv prin utilizarea conținutului generat de
                        utilizator. În unele situații, MyoMobile poate contopi datele personale
                        colectate dintr-o anumită sursă cu datele colectate dintr-o altă sursă,
                        pentru o viziune completă asupra consumatorului.
                    </p>

                    <h3 className="legal-sub">Comunicări de marketing</h3>
                    <p>
                        MYOMOBILE TRADING SRL colectează și prelucrează datele dumneavoastră
                        personale pentru comunicări comerciale, precum e-mail, SMS sau comunicări
                        prin poștă, doar cu acordul dumneavoastră explicit. De asemenea, putem folosi
                        datele dumneavoastră pentru comunicări comerciale pe alte website-uri,
                        inclusiv rețele sociale unde sunteți membru, prin corelarea activităților și
                        informațiilor colectate pe website-urile noastre cu cele colectate pe
                        website-uri terțe („Targeted Advertising”). Aceste comunicări sunt realizate
                        cu ajutorul cookie-urilor. Dacă nu mai doriți să le primiți, trebuie să
                        refuzați cookie-urile atunci când intrați pe website-ul nostru.
                    </p>
                    <p>
                        Aceste comunicări comerciale sunt realizate printr-un serviciu terț
                        (Google Ads). Aceste servicii pot avea acces la mai multe tipuri de date
                        despre dumneavoastră, colectate din site-urile pe care le vizitați sau din
                        rețelele de socializare pe care le frecventați.
                    </p>
                    <p>
                        Chiar dacă refuzați cookie-urile, puteți primi în continuare comunicări
                        administrative, precum confirmarea comenzilor, notificări referitoare la
                        activitățile din cont și anunțuri importante.
                    </p>

                    <h3 className="legal-sub">Newslettere și e-mailuri</h3>
                    <p>
                        Dacă ne furnizați adresa dumneavoastră de e-mail, datele de contact vor fi
                        utilizate pentru a vă trimite newsletterul solicitat. Dacă nu mai doriți să
                        fiți abonat, puteți folosi butonul de dezabonare inclus. Putem folosi adresa
                        dumneavoastră și pentru comunicări tranzacționale sau administrative, precum
                        e-mailuri de confirmare la achiziție, la înscriere sau dezabonare, ori
                        anunțuri despre actualizări ale acestei politici.
                    </p>

                    <h3 className="legal-sub">Tombole, concursuri și promoții</h3>
                    <p>
                        Pentru a vă înregistra la tombole online, concursuri sau alte promoții, vi se
                        poate cere să vă înregistrați mai întâi pe site. Informațiile colectate sunt
                        folosite pentru a determina eligibilitatea și pentru a vă notifica dacă
                        sunteți câștigător sau pentru a vă livra un premiu. Dacă sunteți câștigător,
                        anumite informații despre dumneavoastră (cum ar fi numele și imaginea) pot fi
                        postate pe site sau pe paginile MyoMobile din rețelele de socializare. Dacă
                        minorilor li se permite să participe, vom obține mai întâi acordul
                        părinților, dacă este necesar.
                    </p>

                    <h3 className="legal-sub">Sondaje</h3>
                    <p>
                        Există două tipuri de sondaje care pot fi efectuate pe site-urile MyoMobile.
                        Unul este cel în care sunt solicitate informații pur demografice (de exemplu
                        vârsta, genul, informații despre membrii familiei și alte interese), iar
                        informațiile nu sunt legate de nicio informație personală despre
                        dumneavoastră.
                    </p>
                </>
            ),
        },
        {
            id: 'dezvaluire',
            n: 4,
            title: 'Cui dezvăluim datele și de ce',
            body: (
                <>
                    <p>
                        MyoMobile nu va divulga niciodată datele dumneavoastră cu caracter personal
                        unei organizații de afaceri aparținând unui terț care intenționează să le
                        folosească în scopuri de marketing direct, dacă nu v-ați dat în mod expres
                        consimțământul. MyoMobile poate furniza datele altor companii din cadrul
                        grupului, precum și unor terți din afara grupului, strict limitat la
                        următoarele situații:
                    </p>

                    <h3 className="legal-sub">4.1 Companii afiliate</h3>
                    <p>
                        MyoMobile ar putea furniza datele dumneavoastră cu caracter personal
                        companiilor afiliate în scopuri determinate și legitime.
                    </p>

                    <h3 className="legal-sub">4.2 Furnizori de servicii, agenți și contractori</h3>
                    <p>
                        Am putea folosi terțe părți pentru a oferi suport operațiunilor interne ale
                        site-ului și pentru administrarea website-ului sau a diferitelor funcții,
                        programe și promoții. Unele dintre acestea pot fi localizate în afara țării
                        în care ați accesat acest site — de exemplu furnizorul serviciului de chat,
                        pe ale cărui servere se stochează conversațiile. Orice astfel de terță parte
                        trebuie să ofere aceleași niveluri de securitate ca MyoMobile și este
                        obligată printr-un acord legal să prelucreze datele numai la instrucțiunile
                        noastre. Un alt exemplu este serviciul de curierat care are nevoie de datele
                        dumneavoastră pentru a efectua o livrare.
                    </p>

                    <h3 className="legal-sub">4.3 Parteneri și promoții comune</h3>
                    <p>
                        Din când în când putem derula un program comun sau co-sponsorizat cu o altă
                        companie sau organizație. Dacă informațiile dumneavoastră sunt colectate de
                        către, sau împărțite cu, o altă societate ca parte a unui astfel de proiect,
                        vă vom anunța la momentul colectării. Dacă nu doriți acest lucru, puteți alege
                        să nu vă înregistrați sau să nu participați la aceste promoții.
                    </p>

                    <h3 className="legal-sub">4.4 Transferuri juridice și de afaceri</h3>
                    <p>
                        Am putea dezvălui informațiile dumneavoastră dacă ni se cere prin lege, sau
                        dacă, în opinia noastră de bună credință, o astfel de acțiune este necesară
                        pentru a ne conforma procedurilor legale, pentru a răspunde unor pretenții
                        sau pentru a proteja siguranța ori drepturile MyoMobile, ale clienților săi
                        sau ale publicului. În caz de fuziune, achiziție, reorganizare sau insolvență,
                        informațiile pot fi transferate dobânditorului, în conformitate cu legea
                        aplicabilă.
                    </p>
                </>
            ),
        },
        {
            id: 'refuz',
            n: 5,
            title: 'Ce se întâmplă dacă refuzați să furnizați date',
            body: (
                <p>
                    Dacă alegeți să nu oferiți informații personale când sunt solicitate, este posibil
                    să nu puteți participa la anumite activități și caracteristici personalizate, să
                    aveți acces limitat la servicii și oferte speciale sau să nu puteți efectua o
                    comandă. De exemplu, dacă refuzați să împărtășiți adresa de e-mail, nu veți putea
                    primi newsletterul și nu vă veți putea înregistra. Dacă refuzați să furnizați
                    numele, adresa, numărul de telefon sau adresa de e-mail, nu veți putea cumpăra
                    produse din magazinul online. Pentru a naviga pur și simplu pe site și a afla mai
                    multe despre produsele noastre, nu este necesar să ne oferiți niciun fel de
                    informații personale.
                </p>
            ),
        },
        {
            id: 'drepturi',
            n: 6,
            title: 'Drepturile dumneavoastră',
            body: (
                <>
                    <h3 className="legal-sub">6.1 Comunicările de marketing</h3>
                    <p>
                        Aveți dreptul de a urma instrucțiunile referitoare la dreptul de opțiune
                        asupra comunicărilor de marketing. Dacă doriți să schimbați aceste opțiuni, ne
                        puteți contacta prin e-mail la {mail(contactEmail)} sau la {tel(dpoPhone)}.
                        Chiar dacă ați optat să nu mai primiți comunicări de marketing, s-ar putea să
                        primiți în continuare comunicări administrative, precum confirmări sau
                        notificări legate de contul dumneavoastră.
                    </p>

                    <h3 className="legal-sub">6.2 Acces și rectificare</h3>
                    <p>
                        Aveți dreptul să solicitați accesul la datele dumneavoastră cu caracter
                        personal, printr-o solicitare trimisă la {mail(contactEmail)}. Aveți de
                        asemenea dreptul să solicitați rectificarea informațiilor eronate, activitate
                        care poate fi realizată și prin secțiunea „Contul meu”, dacă dețineți un cont.
                    </p>

                    <h3 className="legal-sub">6.3 – 6.8 Celelalte drepturi</h3>
                    <ul className="legal-list">
                        <li>
                            <strong>Dreptul la informare</strong> — sunteți îndreptățit să fiți
                            informat cu privire la prelucrarea datelor dumneavoastră.
                        </li>
                        <li>
                            <strong>Dreptul la opoziție</strong> — vă puteți opune în orice moment
                            prelucrării datelor care vă vizează.
                        </li>
                        <li>
                            <strong>Dreptul de retragere a consimțământului</strong> — puteți retrage
                            consimțământul dat în orice moment.
                        </li>
                        <li>
                            <strong>Dreptul de a vă adresa justiției</strong> — vă puteți adresa
                            instanțelor pentru protecția oricăror drepturi garantate de legislația
                            privind protecția datelor.
                        </li>
                        <li>
                            <strong>Dreptul la portabilitatea datelor</strong> — puteți primi datele
                            într-un format structurat și de uz comun.
                        </li>
                        <li>
                            <strong>Dreptul de a depune o plângere</strong> — vă puteți adresa
                            autorității naționale de supraveghere în domeniul protecției datelor.
                        </li>
                    </ul>
                </>
            ),
        },
        {
            id: 'tracking',
            n: 7,
            title: 'Tehnologii de urmărire',
            body: (
                <>
                    <p>
                        MyoMobile utilizează tehnologii de urmărire — cookie-uri, adrese IP, fișiere
                        jurnal și web beacons — pentru a aduna informații precum tipul de browser și
                        sistemul de operare, pagina de trimitere, navigarea prin site, domeniul ISP,
                        dispozitivul și locația. Acestea sunt utilizate pentru îmbunătățirea
                        funcționalității site-urilor și pentru a înțelege mai bine cum sunt folosite.
                    </p>

                    <h3 className="legal-sub">7.1 Cookie-uri</h3>
                    <p>
                        Folosim cookie-uri pentru a îmbunătăți utilizarea și funcționalitatea
                        site-urilor și pentru a personaliza experiența dumneavoastră. Aceleași
                        cookie-uri sunt folosite pentru afișarea reclamelor pe site-uri terțe în
                        funcție de preferințele dumneavoastră.
                    </p>

                    <h3 className="legal-sub">7.2 Adresa IP</h3>
                    <p>
                        Putem urmări adresa IP pentru depanare tehnică, menținerea siguranței și
                        securității site-ului, restricționarea accesului pentru anumiți utilizatori și
                        pentru o mai bună înțelegere a modului în care site-urile sunt folosite.
                    </p>

                    <h3 className="legal-sub">7.3 Fișiere jurnal</h3>
                    <p>
                        Noi, sau o terță parte în numele nostru, putem colecta informații sub forma
                        fișierelor jurnal care înregistrează activitatea site-ului și adună statistici
                        despre obiceiurile de navigare. Aceste înregistrări sunt generate anonim,
                        sunt utilizate doar intern și nu sunt asociate cu niciun utilizator anume.
                    </p>

                    <h3 className="legal-sub">7.4 Web beacons</h3>
                    <p>
                        Putem folosi web beacons pe site-uri sau în e-mailurile trimise către
                        dumneavoastră. Acestea sunt mici fragmente de cod care permit livrarea unei
                        imagini pentru a transfera date înapoi la noi. Informațiile colectate sunt
                        folosite pentru analiza traficului, contorizarea vizitatorilor unici,
                        publicitate, audit, raportare prin e-mail și personalizare.
                    </p>
                </>
            ),
        },
        {
            id: 'siguranta',
            n: 8,
            title: 'Siguranța și stocarea datelor',
            body: (
                <>
                    <p>
                        MyoMobile ia toate măsurile tehnice și organizatorice necesare pentru a
                        proteja confidențialitatea și securitatea informațiilor dumneavoastră. Aceste
                        eforturi includ stocarea informațiilor în medii de operare sigure, utilizarea
                        criptării standard SSL pentru protejarea informațiilor sensibile în timpul
                        transmiterii online și verificarea identității utilizatorilor înregistrați
                        înainte ca aceștia să poată accesa informațiile lor personale.
                    </p>
                    <p>
                        Datele dumneavoastră personale vor fi păstrate numai pentru perioada necesară
                        pentru a vă servi cererile sau până când vă retrageți consimțământul,
                        respectând cerințele legale și de reglementare. După această perioadă, datele
                        vor fi șterse sau arhivate conform legislației aplicabile.
                    </p>
                </>
            ),
        },
        {
            id: 'contact',
            n: 9,
            title: 'Cum ne puteți contacta',
            body: (
                <>
                    <p>
                        Dacă aveți întrebări, reclamații sau comentarii cu privire la această politică
                        de confidențialitate sau la practicile noastre de colectare a informațiilor,
                        ne puteți contacta la:
                    </p>
                    <dl className="specs" style={{ maxWidth: '48ch' }}>
                        <div className="spec">
                            <dt>E-mail</dt>
                            <dd>{mail(contactEmail)}</dd>
                        </div>
                        <div className="spec">
                            <dt>Telefon</dt>
                            <dd>{tel(dpoPhone)}</dd>
                        </div>
                        <div className="spec">
                            <dt>Sediu</dt>
                            <dd>{company.address}</dd>
                        </div>
                    </dl>
                </>
            ),
        },
    ];

    return (
        <LegalDoc
            title="Politica de confidențialitate"
            subtitle={`${company.legalName} · CUI ${company.cui} · ${company.address}`}
            sections={sections}
            categories={categories}
            company={company}
            current="confidentialitate"
        />
    );
}
