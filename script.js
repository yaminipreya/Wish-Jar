const mainScreen = document.getElementById('main-screen');
const noteScreen = document.getElementById('note-screen');
const jarBtn = document.getElementById('jar-btn');
const closeBtn = document.getElementById('close-note');
const tuckBtn = document.getElementById('tuck-btn');
const unfoldBtn = document.getElementById('unfold-btn');
const wishText = document.getElementById('wish-text');
const wishDate = document.getElementById('wish-date');

// List of random wishes to cycle through
const wishes = [
  { text: "i have a great day", date: "August 30, 2026" },
  { text: "good things are coming your way", date: "August 31, 2026" },
  { text: "take a deep breath and smile", date: "September 1, 2026" },
  { text: "you are doing amazing", date: "September 2, 2026" }
];

function openRandomWish() {
  const randomIndex = Math.floor(Math.random() * wishes.length);
  const selectedWish = wishes[randomIndex];
  
  wishText.textContent = `"${selectedWish.text}"`;
  wishDate.textContent = selectedWish.date;

  mainScreen.classList.remove('active');
  mainScreen.classList.add('hidden');
  
  noteScreen.classList.remove('hidden');
  noteScreen.classList.add('active');
}

function closeToJar() {
  noteScreen.classList.remove('active');
  noteScreen.classList.add('hidden');
  
  mainScreen.classList.remove('hidden');
  mainScreen.classList.add('active');
}

// Event Listeners for switching screens
jarBtn.addEventListener('click', openRandomWish);
closeBtn.addEventListener('click', closeToJar);
tuckBtn.addEventListener('click', closeToJar);
unfoldBtn.addEventListener('click', openRandomWish);
