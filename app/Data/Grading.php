<?php

namespace App\Data;

/**
 * Content for /cum-notam — the page that explains the condition ladder.
 *
 * SKELETON. Most of this page cannot be written from outside the
 * business, and the parts that are missing are marked `pending` rather
 * than filled with plausible-looking numbers. Researched 2026-09-25
 * against Back Market, Amazon Renewed, Swappie, flip.ro and
 * refurbished.ro: every one of them publishes concrete, checkable
 * figures, and that is exactly what makes such a page persuasive.
 * Borrowing theirs would be fabrication, and an unsubstantiated claim
 * is an unfair-commercial-practice exposure under Legea 363/2007.
 *
 * A `pending` entry renders as a visible gap addressed to the client.
 * THIS PAGE MUST NOT GO LIVE WHILE ANY REMAIN — see PRODUCT.md, "The
 * grading page needs eight facts from the client".
 */
class Grading
{
    /**
     * The comparison matrix: grades across, attributes down. This is the
     * layout every seller researched converges on.
     *
     * `values` is keyed by grade label and must cover every step the
     * ladder declares — see `Catalog::grades()`. A row marked `pending`
     * has no values yet and renders as one gap spanning them all.
     *
     * @return list<array{label: string, values?: array<string, string>, pending?: string}>
     */
    public static function matrix(): array
    {
        return [
            [
                'label' => 'Ecran',
                'values' => [
                    'Bun' => 'Zgârieturi vizibile, posibil și cu ecranul pornit.',
                    'Excelent' => 'Zgârieturi fine, greu de observat de la o lungime de braț.',
                    'Ca nou' => 'Fără urme vizibile de folosire.',
                    'Openbox' => 'Nefolosit.',
                    'Sigilat' => 'Nefolosit.',
                ],
            ],
            [
                'label' => 'Carcasă și spate',
                'values' => [
                    'Bun' => 'Semne de uzură vizibile, fără impact asupra funcționării.',
                    'Excelent' => 'Micro-zgârieturi, vizibile doar de aproape sau în lumină directă.',
                    'Ca nou' => 'Aspect aproape nou.',
                    'Openbox' => 'Nefolosit.',
                    'Sigilat' => 'Nefolosit.',
                ],
            ],
            [
                'label' => 'Cutia',
                'values' => [
                    'Bun' => 'Desfăcută.',
                    'Excelent' => 'Desfăcută.',
                    'Ca nou' => 'Desfăcută.',
                    'Openbox' => 'Desigilată, aparatul nefolosit.',
                    'Sigilat' => 'Nedesfăcută.',
                ],
            ],
            [
                'label' => 'Funcționare',
                'values' => [
                    'Bun' => 'Complet funcțional.',
                    'Excelent' => 'Complet funcțional.',
                    'Ca nou' => 'Complet funcțional.',
                    'Openbox' => 'Complet funcțional.',
                    'Sigilat' => 'Complet funcțional.',
                ],
            ],
            [
                'label' => 'Baterie',
                'pending' => 'Pragul minim de sănătate a bateriei pe care îl garantăm. '
                    .'La ceilalți comercianți este un procent unic, identic pe toate '
                    .'gradele — nu variază de la un grad la altul.',
            ],
            [
                'label' => 'Ce include cutia',
                'pending' => 'Cablu și încărcător: originale sau compatibile, și dacă '
                    .'diferă de la o gamă la alta.',
            ],
            [
                'label' => 'Deblocare și IMEI',
                'pending' => 'Dacă verificăm per aparat că este deblocat și că IMEI-ul '
                    .'nu figurează pe liste de blocare.',
            ],
            [
                'label' => 'Ștergerea datelor',
                'pending' => 'Metoda prin care ștergem datele fostului proprietar și '
                    .'dacă este certificată.',
            ],
            [
                'label' => 'Garanție',
                'values' => [
                    'Bun' => 'Aceeași pe toate treptele.',
                    'Excelent' => 'Aceeași pe toate treptele.',
                    'Ca nou' => 'Aceeași pe toate treptele.',
                    'Openbox' => 'Aceeași pe toate treptele.',
                    'Sigilat' => 'Aceeași pe toate treptele.',
                ],
            ],
        ];
    }

    /**
     * What the grade does NOT change. This answers the objection the
     * ladder itself creates — "if it is only Bun, is something broken?"
     * — and every seller researched states it prominently.
     *
     * @return list<string>
     */
    public static function unaffected(): array
    {
        return [
            'Funcționarea aparatului.',
            'Durata garanției.',
            'Dreptul de retur.',
            'Verificările prin care trece înainte să ajungă la tine.',
        ];
    }

    /**
     * Facts only the client can supply, rendered on the page so they are
     * impossible to forget. Each is a section the page is missing.
     *
     * @return list<array{title: string, note: string}>
     */
    public static function pending(): array
    {
        return [
            [
                'title' => 'Procesul de testare',
                'note' => 'Ce verificăm pe fiecare aparat și câte puncte de control '
                    .'are lista. Ceilalți comercianți publică un număr exact; el '
                    .'trebuie să fie al nostru, nu preluat.',
            ],
            [
                'title' => 'Sănătatea bateriei',
                'note' => 'Procentul minim garantat și dacă este identic pe toate '
                    .'gradele.',
            ],
            [
                'title' => 'Ce include cutia',
                'note' => 'Accesorii originale sau compatibile.',
            ],
            [
                'title' => 'Ștergerea datelor',
                'note' => 'Metoda folosită și dacă este certificată.',
            ],
            [
                'title' => 'Deblocare și IMEI',
                'note' => 'Dacă starea este verificată per aparat.',
            ],
            [
                'title' => 'Fotografii reale pe grade',
                'note' => 'Imagini macro cu uzura tipică fiecărui grad. Este semnalul '
                    .'de încredere cel mai des folosit de comercianții serioși.',
            ],
        ];
    }

    /**
     * @return list<array{q: string, a: string}>
     */
    public static function faq(): array
    {
        return [
            [
                'q' => 'De ce este mai ieftin decât un aparat nou?',
                'a' => 'Pentru că a mai fost folosit. Nota de stare descrie exact cât '
                    .'de vizibil este acest lucru, iar prețul urmează nota.',
            ],
            [
                'q' => 'Un aparat cu nota „Bun” funcționează mai prost?',
                'a' => 'Nu. Nota descrie doar aspectul. Un aparat cu nota „Bun” '
                    .'funcționează la fel ca unul cu nota „Ca nou” și are aceeași '
                    .'garanție.',
            ],
            [
                'q' => 'Ce fac dacă aparatul primit nu corespunde notei?',
                'a' => 'Ai dreptul de retur în '.Catalog::company()['returnDays']
                    .' zile, fără să motivezi decizia. Dacă aparatul nu corespunde '
                    .'descrierii, se aplică și garanția legală de conformitate.',
            ],
        ];
    }
}
