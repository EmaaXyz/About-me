const text = "Junior Developer";
let i = 0;
const typewriterEl = document.getElementById("typewriter");

function typeWriter() {
    if (i < text.length) {
        typewriterEl.innerHTML = text.substring(0, i + 1) + "|";
        i++;
        setTimeout(typeWriter, 150);
    } else {
        typewriterEl.innerHTML = text + "|";
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loading");
        loader.classList.add("fade-out");
        
        setTimeout(() => {
            typeWriter();
        }, 800);
    }, 1500);
});

particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#666" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#333",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1
        }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "repulse" }
        }
    }
});

fetch("https://api.github.com/users/mark3syt")
    .then(r => r.json())
    .then(d => {
        document.getElementById("github-avatar").src = d.avatar_url;
    });

fetch("https://api.github.com/users/mark3syt/repos")
    .then(r => r.json())
    .then(repos => {
        const container = document.getElementById("projects-container");
        repos.forEach(repo => {
            const card = document.createElement("div");
            card.className = "project";
            card.innerHTML = `
                <a href="${repo.html_url}" target="_blank">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description available."}</p>
                </a>
            `;
            container.appendChild(card);
        });
    });

ScrollReveal().reveal("section", {
    distance: "60px",
    duration: 900,
    origin: "bottom",
    interval: 150
});

function animatePercentage(el, target) {
    let current = 0;
    const interval = setInterval(() => {
        current++;
        el.innerText = current + "%";
        if (current >= target) clearInterval(interval);
    }, 20);
}

ScrollReveal().reveal("#skills", {
    afterReveal: () => {
        document.querySelector(".python").style.width = "40%";
        document.querySelector(".java").style.width = "65%";
        document.querySelectorAll(".percent").forEach(p => {
            p.style.opacity = 1;
            animatePercentage(p, p.dataset.value);
        });
    }
});