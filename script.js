const header = document.getElementById('header');


let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

function updatePosition(event) {
  const dx = event.clientX - x;
  const dy = event.clientY - y;
  x -= dx * 0.009;
  y -= dy * 0.009;

  // prevent the header from moving outside the boundaries of the page
  x = Math.max(0, Math.min(x, window.innerWidth - header.offsetWidth));
  y = Math.max(0, Math.min(y, window.innerHeight - header.offsetHeight));

  header.style.top = y + 'px';
  header.style.left = x + 'px';
}

window.addEventListener('mousemove', updatePosition)
