const header = document.getElementById('header');
if (header) {
  // the element exists, so you can access its style property
  let x = 0;
  let y = 0;

  function updatePosition(event) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x += dx * 0.2;
    y += dy * 0.2;
    header.style.top = x + 'px';
    header.style.left = y + 'px';
  }

  window.addEventListener('mousemove', updatePosition);
} else {
  // the element does not exist, so you can handle this case appropriately
  console.error('Element with id "header" not found');
}
