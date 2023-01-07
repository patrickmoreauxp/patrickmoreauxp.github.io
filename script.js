const header = document.getElementById('header');


function moveHeader(event) {
  // Get the current mouse position
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Get the window width and height
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Calculate the new header position
  let newX = windowWidth - mouseX;
  let newY = windowHeight - mouseY;

  // Smoothly move the header using CSS transitions
  header.style.transition = 'all 0.2s ease-out';
  header.style.top = `${newY}px`;
  header.style.left = `${newX}px`;
}

// Add an event listener to move the header when the mouse moves
window.addEventListener('mousemove', moveHeader);
