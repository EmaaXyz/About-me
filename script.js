document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. LOGICA DEL BACKGROUND (NETWORK)
    // ------------------------------------
    const canvas = document.getElementById('network');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    const maxParticles = 600;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // VELOCITÀ AUMENTATA (0.8 max)
            this.vx = (Math.random() - 0.5) * 0.8; 
            this.vy = (Math.random() - 0.5) * 0.8;
            
            // GRANDEZZA MEDIA/GRANDE (da 1.5 a 5 pixel di raggio)
            this.radius = Math.random() * 3.5 + 1.5; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            // PUNTINI LUMINOSI (Bianco con opacità 0.9)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
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
        // LUNGHEZZA DI ATTACCO (90 pixel)
        const threshold = 90; 
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < threshold) {
                    // LINEE LUMINOSE E SFUMATE (opacità cala con la distanza)
                    const opacity = 1 - (distance / threshold);
                    
                    // Bianco (255, 255, 255) con opacità massima 0.5
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`; 
                    
                    // Spessore sottilissimo (0.25 pixel)
                    ctx.lineWidth = 0.25; 
                    
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

    // Imposta il volume iniziale
    music.volume = parseFloat(volumeSlider.value);

    // Gestisce play/pause
    toggleButton.addEventListener('click', () => {
        if (music.paused) {
            music.play().catch(e => console.log("User interaction required to play audio."));
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            music.pause();
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Gestisce il cambio di volume
    volumeSlider.addEventListener('input', (e) => {
        music.volume = parseFloat(e.target.value);
        if (music.volume > 0 && music.paused) {
            // Se l'utente alza il volume, assicurati che il pulsante sia corretto
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else if (music.volume === 0) {
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Aggiorna l'icona quando la musica parte (per l'autoplay)
    music.addEventListener('play', () => {
        toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    });

    // Aggiorna l'icona quando la musica si ferma
    music.addEventListener('pause', () => {
        toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
});
