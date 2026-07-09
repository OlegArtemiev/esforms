# Claspo Angular SPA Test

Minimal Angular Single Page Application for testing Claspo/site-script widgets during Angular Router navigation.

## Routes

- `/page1`
- `/page2`
- `/page3`

Navigation uses `routerLink`, so page changes happen inside the SPA without assigning `window.location.href` and without full document reloads.

## Add Claspo Script

Add the Claspo site-script in `src/index.html` at:

```html
<!-- Add Claspo script here -->
```

## Commands

```bash
npm install
npm start
npm run build
```

The production build is generated in `dist/claspo-angular-spa-test/browser`.

For static hosting with path routes like `/page2`, configure the host to serve `index.html` as the fallback for unknown paths.
