const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const points = [];
const POINTS_COUNT = 600;
const MAX_DISTANCE = 120;

for(let i = 0; i < POINTS_COUNT; i++){
    let speed = Math.random() * 2 + 2;
    points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: ((Math.random() * 2 + 1) * 2) * 2/3
    });
}

function update() {
    ctx.clearRect(0, 0, width, height);

    for(let i = 0; i < POINTS_COUNT; i++){
        let p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if(p.x < 0) { p.x = 0; p.vx *= -1; }
        if(p.x > width) { p.x = width; p.vx *= -1; }
        if(p.y < 0) { p.y = 0; p.vy *= -1; }
        if(p.y > height) { p.y = height; p.vy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
        ctx.fillStyle = '#888';
        ctx.fill();
    }

    for(let i = 0; i < POINTS_COUNT; i++){
        for(let j = i+1; j < POINTS_COUNT; j++){
            let p1 = points[i];
            let p2 = points[j];
            let dx = p1.x - p2.x;
            let dy = p1.y - p2.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < MAX_DISTANCE){
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(200,200,200,${1 - dist / MAX_DISTANCE})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(update);
}

update();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// LOGICA CONTROLLI MUSICA
const audio = document.getElementById('background-music');
const toggleButton = document.getElementById('toggle-music');
const volumeSlider = document.getElementById('volume-slider');

// Imposta lo stato iniziale (mutato, perché l'autoplay è spesso bloccato)
toggleButton.classList.add('paused');
toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; 
audio.volume = volumeSlider.value; // Sincronizza il volume iniziale

toggleButton.addEventListener('click', () => {
    if (audio.paused) {
        // Tenta di riprodurre
        audio.play().catch(error => {
            console.log("Autoplay bloccato:", error);
        });
        toggleButton.classList.remove('paused');
        toggleButton.innerHTML = (audio.volume == 0) ? '<i class="fas fa-volume-off"></i>' : '<i class="fas fa-volume-up"></i>';
    } else {
        audio.pause();
        toggleButton.classList.add('paused');
        toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    // Aggiorna l'icona del volume in base al livello e allo stato
    if (audio.volume == 0) {
        toggleButton.innerHTML = '<i class="fas fa-volume-off"></i>';
        if (!audio.paused) audio.pause(); // Metti in pausa se il volume è zero
        toggleButton.classList.add('paused');
    } else if (audio.paused) {
        toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } 
    else {
        toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        if (audio.paused) audio.play(); // Fai ripartire se si alza il volume da 0
        toggleButton.classList.remove('paused');
    }
});
