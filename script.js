/* === AUDIO CONTROLS MANAGEMENT AND SMOOTH SCROLL === */

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');
    const icon = toggleButton.querySelector('i');

    // 1. GESTIONE AUDIO
    // Set initial volume from the range input value
    music.volume = parseFloat(volumeSlider.value);

    toggleButton.addEventListener('click', () => {
        if (music.paused) {
            // Attempt to start playback.
            music.play().then(() => {
                icon.classList.remove('fa-volume-off');
                icon.classList.add('fa-volume-up');
            }).catch(error => {
                console.log("Playback blocked: ", error);
            });
        } else {
            music.pause();
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-off');
        }
    });

    volumeSlider.addEventListener('input', () => {
        music.volume = parseFloat(volumeSlider.value);
    });

    // 2. SCROLL FLUIDO (SMOOTH SCROLL)
    const scrollLinks = document.querySelectorAll('.navbar a, .scroll-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previene lo scroll immediato
            e.preventDefault();

            // Ottiene l'ID della sezione
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Esegue lo scroll animato
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
