/* Mobile nav toggle */
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* Count-up stats */
function animateCounts(){
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target){ current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString();
    }, 16);
  });
}
window.addEventListener('load', animateCounts);

/* Load events into Home and Blog from /data/events.json */
fetch('/data/events.json').then(r => r.json()).then(data => {
  const updatesList = document.getElementById('updatesList');
  if (updatesList){
    updatesList.innerHTML = data.slice(0,5).map(ev => `<li><strong>${ev.date}</strong> — ${ev.title}</li>`).join('');
  }
  const blogList = document.getElementById('blogList');
  if (blogList){
    blogList.innerHTML = data.map(ev => `
      <article class="card">
        <h3>${ev.title}</h3>
        <p class="muted">${ev.date} • ${ev.category}</p>
        <p>${ev.excerpt}</p>
      </article>
    `).join('');
  }
  const homeGallery = document.getElementById('homeGallery');
  if (homeGallery){
    const first = data.filter(x => x.image).slice(0,6).map(x => x.image);
    homeGallery.classList.add('grid-3');
    homeGallery.innerHTML = first.map(src => `<img src="${src}" alt="Gallery photo">`).join('');
  }
}).catch(() => {/* offline okay */});

/* Simple form handlers (demo only) */
function handleForm(formId){
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());
    alert(`Thank you!\n\n${JSON.stringify(obj, null, 2)}\n\nThis demo form is not wired to a backend. See README.md to connect Formspree/Netlify Forms.`);
    form.reset();
  });
}
handleForm('pledgeForm');
handleForm('contactForm');
