/**
 * Document-space scroll position for a section hash: the card inside the section (not the section's padding),
 * landing just under the sticky header. Uses layout offsets, not client rects, so page transforms (the
 * off-canvas menu scales the page) and the current scroll position never skew the result.
 */
export function scrollTargetFor(hash: string): number | null {
  if (!hash.startsWith('#') || hash.length < 2) return null;
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return null;
  const target = (el.querySelector('.container-x') as HTMLElement | null) ?? el;
  const header = document.querySelector('header');
  // Sticky header: it sits at top:0 while stuck, so its bottom is its layout height.
  const headerBottom = header ? header.offsetHeight : 72;
  let top = 0;
  for (let n: HTMLElement | null = target; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
  return Math.max(0, top - (headerBottom + 12));
}
