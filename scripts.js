// Let's bring the objects to life!

// === 1. MARKERs ON FIELD  ===
const field = document.getElementById('field');

// variables to set the marker's position
let currentMarker = null;
let offsetX, offsetY;

// function to create a marker
function createMarker(type) {
    const marker = document.createElement('img');
    marker.classList.add('marker');

    if (type === 'x') {
        marker.src = './assets/icons/xicon_nbg.webp';
    }
    
    if (type === 'flag') {
        marker.src = './assets/icons/flag_nbg.webp';
    }
    
    if (type === 'ball') {
        marker.src = './assets/icons/ball_nbg.webp';
    }

    marker.style.left = '1rem';
    marker.style.top = '1rem';
    
    field.appendChild(marker);

    enableDrag(marker);
}

// function to enable dragging of markers
function enableDrag(marker) {
    marker.addEventListener('mousedown', (e) => {
        currentMarker = marker;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        marker.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!currentMarker) return;

        const rect = field.getBoundingClientRect();
        let x = e.clientX - rect.left - offsetX;
        let y = e.clientY - rect.top - offsetY;

        currentMarker.style.left = x + 'rem';
        currentMarker.style.top = y + 'rem';
    });

    document.addEventListener('mouseup', () => {
        if (currentMarker) {
            currentMarker.style.cursor = 'grab';
        }
        currentMarker = null;
    });

}

// Set up the LOS
function setupLOS() {
    const yard = document.getElementById('losInput').value;
    if (yard < 0 || yard > 100) return;

    const losLine = document.getElementById('losLine');
    losLine.style.left = (yard * 1) + 'rem';
    losLine.style.display = 'block';

}

//  Reset the field
function resetField() {
    document.querySelectorAll('.marker').forEach(m => m.remove());
    document.getElementById('losLine').style.display = 'none';
    document.getElementById('losInput').value = '';

}