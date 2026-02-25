setTimeout(() => document.getElementById("loading").style.display = "none", 1500);

const text = "Junior Developer";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 150);
  }
}
typeWriter();

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    this.classList.add('nav-active-anim');
    setTimeout(() => {
      this.classList.remove('nav-active-anim');
    }, 400);

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const container = document.getElementById('main-scroll-container');
    
    if (targetSection && container) {
      container.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } }
  }
});

const user = "EmaaXyz";

fetch(`https://api.github.com/users/${user}`)
  .then(r => r.json())
  .then(d => document.getElementById("github-avatar").src = d.avatar_url);

fetch(`https://api.github.com/users/${user}/repos?sort=updated`)
  .then(r => r.json())
  .then(repos => {
    const c = document.getElementById("projects-container");
    repos.forEach(repo => {
      if (!repo.fork) {
        const d = document.createElement("div");
        d.className = "project";
        d.innerHTML = `<a href="${repo.html_url}" target="_blank"><h3>${repo.name}</h3><p>${repo.description || "GitHub Project"}</p></a>`;
        c.appendChild(d);
      }
    });
  });

function animatePercentage(el, target) {
  let current = 0;
  const interval = setInterval(() => {
    current++;
    el.innerText = current + "%";
    if (current >= target) clearInterval(interval);
  }, 45); 
}

ScrollReveal().reveal("section", { 
  container: ".scroll-container",
  distance: "60px", 
  duration: 900, 
  origin: "bottom", 
  interval: 150,
  viewFactor: 0.2
});

ScrollReveal().reveal("#skills", {
  container: ".scroll-container",
  afterReveal: () => {
    document.querySelector(".python").style.width = "60%";
    document.querySelector(".cs").style.width = "25%";
    document.querySelector(".java").style.width = "85%";
    document.querySelectorAll(".percent").forEach(p => {
      p.style.opacity = "1";
      animatePercentage(p, p.dataset.value);
    });
  }
});
