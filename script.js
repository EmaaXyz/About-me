setTimeout(() => document.getElementById("loading").style.display = "none", 1500);

const text = "Junior Developer";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 200);
  }
}
typeWriter();

particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#666" },
    size: { value: 3 },
    move: { speed: 1 },
    links: { enable: true, color: "#333" }
  }
});

fetch("https://api.github.com/users/mark3syt")
  .then(r => r.json())
  .then(d => document.getElementById("github-avatar").src = d.avatar_url);

fetch("https://api.github.com/users/mark3syt/repos")
  .then(r => r.json())
  .then(repos => {
    const c = document.getElementById("projects-container");
    repos.forEach(repo => {
      const d = document.createElement("div");
      d.className = "project";
      d.innerHTML = `<a href="${repo.html_url}" target="_blank"><h3>${repo.name}</h3><p>${repo.description || "No description"}</p></a>`;
      c.appendChild(d);
    });
  });

function animatePercentage(el, target) {
  let current = 0;
  const interval = setInterval(() => {
    current++;
    el.innerText = current + "%";
    if (current >= target) clearInterval(interval);
  }, 20);
}

ScrollReveal().reveal("section", { distance: "60px", duration: 900, origin: "bottom", interval: 150 });
ScrollReveal().reveal("#skills", {
  afterReveal: () => {
    document.querySelector(".python").style.width = "60%";
    document.querySelector(".cs").style.width = "25%";
    document.querySelector(".java").style.width = "85%";
    document.querySelectorAll(".percent").forEach(p => animatePercentage(p, p.dataset.value));
  }
});

document.querySelectorAll('.bottom-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const start = window.pageYOffset;
    const end = target.offsetTop;
    const duration = 800;
    let startTime = null;

    function animateScroll(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const ease = progress/duration < 0.5
        ? 2*(progress/duration)**2
        : 1 - Math.pow(-2*(progress/duration)+2, 2)/2;
      window.scrollTo(0, start + (end - start) * ease);
      if (progress < duration) requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);
  });
});
