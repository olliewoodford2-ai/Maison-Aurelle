# Maison Aurelle — recovered static project

This package reconstructs the Maison Aurelle landing page from the saved HTML and recovered Repaint assets.

## Run locally

Open `index.html` in a browser. If browser security prevents local media playback, run a local static server from this directory, for example `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## Included

- `index.html`, `styles.css`, and `app.js`
- Original recovered imagery under `assets/images/`
- Recovered `case-film.mp4` hero video
- Product and collection photos supplied/recovered for the page

## Notes

- The hero video is intentionally scroll-triggered: scroll through the hero journey to the video section; it is muted and inline so browsers can autoplay it where allowed. If autoplay is blocked, the page's play control should appear.
- The appointment and newsletter forms still point to Repaint-hosted endpoints from the captured page. They require those endpoints to remain available; form submission is not fully standalone.
- This is a recovered static version, not the original editable Repaint source project. The site has been checked for local asset references and media-file integrity, but has not been fully browser-tested across browsers.
