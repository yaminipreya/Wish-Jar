let selectedColor = '#FFB7B2';

// Set active color selection
function selectColor(element, color) {
  document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('selected'));
  element.classList.add('selected');
  selectedColor = color;
}

// Fold a star and add it to the jar
function foldAndDropStar() {
  const wishText = document.getElementById('wish-text').value;
  const email = document.getElementById('user-email').value;

  if (!wishText) {
    alert("Please write a small wish before folding your star! ✨");
    return;
  }

  const jar = document.getElementById('jar');
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.backgroundColor = selectedColor;

  jar.appendChild(star);

  // Reset text box
  document.getElementById('wish-text').value = '';

  if (email) {
    alert("Your star was folded and safely saved to " + email + "! 🌟");
  } else {
    alert("Your star was dropped into the jar! 🌟");
  }
}

// Demo button action
function addRandomStar() {
  const colors = ['#FFB7B2', '#FFE5B4', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const jar = document.getElementById('jar');
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.backgroundColor = randomColor;

  jar.appendChild(star);
}
