<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pagina nu există — MYO</title>
    <link rel="icon" href="/brand/myo-logo.svg" type="image/svg+xml">
    {{ Vite::fonts() }}
    @vite(['resources/css/app.css'])
</head>
<body>
    <div class="module hero rule-strong-bottom">
        <div class="cell masthead">
            <div class="mark-field">
                <a href="/"><img src="/brand/myo-logo.svg" alt="MYO" width="116" height="40"></a>
            </div>
        </div>
        <main class="cell statement">
            <h1 class="display">PAGINA<br>NU EXISTĂ.</h1>
            <p class="sub error-lede">Adresa cerută nu duce nicăieri. Catalogul te așteaptă.</p>
            <div class="actions">
                <a class="btn btn-primary" href="/">Înapoi la început<svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" focusable="false"><path d="M0 5h16" stroke="currentColor" stroke-width="1.5"/><path d="M12.5 1 17 5l-4.5 4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
            </div>
        </main>
        <header class="cell rail"></header>
        <aside class="cell feature"></aside>
    </div>
</body>
</html>
