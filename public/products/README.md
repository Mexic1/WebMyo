# Product photography

One photograph per **model + colour**. Not per product, not per grade: a
*Bun* and a *Ca nou* iPhone 14 Pro in deep purple are the same picture.

## Naming

```
{model-slug}-{colour-slug}.{ext}        full resolution, 2000 × 2000
{model-slug}-{colour-slug}-600.webp     thumbnail, 600 × 600
```

`{model-slug}` is the product slug with its grade suffix removed, and
`{colour-slug}` is the WooCommerce `pa_culoare` term:

```
apple-iphone-14-pro-max-deep-purple.webp
apple-iphone-14-pro-max-deep-purple-600.webp
```

The thumbnail name is **derived at runtime**, not stored — see
`Catalog::modelMatrix()`. Ship both files or the grid falls back to
nothing.

## Registering a new image

Add one line to `Catalog::colourImages()` in `app/Data/Catalog.php`:

```php
'apple-iphone-14-pro-max|deep-purple' => '/products/apple-iphone-14-pro-max-deep-purple.webp',
```

Nothing else references these files by name. A colour with no entry
falls back to the product's first-colour image, so a missing mapping is
silent — check `Catalog::modelMatrix()` output rather than the page.

## Preparation — both steps are required

**1. The background must be pure white.** The page composites product
photography with `mix-blend-mode: multiply`, which drops white into the
paper ground so the device sits *on* the page instead of floating in a
white box. A shot on off-white, or with a drop shadow, shows a visible
rectangle.

**2. The subject must fill the frame.** Source images arrive framed
inconsistently — one supplied iPhone 13 Pro filled only 64% of its
canvas while every other image filled 99%, and it rendered visibly
smaller than its neighbours in the same grid. Trim, rescale, recentre:

```sh
magick in.jpg -fuzz 8% -trim +repage -resize x1994 \
  -background white -gravity center -extent 2000x2000 -quality 92 \
  apple-iphone-14-pro-max-deep-purple.webp
```

Then the thumbnail:

```sh
magick apple-iphone-14-pro-max-deep-purple.webp -resize 600x600 \
  -quality 82 -define webp:method=6 \
  apple-iphone-14-pro-max-deep-purple-600.webp
```

Verify the subject fills ≥ 90% of the height:

```sh
magick FILE -fuzz 8% -trim -format '%h of ' info: && magick FILE -format '%h\n' info:
```

## For the catalog migration

These 17 images were prepared by hand for the 19 graded products. The
full catalog is 446 products, so **the two preparation steps above
belong in the import pipeline**, not in somebody's terminal history.
Inconsistent framing has already appeared twice in a set of seventeen;
at 446 it is a certainty.

Source imagery came from myomobile.ro's own media library — the
manufacturer shots the client already licenses and hosts. Do not
substitute images from Apple or Samsung directly.
