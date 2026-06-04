document.addEventListener('DOMContentLoaded', function () {
  document.body.style.overflow = 'hidden';

  const left = document.getElementById('loading-left');
  const right = document.getElementById('loading-right');
  const leftBrand = document.getElementById('loading-brand-left');
  const rightBrand = document.getElementById('loading-brand-right');
  const leftLogo = left ? left.querySelector('img') : null;
  const rightLogo = right ? right.querySelector('img') : null;
  const leftName = leftBrand && leftBrand.children[0] ? leftBrand.children[0] : null;
  const rightName = rightBrand && rightBrand.children[0] ? rightBrand.children[0] : null;
  const leftSubtitle = leftBrand && leftBrand.children[1] ? leftBrand.children[1] : null;
  const rightSubtitle = rightBrand && rightBrand.children[1] ? rightBrand.children[1] : null;

  if (
    !leftLogo ||
    !rightLogo ||
    !leftBrand ||
    !rightBrand ||
    !leftName ||
    !rightName ||
    !leftSubtitle ||
    !rightSubtitle
  ) {
    return;
  }

  [left, right].forEach(function (panel) {
    panel.style.backgroundImage =
      'radial-gradient(120% 90% at 50% 100%, rgba(169, 141, 83, 0.24), rgba(41, 72, 48, 0.08) 52%, rgba(41, 72, 48, 0) 72%), linear-gradient(180deg, #2f5439 0%, #294830 72%, #1f3b27 100%)';
    panel.style.backgroundSize = '100% 100%';
  });

  leftBrand.style.position = 'relative';
  rightBrand.style.position = 'relative';
  leftBrand.style.zIndex = '8';
  rightBrand.style.zIndex = '8';

  leftLogo.style.opacity = '0';
  rightLogo.style.opacity = '0';
  leftLogo.style.transformOrigin = 'right center';
  rightLogo.style.transformOrigin = 'left center';
  leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.82)';
  rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.82)';
  leftLogo.style.filter = 'drop-shadow(0 0 0 rgba(195, 169, 103, 0))';
  rightLogo.style.filter = 'drop-shadow(0 0 0 rgba(195, 169, 103, 0))';
  leftLogo.style.willChange = 'transform, opacity, filter';
  rightLogo.style.willChange = 'transform, opacity, filter';

  leftBrand.style.opacity = '1';
  rightBrand.style.opacity = '1';

  [leftName, rightName].forEach(function (name) {
    name.style.opacity = '0';
    name.style.transform = 'translate3d(0, 26px, 0) skewY(6deg) scale(0.95)';
    name.style.letterSpacing = '0.36em';
    name.style.filter = 'blur(6px)';
    name.style.willChange = 'transform, opacity, filter, letter-spacing';
  });

  [leftSubtitle, rightSubtitle].forEach(function (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translate3d(0, 24px, 0)';
    subtitle.style.clipPath = 'inset(0 0 100% 0)';
    subtitle.style.filter = 'blur(2px)';
    subtitle.style.willChange = 'transform, opacity, clip-path, filter';
  });
});

