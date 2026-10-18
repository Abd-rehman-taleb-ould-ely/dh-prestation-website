/** Sticky header state and accessible mobile menu. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-menu-panel]');
  const label = document.querySelector<HTMLElement>('[data-menu-label]');
  if (!header || !toggle || !panel) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open: boolean, restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.dataset.open = String(open);
    document.body.classList.toggle('menu-open', open);
    if (label) {
      label.textContent = (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '';
    }
    if (open) {
      panel.querySelector<HTMLElement>('a')?.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  panel.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  // Keep keyboard focus inside the header while the menu covers the page.
  document.addEventListener('focusin', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (!header.contains(event.target as Node)) toggle.focus();
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
