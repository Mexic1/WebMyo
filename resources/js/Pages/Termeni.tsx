import LegalDoc, { type Section } from '@/Components/LegalDoc';
import type { Category, Company } from '@/Components/SiteFooter';

type Props = { categories: Category[]; company: Company };

/**
 * Sections are data so the contents index and the document itself come
 * from one source and cannot drift apart. Text is the client's own,
 * reproduced verbatim from myomobile.ro/help/termeni-si-conditii.
 */
const SECTIONS: Section[] = [
    {
        id: 'introducere',
        n: 1,
        title: 'Introducere',
        body: (
            <p>
                Bine ați venit pe site-ul MYOMOBILE TRADING SRL, cu sediul în Str. Mărășești 11 C,
                Buziaș. Accesarea și utilizarea site-ului nostru, precum și achiziția produselor
                Samsung din gama noastră, sunt supuse următorilor termeni și condiții.
            </p>
        ),
    },
    {
        id: 'produse-si-servicii',
        n: 2,
        title: 'Produse și servicii',
        body: (
            <>
                <p>
                    MYOMOBILE TRADING SRL oferă spre vânzare produse Samsung, incluzând dar
                    nelimitându-se la: telefoane, tablete, căști, ceasuri, laptopuri și accesorii. De
                    asemenea, oferim produse pentru casă, cum ar fi frigidere, mașini de spălat vase,
                    cuptoare, cuptoare cu microunde, mașini de spălat rufe, uscătoare de rufe și
                    aspiratoare.
                </p>
                <p>
                    Produsele sunt disponibile în condiții openbox sau sigilate. Verificați
                    descrierea fiecărui produs în parte pentru a înțelege starea și specificațiile
                    acestuia.
                </p>
            </>
        ),
    },
    {
        id: 'comenzi',
        n: 3,
        title: 'Comenzi',
        body: (
            <>
                <p>Produsele se pot comanda atât online, cât și telefonic, în funcție de categorie:</p>
                <ul className="legal-list">
                    <li>
                        Telefoane, tablete, căști, ceasuri, laptopuri și accesorii se pot comanda
                        online și telefonic.
                    </li>
                    <li>
                        Frigidere, mașini de spălat vase, cuptoare, cuptoare cu microunde, mașini de
                        spălat rufe, uscătoare de rufe și aspiratoare se pot comanda doar online.
                    </li>
                </ul>
                <p>
                    Pentru orice nelămuriri sau asistență în procesul de comandă, vă rugăm să ne
                    contactați la numărul de telefon sau adresa de e-mail furnizate pe site.
                </p>
            </>
        ),
    },
    {
        id: 'plata',
        n: 4,
        title: 'Plată',
        body: (
            <p>
                Plata produselor comandate se poate efectua online cu cardul prin sistemul Netopia
                sau ramburs la primirea coletului. Asigurați-vă că introduceți corect detaliile
                cardului și că aveți suficiente fonduri pentru a finaliza tranzacția.
            </p>
        ),
    },
    {
        id: 'livrare',
        n: 5,
        title: 'Livrare',
        body: (
            <>
                <p>
                    Livrarea produselor comandate de la MYOMOBILE TRADING SRL se face prin serviciul
                    Fan Courier în 1–3 zile lucrătoare. Detaliile privind livrarea, inclusiv termenii
                    și condițiile specifice, precum și tarifele, vor fi specificate în procesul de
                    comandă și confirmate prin e-mail după plasarea comenzii.
                </p>
                <p>
                    Vă rugăm să asigurați că adresa de livrare furnizată este corectă și completă
                    pentru a evita întârzierile sau problemele în procesul de livrare. În cazul în
                    care pachetul nu poate fi livrat din cauze atribuibile clientului (adresă
                    greșită, destinatar absent repetat etc.), pot apărea costuri suplimentare pentru
                    reexpediere.
                </p>
                <p>
                    Termenele de livrare pot varia în funcție de locație și de disponibilitatea
                    produselor. Vom face tot posibilul să respectăm termenele de livrare estimate,
                    dar vă rugăm să rețineți că acestea sunt doar estimări și pot suferi modificări.
                </p>
                <p>
                    Pentru urmărirea livrării, clienții vor primi un număr de tracking odată ce
                    coletul a fost expediat. Pentru orice întrebări sau nelămuriri legate de livrare,
                    vă rugăm să ne contactați sau să contactați direct serviciul de curierat.
                </p>
            </>
        ),
    },
    {
        id: 'retururi',
        n: 6,
        title: 'Retururi și rambursări',
        body: (
            <>
                <p>
                    Clienții pot returna produsele în termen de 14 zile calendaristice de la primire,
                    conform legislației în vigoare. Produsele trebuie să fie în aceeași stare în care
                    au fost primite, neutilizate și în ambalajul original. Costurile de returnare vor
                    fi suportate de client.
                </p>
                <p className="note">
                    Procedura completă și formularul de retur se află pe pagina{' '}
                    <a className="inline-link" href="/help/returneaza-un-produs">
                        Returnează un produs
                    </a>
                    .
                </p>
            </>
        ),
    },
    {
        id: 'proprietate-intelectuala',
        n: 7,
        title: 'Proprietate intelectuală',
        body: (
            <p>
                Conținutul site-ului, inclusiv texte, imagini, grafice și logo-uri, este proprietatea
                MYOMOBILE TRADING SRL și este protejat de legile drepturilor de autor. Utilizarea
                neautorizată a oricărui material de pe acest site este strict interzisă.
            </p>
        ),
    },
    {
        id: 'modificari',
        n: 8,
        title: 'Modificări ale termenilor și condițiilor',
        body: (
            <p>
                MYOMOBILE TRADING SRL își rezervă dreptul de a modifica acești termeni și condiții în
                orice moment. Orice modificare va fi efectivă imediat după publicarea pe site.
            </p>
        ),
    },
    {
        id: 'contact',
        n: 9,
        title: 'Contact',
        body: null,
    },
];

export default function Termeni({ categories, company }: Props) {
    const sections: Section[] = SECTIONS.map((s) =>
        s.id === 'contact'
            ? {
                  ...s,
                  body: (
                      <>
                          <p>
                              Pentru orice întrebări sau nelămuriri legate de acești termeni și
                              condiții, ne poți contacta la:
                          </p>
                          <dl className="specs" style={{ maxWidth: '48ch' }}>
                              <div className="spec">
                                  <dt>Telefon</dt>
                                  <dd>
                                      <a
                                          className="inline-link"
                                          href={`tel:${company.phone.replace(/\s/g, '')}`}
                                      >
                                          {company.phone}
                                      </a>
                                  </dd>
                              </div>
                              <div className="spec">
                                  <dt>Sediu</dt>
                                  <dd>{company.address}</dd>
                              </div>
                          </dl>
                      </>
                  ),
              }
            : s,
    );

    return (
        <LegalDoc
            title="Termeni și condiții"
            subtitle={`${company.legalName} · CUI ${company.cui} · ${company.address}`}
            sections={sections}
            closing="Prin utilizarea acestui site, confirmați că ați citit, înțeles și acceptat acești termeni și condiții."
            categories={categories}
            company={company}
            current="termeni"
        />
    );
}
