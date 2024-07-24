
function work(event, target) {
  var value = event.target.value;
  target.src = 'CX/CX_Microwave_' + value + '.jpg';
}

var range = document.getElementById('range');
var image = document.getElementById('target');
let changeDelay = 50; // Default delay in milliseconds between image changes
let lastChangeTime = 0; // Last time the image was changed
let isMouseDown = false; // Check if the left mouse button is pressed
let startX = 0; // Store the starting X coordinate of mouse movement
let currentImageIndex = 1; // Track the current image index

range.addEventListener("input", (event) => {
  const currentTime = Date.now();
  if (currentTime - lastChangeTime > changeDelay) {
      work(event, image);
      lastChangeTime = currentTime;
      currentImageIndex = event.target.value; // Update the current image index
  }
});

// Function to set the change delay
function setChangeDelay(newDelay) {
  changeDelay = newDelay;
}

// Mouse event handlers
function handleMouseMove(event) {
  if (!isMouseDown) return;

  const currentTime = Date.now();
  if (currentTime - lastChangeTime > changeDelay) {
      const dx = event.clientX - startX;
      if (dx > 0) {
          range.value = (parseInt(range.value) % range.max) + 1;
      } else {
          range.value = (parseInt(range.value) - 1 + parseInt(range.max)) % range.max;
          if (range.value === 0) range.value = range.max;
      }
      work(null, image);
      startX = event.clientX;
      lastChangeTime = currentTime;
      currentImageIndex = range.value; // Update the current image index
  }
}

function handleMouseDown(event) {
  if (event.button !== 0) return;

  isMouseDown = true;
  startX = event.clientX;
}

function handleMouseUp() {
  isMouseDown = false;
  range.value = currentImageIndex; // Ensure the range input is synced with the current image index
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);


