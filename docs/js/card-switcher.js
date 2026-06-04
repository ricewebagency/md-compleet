(function () {
  const switcher = document.getElementById('card-switcher');
  if (!switcher) return;

  const cards = Array.from(switcher.querySelectorAll('.card-sw'));
  let current = 0;
  let isSwitching = false;
  const switchDelay = 180;

  const states = [
    { x: '0%', scale: 1,    brightness: 1,    z: 3 },
    { x: '4%', scale: 0.97, brightness: 0.75, z: 2 },
    { x: '8%', scale: 0.94, brightness: 0.58, z: 1 },
    { x: '12%', scale: 0.91, brightness: 0.45, z: 0 },
  ];

  function update() {
    cards.forEach(function (card, i) {
      const s = states[(i - current + cards.length) % cards.length];
      card.style.transform = 'translateX(' + s.x + ') scale(' + s.scale + ')';
      card.style.filter = 'brightness(' + s.brightness + ')';
      card.style.zIndex = s.z;
    });
  }

  switcher.addEventListener('click', function () {
    if (isSwitching) return;
    isSwitching = true;

    current = (current + 1) % cards.length;
    update();

    setTimeout(function () {
      isSwitching = false;
    }, switchDelay);
  });
}());
