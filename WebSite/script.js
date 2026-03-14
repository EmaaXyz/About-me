// ── Loader (il failsafe inline in <head> copre i casi estremi) ───
setTimeout(function() {
  var loader = document.getElementById("loading");
  if (loader) loader.style.display = "none";
}, 1500);

// ── Typewriter ───────────────────────────────────────────────────
var text = "Junior Developer";
var i = 0;
function typeWriter() {
  var el = document.getElementById("typewriter");
  if (!el) return;
  if (i < text.length) {
    el.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 150);
  }
}
typeWriter();

// ── Nav scroll ───────────────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('nav-active-anim');
    var self = this;
    setTimeout(function() { self.classList.remove('nav-active-anim'); }, 400);
    var targetSection = document.querySelector(self.getAttribute('href'));
    var container = document.getElementById('main-scroll-container');
    if (targetSection && container) {
      container.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
    }
  });
});

// ── Particles ────────────────────────────────────────────────────
if (typeof particlesJS !== 'undefined') {
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
} else {
  console.warn("particles.js non caricato");
}

// ── GitHub API (DOM API — zero XSS) ─────────────────────────────
var user = "EmaaXyz";

fetch("https://api.github.com/users/" + user)
  .then(function(r) { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(function(d) {
    var img = document.getElementById("github-avatar");
    if (img && typeof d.avatar_url === "string") img.src = d.avatar_url;
  })
  .catch(function(err) { console.warn("GitHub user fetch failed:", err); });

fetch("https://api.github.com/users/" + user + "/repos?sort=updated&per_page=30")
  .then(function(r) { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(function(repos) {
    var container = document.getElementById("projects-container");
    if (!container || !Array.isArray(repos)) return;
    repos
      .filter(function(repo) { return !repo.fork; })
      .forEach(function(repo) {
        var card   = document.createElement("div");
        card.className = "project";
        var anchor = document.createElement("a");
        anchor.href   = repo.html_url;
        anchor.target = "_blank";
        anchor.rel    = "noopener noreferrer";
        var title  = document.createElement("h3");
        title.textContent = repo.name;
        var desc   = document.createElement("p");
        desc.textContent  = repo.description || "GitHub Project";
        anchor.appendChild(title);
        anchor.appendChild(desc);
        card.appendChild(anchor);
        container.appendChild(card);
      });
  })
  .catch(function(err) { console.warn("GitHub repos fetch failed:", err); });

// ── Percentage counter — requestAnimationFrame (120fps) ──────────
function animatePercentage(el, target) {
  var duration = 1400;
  var start = performance.now();
  function step(now) {
    var elapsed  = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + "%";
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── ScrollReveal ─────────────────────────────────────────────────
function activateSkills() {
  var python = document.querySelector(".python");
  var cs     = document.querySelector(".cs");
  var java   = document.querySelector(".java");
  if (python) python.style.width = "85%";
  if (cs)     cs.style.width     = "50%";
  if (java)   java.style.width   = "100%";
  document.querySelectorAll(".percent").forEach(function(p) {
    p.style.opacity = "1";
    animatePercentage(p, parseInt(p.dataset.value, 10));
  });
}

if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal().reveal("section", {
    container:   ".scroll-container",
    distance:    "60px",
    duration:    900,
    origin:      "bottom",
    interval:    150,
    viewFactor:  0.2
  });
  ScrollReveal().reveal("#skills", {
    container:    ".scroll-container",
    afterReveal:  activateSkills
  });
} else {
  // Fallback: attiva le skills subito senza animazione di rivelazione
  console.warn("ScrollReveal non caricato, fallback immediato");
  activateSkills();
}