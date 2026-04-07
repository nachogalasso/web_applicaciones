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

    marker.style.left = '10px';
    marker.style.top = '10px';
    
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

        currentMarker.style.left = x + 'px';
        currentMarker.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (currentMarker) {
            currentMarker.style.cursor = 'grab';
        }
        currentMarker = null;
    });

}

// Set up the LOS
function isVerticalField() {
    const field = document.getElementById("field");
    return field.offsetHeight > field.offsetWidth;
}


function setupLOS() {
    const yard = parseInt(document.getElementById('losSlider').value);
    if (isNaN(yard)) return;
    const absoluteYard = yard + 10;

    // To display the LOS line
    const losLine = document.getElementById('losLine');
    if (isVerticalField()) {
        losLine.style.top = (absoluteYard * 10) + 'px';
        losLine.style.left = '0px';
    } else {
        losLine.style.left = (absoluteYard * 10) + 'px';
        losLine.style.top = '0px';
    }

    losLine.style.display = 'block';

    // Display football-style text
    let displayText = "";

    if (yard < 50) {
        displayText = "A-" + yard;
    } else if (yard === 50) {
        displayText = "50";
    } else {
        displayText = "B-" + (100 - yard);
    }

    document.getElementById('losDisplay').innerText = "LOS: " + displayText;
    
}

//  Reset the field
function resetField() {
    document.querySelectorAll('.marker').forEach(m => m.remove());
    document.getElementById('losLine').style.display = 'none';
    document.getElementById('losInput').value = '';

}