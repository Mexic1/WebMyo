<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application, which will be used when the
    | framework needs to place the application's name in a notification or
    | other UI elements where an application name needs to be displayed.
    |
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services the application utilizes. Set this in your ".env" file.
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Debug Page Blacklist
    |--------------------------------------------------------------------------
    |
    | Whoops renders $_ENV on its error page, and Laravel's Dotenv populates
    | $_ENV with APP_KEY, DB_PASSWORD and friends verbatim. Its own default
    | masks nothing, so any uncaught error with APP_DEBUG=true serves those
    | credentials to whoever loaded the page.
    |
    | These must be LITERAL key names. Whoops matches each entry with
    | isset($superGlobal[$key]) — there is no wildcard, so '*' silently
    | masks nothing. Add every new secret-bearing variable here by name.
    |
    */

    'debug_blacklist' => [
        '_ENV' => [
            'APP_KEY',
            'DB_PASSWORD',
            'DB_USERNAME',
            'DB_DATABASE',
            'DB_HOST',
            'REDIS_PASSWORD',
            'REDIS_HOST',
            'MAIL_PASSWORD',
            'MAIL_USERNAME',
            'MAIL_HOST',
            'AWS_ACCESS_KEY_ID',
            'AWS_SECRET_ACCESS_KEY',
            'MEMCACHED_HOST',
        ],
        '_SERVER' => [
            'APP_KEY',
            'DB_PASSWORD',
            'DB_USERNAME',
            'DB_DATABASE',
            'DB_HOST',
            'REDIS_PASSWORD',
            'REDIS_HOST',
            'MAIL_PASSWORD',
            'MAIL_USERNAME',
            'MAIL_HOST',
            'AWS_ACCESS_KEY_ID',
            'AWS_SECRET_ACCESS_KEY',
            'MEMCACHED_HOST',
            'HTTP_AUTHORIZATION',
            'HTTP_COOKIE',
            'PHP_AUTH_PW',
        ],
        '_COOKIE' => [
            'XSRF-TOKEN',
            'laravel_session',
            'myo_session',
        ],
        '_POST' => [
            'cont',
            'banca',
            'cui',
            'email',
            'telefon',
            'adresa',
            'password',
            'password_confirmation',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the Artisan command line tool. You should set this to the root of
    | the application so that it's available within Artisan commands.
    |
    */

    'url' => env('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. The timezone
    | is set to "UTC" by default as it is suitable for most use cases.
    |
    */

    'timezone' => 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by Laravel's translation / localization methods. This option can be
    | set to any locale for which you plan to have translation strings.
    |
    */

    'locale' => env('APP_LOCALE', 'en'),

    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),

    'faker_locale' => env('APP_FAKER_LOCALE', 'en_US'),

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is utilized by Laravel's encryption services and should be set
    | to a random, 32 character string to ensure that all encrypted values
    | are secure. You should do this prior to deploying the application.
    |
    */

    'cipher' => 'AES-256-CBC',

    'key' => env('APP_KEY'),

    'previous_keys' => [
        ...array_filter(
            explode(',', (string) env('APP_PREVIOUS_KEYS', ''))
        ),
    ],

    /*
    |--------------------------------------------------------------------------
    | Maintenance Mode Driver
    |--------------------------------------------------------------------------
    |
    | These configuration options determine the driver used to determine and
    | manage Laravel's "maintenance mode" status. The "cache" driver will
    | allow maintenance mode to be controlled across multiple machines.
    |
    | Supported drivers: "file", "cache", "array"
    |
    */

    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],

];
