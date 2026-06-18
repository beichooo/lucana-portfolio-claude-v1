// Client behaviour for the B. Lucana portfolio:
//  - Bunny Stream facade (no players load until clicked)
//  - top bar switches to a solid background once past the cover (kept legible over light content)
// No scroll-entrance or ambient animations — the page is static on scroll.

/* ---- Bunny Stream facade ---- */
const BUNNY_LIBRARY_ID = '685952';
document.querySelectorAll('.facade[data-bunny]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-bunny');
    const iframe = document.createElement('iframe');
    iframe.src =
      `https://player.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${id}?autoplay=true&loop=true&muted=true&preload=true&responsive=true`;
    iframe.loading = 'lazy';
    iframe.style.cssText = 'aspect-ratio:9/16;width:100%;border:0;border-radius:19px;display:block;';
    iframe.setAttribute(
      'allow',
      'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen'
    );
    iframe.setAttribute('allowfullscreen', '');
    iframe.title = btn.getAttribute('aria-label') || 'Video player';
    btn.replaceWith(iframe);
  });
});

/* ---- Top bar background state (single class toggle, not a per-frame animation) ---- */
const topbar = document.getElementById('topbar');
let ticking = false;
let isSolid = null;

function onScroll() {
  ticking = false;
  const solid = window.scrollY > window.innerHeight - 80;
  if (topbar && solid !== isSolid) {
    topbar.classList.toggle('solid', solid);
    isSolid = solid;
  }
}
function reqScroll() {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
}
window.addEventListener('scroll', reqScroll, { passive: true });
onScroll();
