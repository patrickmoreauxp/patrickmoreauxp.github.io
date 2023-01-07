const header = document.getElementById('header');

let x = 0;
let y = 0;

function updatePosition(event) {
  const dx = event.clientX - x;
  const dy = event.clientY - y;
  x += dx * 0.05;
  y += dy * 0.05;
  header.style.top = x + 'px';
  header.style.left = y + 'px';
}

window.addEventListener('mousemove', updatePosition)
