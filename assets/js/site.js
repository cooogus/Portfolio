(function(){
    const btn = document.querySelector('.menu-toggle');
    const menu = document.getElementById('sidemenu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        menu.classList.toggle('open', !open);
      });
      const mq = window.matchMedia('(max-width: 820px)');
      if (mq && mq.addEventListener) {
        mq.addEventListener('change', (e) => {
          if (!e.matches) { // switched to desktop
            btn.setAttribute('aria-expanded','false');
            menu.classList.remove('open');
          }
        });
      }
      // Close menu when a link is clicked (mobile)
      menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          btn.setAttribute('aria-expanded','false');
          menu.classList.remove('open');
        }
      });
    }
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  })();
  
  (function(){
    const pills = document.querySelectorAll('.filters .pill');
    const grid = document.getElementById('projects-grid');
    if (!pills.length || !grid) return;   // not on projects page
  
    const cards = Array.from(grid.querySelectorAll('.card'));
    const cwNotice = document.getElementById('cw-notice');
  
    function applyFilter(kind){
      cards.forEach(card => {
        const tags = (card.dataset.tags || '')
          .split(',')
          .map(s => s.trim().toLowerCase());
        const show = (kind === 'all') ? true : tags.includes(kind);
        card.style.display = show ? '' : 'none';
      });
      if (cwNotice) cwNotice.hidden = (kind !== 'coursework');
    }
  
    pills.forEach(p => {
      p.addEventListener('click', () => {
        pills.forEach(x => x.setAttribute('aria-pressed','false'));
        p.setAttribute('aria-pressed','true');
        applyFilter(p.dataset.filter);
      });
    });
  
    // Initialize based on the pill marked aria-pressed="true" (defaults to All)
    const active = Array.from(pills).find(x => x.getAttribute('aria-pressed') === 'true') || pills[0];
    applyFilter(active ? active.dataset.filter : 'all');
  })();
  
  (function () {
    const pills = document.querySelectorAll('.filters .pill');
    const grid  = document.getElementById('posts-grid');
    if (!pills.length || !grid) return; // not on blog page
  
    const posts = Array.from(grid.querySelectorAll('article.card'));
  
    function applyFilter(kind) {
      const k = (kind || 'all').toLowerCase();
      posts.forEach(post => {
        const type = (post.dataset.kind || '').toLowerCase();
        const show = (k === 'all') ? true : (type === k);
        post.style.display = show ? '' : 'none';
      });
    }
  
    pills.forEach(p => {
      p.addEventListener('click', () => {
        pills.forEach(x => x.setAttribute('aria-pressed', 'false'));
        p.setAttribute('aria-pressed', 'true');
        applyFilter(p.dataset.filter);
      });
    });
  
    // Initialize based on the pill marked aria-pressed="true"
    const active = Array.from(pills).find(x => x.getAttribute('aria-pressed') === 'true') || pills[0];
    applyFilter(active ? active.dataset.filter : 'all');
  })();


  