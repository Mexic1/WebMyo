"""Product photography preparation, in one place.

Both image importers need the same two steps, and the second one was
missing from both: see public/products/README.md. Source shots arrive
framed inconsistently — some fill 99% of their canvas, some 52% — and
an untrimmed one renders visibly smaller than its neighbours in the
same grid. That is a framing bug, not a data bug, so it belongs here
rather than in whichever script happens to call it.
"""
import subprocess

FUZZ = '8%'


def _dimensions(args: list[str], raw: bytes) -> tuple[int, int]:
    out = subprocess.run(args, input=raw, check=True, capture_output=True).stdout
    w, h = out.decode().split()
    return int(w), int(h)


def prepare(raw: bytes, dest, size: int | tuple[int, int], quality: int = 86) -> None:
    """Trim the ground, scale the subject to fill, recentre on white.

    White is not decoration: the page composites photography with
    `mix-blend-mode: multiply`, so the ground has to be pure white or
    the device shows as a visible rectangle on the paper.
    """
    dest.parent.mkdir(parents=True, exist_ok=True)

    full_w, full_h = _dimensions(
        ['magick', '-', '-format', '%w %h', 'info:'], raw)
    trim_w, trim_h = _dimensions(
        ['magick', '-', '-fuzz', FUZZ, '-trim', '-format', '%w %h', 'info:'], raw)

    # A trim that removes almost everything means the shot is nearly
    # blank or the subject is the same tone as its ground. Keep the
    # original framing rather than crop to a speck.
    sane = trim_w >= full_w * 0.15 and trim_h >= full_h * 0.15
    trim = ['-fuzz', FUZZ, '-trim', '+repage'] if sane else []

    width, height = (size, size) if isinstance(size, int) else size
    canvas = f'{width}x{height}'

    subprocess.run(
        ['magick', '-', *trim,
         # Fit the longer side to the canvas, then pad the other with
         # white. A portrait phone ends up filling the full height.
         '-resize', canvas,
         '-background', 'white', '-gravity', 'center', '-extent', canvas,
         '-quality', str(quality), '-define', 'webp:method=6', str(dest)],
        input=raw, check=True, capture_output=True,
    )
