// Project lightbox + filtering
(function () {
  const cards = document.querySelectorAll('.card');
  const filters = document.querySelectorAll('.filter');
  const lightbox = document.getElementById('lightbox');
  const lbContent = document.getElementById('lightbox-content');
  const lbClose = document.getElementById('lightbox-close');
  const panels = document.getElementById('panels');

  // ---- Filtering ----
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const match = (f === 'all') || (c.dataset.category === f);
        c.classList.toggle('hidden', !match);
      });
    });
  });

  // ---- Lightbox ----
  function openProject(id) {
    const panel = panels.querySelector('#project-' + id);
    if (!panel) return;
    const clone = panel.cloneNode(true);
    clone.hidden = false;
    lbContent.innerHTML = '';
    lbContent.appendChild(clone);
    lightbox.hidden = false;
    document.body.classList.add('lb-open');
    lightbox.scrollTop = 0;
    history.replaceState(null, '', '#' + id);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lbContent.innerHTML = '';
    document.body.classList.remove('lb-open');
    if (location.hash) history.replaceState(null, '', location.pathname);
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openProject(card.dataset.project));
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  // Open from URL hash on load (e.g. shared link)
  if (location.hash && location.hash.length > 1) {
    const id = location.hash.slice(1);
    const visibleCard = document.querySelector('.card[data-project="' + id + '"]:not([hidden])');
    if (visibleCard && panels.querySelector('#project-' + id)) openProject(id);
  }
})();
