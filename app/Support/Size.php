<?php

namespace App\Support;

/**
 * Storage and memory sizes, compared by what they mean.
 *
 * "1 TB" cast to an integer is 1, which sorts it below "256 GB" — the
 * bug this exists to prevent. It had been written three times and got
 * it wrong in all three, so there is one implementation now and every
 * capacity sort goes through it.
 */
class Size
{
    /**
     * A capacity in GB. Understands TB, GB and MB, a comma or a dot as
     * the decimal mark, and an absent unit (assumed GB). Anything
     * unparseable is 0, which sorts first rather than throwing.
     */
    public static function inGb(?string $value): float
    {
        if ($value === null || ! preg_match('/([\d.,]+)\s*(TB|GB|MB)?/i', $value, $m)) {
            return 0;
        }

        $size = (float) str_replace(',', '.', $m[1]);

        return match (mb_strtoupper($m[2] ?? 'GB')) {
            'TB' => $size * 1024,
            'MB' => $size / 1024,
            default => $size,
        };
    }

    /**
     * Ascending by real size: 64 GB, 128 GB, 256 GB, 512 GB, 1 TB.
     *
     * @param  list<string>  $sizes
     * @return list<string>
     */
    public static function sort(array $sizes): array
    {
        usort($sizes, fn ($a, $b) => self::inGb($a) <=> self::inGb($b));

        return $sizes;
    }
}
