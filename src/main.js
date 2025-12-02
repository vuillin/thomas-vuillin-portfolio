import { initModelViewer } from './lib/viewer.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.body;
  const statusElement = document.querySelector('#viewer-status');

  const showLandscapeHint = () => {
    const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
    const isMobileUA =
      typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent || '',
      );
    if (!isCoarsePointer && !isMobileUA) {
      return;
    }

    const hint = document.createElement('div');
    hint.className = 'landscape-hint';
    hint.textContent =
      'Il est conseillé de naviguer sur le site en mode paysage pour une meilleure expérience.';
    document.body.appendChild(hint);
    requestAnimationFrame(() => {
      hint.classList.add('is-visible');
    });

    setTimeout(() => {
      hint.classList.remove('is-visible');
      setTimeout(() => hint.remove(), 600);
    }, 5200);
  };

  if (!container || !statusElement) {
    console.error('Impossible de trouver l\'élément conteneur pour le viewer.');
    return;
  }

  showLandscapeHint();

  initModelViewer({
    container,
    statusElement,
  });
});