function createSoilParticles(screen, leftLogo, rightLogo, handlers) {
  const callbacks = handlers || {};
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.pointerEvents = 'none';
  overlay.style.overflow = 'hidden';
  overlay.style.zIndex = '6';

  const haze = document.createElement('div');
  haze.style.position = 'absolute';
  haze.style.inset = '0';
  haze.style.opacity = '0';
  haze.style.background =
    'radial-gradient(95% 60% at 50% 52%, rgba(193, 164, 101, 0.25), rgba(41, 72, 48, 0.05) 52%, rgba(41, 72, 48, 0) 74%)';
  overlay.appendChild(haze);

  screen.appendChild(overlay);

  const width = screen.clientWidth;
  const height = screen.clientHeight;
  const particleCount = width < 768 ? 28 : 44;
  const leftRect = leftLogo.getBoundingClientRect();
  const rightRect = rightLogo.getBoundingClientRect();
  const screenRect = screen.getBoundingClientRect();
  const leftTarget = {
    x: leftRect.left - screenRect.left + leftRect.width * 0.58,
    y: leftRect.top - screenRect.top + leftRect.height * 0.48,
  };
  const rightTarget = {
    x: rightRect.left - screenRect.left + rightRect.width * 0.42,
    y: rightRect.top - screenRect.top + rightRect.height * 0.48,
  };

  const particles = [];

  for (let index = 0; index < particleCount; index += 1) {
    const node = document.createElement('span');
    const isLeft = index % 2 === 0;
    const target = isLeft ? leftTarget : rightTarget;
    const angle = Math.random() * Math.PI * 2;
    const radiusX = width * (0.58 + Math.random() * 0.14);
    const radiusY = height * (0.56 + Math.random() * 0.16);
    const startX = target.x + Math.cos(angle) * radiusX;
    const startY = target.y + Math.sin(angle) * radiusY;
    const controlAngle = angle + (Math.random() > 0.5 ? 1 : -1) * (0.32 + Math.random() * 0.24);
    const controlRadiusX = width * (0.18 + Math.random() * 0.1);
    const controlRadiusY = height * (0.16 + Math.random() * 0.1);
    const controlX = target.x + Math.cos(controlAngle) * controlRadiusX;
    const controlY = target.y + Math.sin(controlAngle) * controlRadiusY;
    const targetX = target.x + (Math.random() - 0.5) * 28;
    const targetY = target.y + (Math.random() - 0.5) * 24;
    const size = 2 + Math.random() * 4.2;

    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.top = '0';
    node.style.width = size.toFixed(2) + 'px';
    node.style.height = size.toFixed(2) + 'px';
    node.style.borderRadius = '999px';
    node.style.background = isLeft ? 'rgba(170, 142, 86, 0.88)' : 'rgba(195, 169, 103, 0.9)';
    node.style.opacity = '0';
    node.style.boxShadow = '0 0 8px rgba(195, 169, 103, 0.38)';
    node.style.transform = 'translate3d(' + startX.toFixed(1) + 'px, ' + startY.toFixed(1) + 'px, 0)';

    overlay.appendChild(node);
    particles.push({
      node: node,
      startX: startX,
      startY: startY,
      controlX: controlX,
      controlY: controlY,
      targetX: targetX,
      targetY: targetY,
      delay: Math.random() * 220,
      duration: 700 + Math.random() * 220,
    });
  }

  const start = performance.now();
  let raf = 0;
  let impactTriggered = false;
  let settleTriggered = false;

  function animate(now) {
    const elapsed = now - start;
    const hazeProgress = Math.min(1, elapsed / 420);
    haze.style.opacity = String(0.85 * hazeProgress);

    if (!impactTriggered && elapsed >= 640) {
      impactTriggered = true;
      if (typeof callbacks.onImpact === 'function') {
        callbacks.onImpact();
      }
    }

    if (!settleTriggered && elapsed >= 1040) {
      settleTriggered = true;
      if (typeof callbacks.onSettle === 'function') {
        callbacks.onSettle();
      }
    }

    particles.forEach(function (particle) {
      const local = elapsed - particle.delay;
      if (local <= 0) {
        return;
      }

      const t = Math.min(1, local / particle.duration);
      const inv = 1 - t;
      const x =
        inv * inv * particle.startX +
        2 * inv * t * particle.controlX +
        t * t * particle.targetX;
      const y =
        inv * inv * particle.startY +
        2 * inv * t * particle.controlY +
        t * t * particle.targetY;

      const opacity = t < 0.12 ? t / 0.12 : t < 0.9 ? 1 : 1 - (t - 0.9) / 0.1;
      const scale = 0.72 + t * 0.32;

      particle.node.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      particle.node.style.transform =
        'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0) scale(' + scale.toFixed(2) + ')';
    });

    if (elapsed < 1300) {
      raf = requestAnimationFrame(animate);
      return;
    }

    overlay.style.transition = 'opacity 0.42s ease-out';
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.remove();
    }, 460);
  }

  raf = requestAnimationFrame(animate);

  return function cleanup() {
    if (raf) {
      cancelAnimationFrame(raf);
    }
    overlay.remove();
  };
}

