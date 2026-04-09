# Absolute Window Cleaning & Pressure Washing

This project is a multi-page static website with HTML, Tailwind CSS via CDN, and a tiny shared script.

- `index.html`
- `services.html`
- `about.html`
- `gallery.html`
- `styles.css`
- `script.js`

## Theme direction

- font:
  - headings: `Urbanist`
  - body: `Inter`
- backgrounds:
  - `#F4F9FF`
  - `#FFFFFF`
- accents:
  - buttons: `#B3D6F9`
- footer:
  - `#374756`

## What to edit

### Content

Each page has its own content directly in the HTML:

- `index.html`
- `services.html`
- `about.html`
- `gallery.html`

### Shared styling

Most layout and spacing now live directly in the HTML via Tailwind classes.
Use `styles.css` only for the custom bubble graphic and a few shared tweaks.

### Navigation behavior

`script.js` only highlights the current nav link.

## Quick edits you will likely want to make

- replace placeholder phone number and email
- replace any placeholder or stock photos
- update team bios and testimonials
- update social links if you have exact public profile URLs
- connect the quote button to your final form or assistant flow
- update the quote form recipient phone/email in `index.html` and `script.js` if needed

## Easy image uploads

Create a folder here:

- `/Users/loganschober/Documents/New project/assets`

Then add images and reference them with local paths like:

- `./assets/home-hero.jpg`
- `./assets/service-window.jpg`
- `./assets/team-logan.jpg`
- `./assets/gallery-1.jpg`

That gives you the simplest “drop in a file, swap the path” workflow for replacing stock images.

Current placeholders are `.svg` files inside `assets/`, so you can either:

- replace those file paths in the HTML with your new `.jpg` or `.png` files, or
- overwrite the placeholder filenames with your final image files if you want to keep the same names

## Remote quote form

The homepage quote form now lives in:

- `index.html`

The send logic lives in:

- `script.js`

It currently creates:

- a prefilled SMS to `(314) 452-8355`

The quote form is now text-only to keep all quote requests in one place.

## Preview

If the local server is running, open:

`http://127.0.0.1:8000/`
