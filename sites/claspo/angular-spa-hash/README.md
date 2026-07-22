# Claspo Angular SPA Hash Routing Test

Minimal Angular Single Page Application for testing Claspo/site-script widgets during Angular Router hash navigation.

## Routes

- `/#/page1`
- `/#/page2`
- `/#/page3`

Navigation uses `routerLink` with Angular's `withHashLocation()`. Page changes happen inside the SPA, update `location.hash`, and do not reload the document.

## Add Claspo Script

Add or replace the Claspo site-script in `src/index.html`.

## Commands

```bash
npm install
npm start
npm run build
```

The production build is generated in `dist/claspo-angular-spa-hash-test/browser`.

Unlike path-based SPA routing, hash routing does not require the static host to serve `index.html` as a fallback for `/page1`, `/page2`, or `/page3`, because the route after `#` is not sent to the server.