window.addEventListener('load', function () {
  const screen = document.getElementById('loading-screen');
  const left = document.getElementById('loading-left');
  const right = document.getElementById('loading-right');
  const leftBrand = document.getElementById('loading-brand-left');
  const rightBrand = document.getElementById('loading-brand-right');
  const leftLogo = left ? left.querySelector('img') : null;
  const rightLogo = right ? right.querySelector('img') : null;
  const leftName = leftBrand && leftBrand.children[0] ? leftBrand.children[0] : null;
  const rightName = rightBrand && rightBrand.children[0] ? rightBrand.children[0] : null;
  const leftSubtitle = leftBrand && leftBrand.children[1] ? leftBrand.children[1] : null;
  const rightSubtitle = rightBrand && rightBrand.children[1] ? rightBrand.children[1] : null;

  if (
    !screen ||
    !left ||
    !right ||
    !leftLogo ||
    !rightLogo ||
    !leftName ||
    !rightName ||
    !leftSubtitle ||
    !rightSubtitle
  ) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cleanupParticles = null;

  function closeLoadingScreen() {
    if (cleanupParticles) {
      cleanupParticles();
      cleanupParticles = null;
    }

    const easing = 'cubic-bezier(0.76, 0, 0.24, 1)';
    left.style.transition = 'transform 1.05s ' + easing + ', opacity 0.8s ease-out';
    right.style.transition = 'transform 1.05s ' + easing + ', opacity 0.8s ease-out';
    left.style.transformOrigin = 'right center';
    right.style.transformOrigin = 'left center';

    left.style.transform = 'translateX(-100%) scaleX(0.965)';
    right.style.transform = 'translateX(100%) scaleX(0.965)';

    setTimeout(function () {
      screen.remove();
      document.body.style.overflow = '';
    }, 950);
  }

  if (reduceMotion) {
    [leftLogo, rightLogo, leftName, rightName, leftSubtitle, rightSubtitle].forEach(function (element) {
      element.style.transition = 'none';
      element.style.opacity = '1';
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.filter = 'none';
    });
    leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
    rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
    leftSubtitle.style.clipPath = 'inset(0 0 0 0)';
    rightSubtitle.style.clipPath = 'inset(0 0 0 0)';
    setTimeout(closeLoadingScreen, 120);
    return;
  }

  requestAnimationFrame(function () {
    leftLogo.style.transition = 'opacity 0.48s ease-out, transform 0.55s cubic-bezier(0.2, 0.9, 0.2, 1), filter 0.5s ease-out';
    rightLogo.style.transition = 'opacity 0.48s ease-out, transform 0.55s cubic-bezier(0.2, 0.9, 0.2, 1), filter 0.5s ease-out';
    leftLogo.style.opacity = '0.44';
    rightLogo.style.opacity = '0.44';
    leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.9)';
    rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(0.9)';

    cleanupParticles = createSoilParticles(screen, leftLogo, rightLogo, {
      onImpact: function () {
        leftLogo.style.transition = 'transform 0.34s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.24s ease-out, filter 0.28s ease-out';
        rightLogo.style.transition = 'transform 0.34s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.24s ease-out, filter 0.28s ease-out';
        leftLogo.style.opacity = '1';
        rightLogo.style.opacity = '1';
        leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        leftLogo.style.filter = 'drop-shadow(0 0 28px rgba(195, 169, 103, 0.48))';
        rightLogo.style.filter = 'drop-shadow(0 0 28px rgba(195, 169, 103, 0.48))';
      },
      onSettle: function () {
        leftLogo.style.transition = 'filter 0.44s ease-out';
        rightLogo.style.transition = 'filter 0.44s ease-out';
        leftLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        rightLogo.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        leftLogo.style.filter = 'drop-shadow(0 0 24px rgba(195, 169, 103, 0.4))';
        rightLogo.style.filter = 'drop-shadow(0 0 24px rgba(195, 169, 103, 0.4))';
      },
    });

    setTimeout(function () {
      leftName.style.transition = 'transform 0.62s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.6s ease-out, letter-spacing 0.62s cubic-bezier(0.16, 1, 0.3, 1)';
      rightName.style.transition = 'transform 0.62s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.6s ease-out, letter-spacing 0.62s cubic-bezier(0.16, 1, 0.3, 1)';

      leftName.style.opacity = '1';
      rightName.style.opacity = '1';
      leftName.style.transform = 'translate3d(0, 0, 0) skewY(0deg) scale(1)';
      rightName.style.transform = 'translate3d(0, 0, 0) skewY(0deg) scale(1)';
      leftName.style.letterSpacing = '0.22em';
      rightName.style.letterSpacing = '0.22em';
      leftName.style.filter = 'blur(0)';
      rightName.style.filter = 'blur(0)';
    }, 930);

    setTimeout(function () {
      leftSubtitle.style.transition = 'clip-path 0.62s cubic-bezier(0.19, 1, 0.22, 1), transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.45s ease-out, filter 0.5s ease-out';
      leftSubtitle.style.opacity = '1';
      leftSubtitle.style.transform = 'translate3d(0, 0, 0)';
      leftSubtitle.style.clipPath = 'inset(0 0 0 0)';
      leftSubtitle.style.filter = 'blur(0)';
    }, 1260);

    setTimeout(function () {
      rightSubtitle.style.transition = 'clip-path 0.62s cubic-bezier(0.19, 1, 0.22, 1), transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.45s ease-out, filter 0.5s ease-out';
      rightSubtitle.style.opacity = '1';
      rightSubtitle.style.transform = 'translate3d(0, 0, 0)';
      rightSubtitle.style.clipPath = 'inset(0 0 0 0)';
      rightSubtitle.style.filter = 'blur(0)';
    }, 1260);

    setTimeout(closeLoadingScreen, 2320);
  });
});
