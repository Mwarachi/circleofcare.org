fetch('/data/events.json').then(r=>r.json()).then(data=>{
  const imgs = data.filter(x=>x.image).map(x=>x.image);
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.classList.add('grid-3');
  grid.innerHTML = imgs.map(src => `
    <figure class="card">
      <img src="${src}" alt="Circle of Care outreach photo">
    </figure>
  `).join('');
}).catch(()=>{});
