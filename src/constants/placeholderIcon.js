// Monogram badge used for skills that have no brand logo (concepts, patterns,
// or trademarks we don't ship). Returns an SVG data URI usable as <img src>.
export const placeholderIcon = (label, color) => {
  const size = label.length > 2 ? 17 : 24;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">` +
    `<rect x="3" y="3" width="42" height="42" rx="10" fill="${color}"/>` +
    `<text x="24" y="24" dy=".35em" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" ` +
    `font-weight="700" font-size="${size}" fill="#fff">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
