# Young Professionals Forum — Ambassadors in Marketplace 1.0

## Brand colours

- Primary green: `#156d10`
- Deep green: `#0f4e0b`
- White: `#ffffff`

The previous blue/gold palette has been refactored to the YPF brand palette while preserving the layout and visual hierarchy of the supplied landing-page reference.

## Assets folder

Place your files inside `assets/` using these names, or change the filenames in `index.html`: 

```text
assets/
├── ypf-logo.svg
├── hero-background.jpg
├── hero-person.png
├── speaker-1.jpg
├── speaker-2.jpg
├── speaker-3.jpg
├── speaker-4.jpg
├── speaker-5.jpg
├── speaker-6.jpg
├── partner-1.png
├── partner-2.png
├── partner-3.png
├── partner-4.png
├── partner-5.png
└── partner-6.png
```

### Hero image setup

The hero is intentionally split into two assets:

1. `hero-background.jpg` = city/building/background scene
2. `hero-person.png` = foreground young professional, ideally a transparent PNG/WebP

This lets the CSS preserve the composition of the reference design while allowing you to change either image independently.

If your person image has no transparent background, use a PNG/WebP with transparency or change `.hero-person` in `style.css` to suit the image.

## Google Form

Every Apply Now / Submit Your Application CTA currently points to:

`https://docs.google.com/forms/d/e/REPLACE_WITH_YOUR_FORM_ID/viewform`

Replace that URL in `index.html` with your published Google Form URL. All CTA links will then open the form in a new tab.

## Carousels

Sessions, Speakers and Partners use the same reusable JavaScript carousel system:

- 5-second pause before advancing
- smooth transition
- continuous looping
- pauses during pointer/touch interaction
- responsive mobile layout
- reduced-motion support

## Important design note

CSS recreates the structure, gradients, spacing, overlays, typography, buttons and positioning seen in the supplied visual. The exact photographic composition still comes from the assets you provide. Because the hero is now split into a background and a foreground person, you can position the person independently without baking the two photographs together.
