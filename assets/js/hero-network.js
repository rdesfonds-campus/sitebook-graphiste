(function () {
  const root      = document.getElementById('top') || document.querySelector('.hero');
  const container = document.getElementById('heroNetworkRoot');
  if (!root || !container) return;

  // Charge le SVG de la constellation depuis son fichier à part
  // et l'injecte dans le conteneur prévu dans le hero.
  fetch('assets/css/hero-network.svg')
    .then((res) => {
      if (!res.ok) throw new Error('hero-network.svg introuvable (' + res.status + ')');
      return res.text();
    })
    .then((svgMarkup) => {
      container.innerHTML = svgMarkup;
      startParallax();
    })
    .catch((err) => {
      console.warn('Animation du hero non chargée :', err);
    });

  function startParallax() {
    const svg = document.getElementById('hero-network');
    if (!svg) return;

    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const MAX = 15; // px

    root.addEventListener('mousemove', (e) => {
      const r = root.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      targetX = nx * MAX;
      targetY = ny * MAX;
    });
    root.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });

    function tick() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      svg.style.setProperty('--px', curX.toFixed(2) + 'px');
      svg.style.setProperty('--py', curY.toFixed(2) + 'px');
      requestAnimationFrame(tick);
    }
    tick();
  }
})();
