document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. LOGICA DEL BACKGROUND (NETWORK)
    // ------------------------------------
    const canvas = document.getElementById('network');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // MODIFICA: Imposta il numero massimo di particelle a 600
    const maxParticles = 600;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            
            // MODIFICA: Imposta il raggio piccolo (tra 1 e 2.5 pixel)
            this.radius = Math.random() * 1.5 + 1; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        // La soglia di 100 pixel è buona per 600 particelle piccole
        const threshold = 100;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < threshold) {
                    const opacity = 1 - (distance / threshold);
                    ctx.strokeStyle = `rgba(100, 100, 100, ${opacity * 0.1})`; // Resa ancora più sottile e discreta
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        drawLines();
        particles.forEach(p => {
            p.update();
            p.draw();
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();


    // ------------------------------------
    // 2. LOGICA CONTROLLI MUSICA
    // ------------------------------------
    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');

    // Imposta il volume iniziale basso
    music.volume = parseFloat(volumeSlider.value);

    // Gestisce play/pause
    toggleButton.addEventListener('click', () => {
        if (music.paused) {
            music.play().catch(e => console.log("User interaction required to play audio."));
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            toggleButton.classList.remove('paused');
        } else {
            music.pause();
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            toggleButton.classList.add('paused');
        }
    });

    // Gestisce il cambio di volume
    volumeSlider.addEventListener('input', (e) => {
        music.volume = parseFloat(e.target.value);
    });

    // Aggiusta il pulsante se la musica parte automaticamente
    music.addEventListener('play', () => {
        toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        toggleButton.classList.remove('paused');
    });

    // Aggiusta il pulsante se la musica non parte automaticamente (per restrizioni browser)
    music.addEventListener('pause', () => {
        // Controlla se è stata l'azione di pausa dell'utente o una restrizione del browser
        if (!toggleButton.classList.contains('paused')) {
             toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
});
