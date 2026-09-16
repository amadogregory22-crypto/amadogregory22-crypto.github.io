import { useEffect } from 'react';

const CONTROL_SELECTOR = 'input:not([type="hidden"]), select, textarea';

function labelFor(control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
  if (control.getAttribute('aria-label') || control.getAttribute('aria-labelledby')) return '';

  const wrappingLabel = control.closest('label')?.textContent?.trim();
  const siblingLabel = control.parentElement?.querySelector('label')?.textContent?.trim();
  const previousLabel = control.previousElementSibling?.textContent?.trim();
  const placeholder = control.getAttribute('placeholder')?.trim();
  const input = control as HTMLInputElement;

  return wrappingLabel || siblingLabel || previousLabel || placeholder ||
    (input.type === 'color' ? 'Couleur' : input.type === 'range' ? 'Valeur' : input.type === 'file' ? 'Importer un fichier' : 'Champ de configuration');
}

function addMissingAccessibleNames(root: ParentNode) {
  root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(CONTROL_SELECTOR).forEach((control) => {
    const label = labelFor(control);
    if (label) control.setAttribute('aria-label', label.replace(/\s+/g, ' ').trim());
  });
}

/**
 * Gives legacy controls a programmatic name while panels are progressively
 * migrated to explicit `label` / `htmlFor` pairs. It also covers lazy panels.
 */
export function useAccessibleFormControls() {
  useEffect(() => {
    addMissingAccessibleNames(document);
    const observer = new MutationObserver(() => addMissingAccessibleNames(document));
    observer.observe(document.body, { childList: true, subtree: true });

    // Every navigation entry point (menu, command palette and diagnostic
    // correction) uses the same event.  Keeping the final scroll/focus work
    // here means a control added by a lazy-loaded panel receives the exact
    // same treatment as an already visible control.
    const focusRequestedControl = (event: Event) => {
      const target = (event as CustomEvent<{ target?: string }>).detail?.target;
      if (!target) return;

      const control = document.getElementById(target);
      if (!(control instanceof HTMLElement)) return;
      control.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
      control.focus({ preventScroll: true });
    };

    window.addEventListener('ragt:focus-control', focusRequestedControl);
    return () => {
      observer.disconnect();
      window.removeEventListener('ragt:focus-control', focusRequestedControl);
    };
  }, []);
}
