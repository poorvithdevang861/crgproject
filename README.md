# CRG Website

Plain HTML, CSS and vanilla JavaScript. No build step or framework.

## Preview locally

The scripts are ES modules, which browsers only load over `http://`, not by double-clicking a file. Use either:

- `python3 serve.py`, then open http://localhost:8080
- VS Code with the Live Server extension

Any normal web host works as-is.

## Where things live

- Page text: the `.html` files
- Colours and layout: `css/style.css`
- Photos: `assets/images` (keep the same file names when replacing)
- Business details (WhatsApp number, phone, social links, form key): `js/config.js`

### Scripts

`js/main.js` loads each feature from `js/modules/`:

| File | Handles |
| --- | --- |
| `navigation.js` | Mobile menu, active page, "Explore" dropdown, header on scroll |
| `scroll-reveal.js` | Fade-in animations |
| `inspection-dialog.js` | "Book a Free Inspection" pop-up |
| `forms.js` | Sending enquiry forms, pre-selecting a service on the contact page |
| `contact-links.js` | Sticky WhatsApp button and social links |
| `compare-slider.js` | Before/after slider on the homepage |

When you change any CSS or JS, bump the `?v=` number on the `style.css` and `main.js` tags in every page so visitors get the new version.
