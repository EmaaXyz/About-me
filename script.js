document.addEventListener('DOMContentLoaded', () => {
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
            
            // ✅ VELOCITÀ VARIABILE (da 0.5 a 2)
            // Moltiplicatore da (0.5 + 1.5) = 0.5 a 2
            const speedMultiplier = Math.random() * 1.5 + 0.5; 
            this.vx = (Math.random() - 0.5) * speedMultiplier; 
            this.vy = (Math.random() - 0.5) * speedMultiplier;
            
            // ✅ GRANDEZZA MEDIA/GRANDE (da 2 a 5 pixel di raggio)
            this.radius = Math.random() * 3 + 2; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            // ✅ PUNTINI LUMINOSI (Bianco con opacità 0.9)
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
        // ✅ LUNGHEZZA MASSIMA DELLE LINEE (Aumentata per maggiore visibilità iniziale)
        const threshold = 150; 
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < threshold) {
                    // ✅ SFUMATURA DELLE LINEE: Opacità più alta da vicino, decresce rapidamente
                    // Partiamo da un'opacità massima più alta (0.7)
                    const opacity = 1 - (distance / threshold);
                    
                    // ✅ LINEE LUMINOSE (Bianco)
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`; 
                    
                    // Spessore linea da 1 a 2 pixel per renderle più visibili
                    ctx.lineWidth = 1 + (1 - opacity); // Più spessa da vicino
                    
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


    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');

    music.volume = parseFloat(volumeSlider.value);

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

    volumeSlider.addEventListener('input', (e) => {
        music.volume = parseFloat(e.target.value);
    });

    music.addEventListener('play', () => {
        toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        toggleButton.classList.remove('paused');
    });

    music.addEventListener('pause', () => {
        if (!toggleButton.classList.contains('paused')) {
             toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
});

