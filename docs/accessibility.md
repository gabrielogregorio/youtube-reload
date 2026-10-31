# Accessibility notes

## Tools

- [WAVE extension](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
- [Axe extension](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [NVDA, Windows screen reader](https://www.nvaccess.org/download/)
- [Orca, Linux screen reader](https://help.ubuntu.com/stable/ubuntu-help/a11y-screen-reader.html)

## Tips

1. Offer a link that skips to the main content. `index.html` has one, hidden until it gets focus.
2. Navigate by landmarks: `header`, `nav`, `main`, `footer` and labelled `section` elements let a screen reader
   jump around the page knowing where it is. Sections can and should have an `aria-label`.
3. Navigation shortcuts: `tab` goes forward, `shift + tab` goes back, and the up and down arrows move the virtual
   reading cursor.
4. NVDA: `ctrl + alt + n` opens its options, `reader key + q` closes it and `insert + f7` opens the panel with
   landmarks and links. Use that panel to spot useless links that can be removed.
5. On company links, say what the image is, for example "SBT logo".
6. Use `role="presentation"` and `alt=""` on images that are only decoration.
7. The accessible name must contain the visible text (`label-content-name-mismatch` in axe): voice control users
   say what they see.
