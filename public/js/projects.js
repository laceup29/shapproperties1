/* ============================================
   SHARP PROPERTIES — PROJECTS MODULE
   ============================================ */

const ProjectsModule = {
  init() {
    this.renderProjectGrid();
    this.renderProjectFilters();
    this.renderProjectDetail();
    this.handleFilters();
  },

  renderProjectGrid(containerId = 'projects-grid', projectsData = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = projectsData || (typeof PROJECTS !== 'undefined' ? PROJECTS : []);

    if (!data.length) {
      container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;grid-column:1/-1;padding:60px 0;">No projects found.</p>';
      return;
    }

    container.innerHTML = data.map(project => `
      <div class="project-card reveal" data-category="${project.category}">
        <div class="project-card-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy"
               onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 500%22%3E%3Crect fill=%22%23292929%22 width=%22800%22 height=%22500%22/%3E%3Ctext fill=%22%23555%22 font-family=%22Arial%22 font-size=%2224%22 text-anchor=%22middle%22 x=%22400%22 y=%22250%22%3E${encodeURIComponent(project.title)}%3C/text%3E%3C/svg%3E'">
          <span class="project-card-category">${project.category}</span>
        </div>
        <div class="project-card-content">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${project.location}
          </p>
          <a href="/project-details.html?id=${project.id}" class="project-card-link">
            View Project <span>→</span>
          </a>
        </div>
      </div>
    `).join('');

    // Re-init reveal animations for new elements
    if (typeof ScrollAnimations !== 'undefined') {
      ScrollAnimations.revealElements();
    }
  },

  renderProjectFilters() {
    const container = document.getElementById('project-filters');
    if (!container) return;

    const categories = ['All', 'Construction', 'Residential', 'Commercial', 'Renovation', 'Design & Build', 'Infrastructure'];

    container.innerHTML = categories.map(cat => `
      <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-filter="${cat}">
        ${cat}
      </button>
    `).join('');
  },

  handleFilters() {
    const container = document.getElementById('project-filters');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('#projects-grid .project-card');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'All' || category === filter) {
          card.style.display = '';
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.style.display = 'none';
          card.classList.remove('visible');
        }
      });
    });
  },

  renderProjectDetail() {
    const container = document.getElementById('project-detail');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      container.innerHTML = this.getNotFoundHTML();
      return;
    }

    const projects = typeof PROJECTS !== 'undefined' ? PROJECTS : [];
    const project = projects.find(p => p.id === id);

    if (!project) {
      container.innerHTML = this.getNotFoundHTML();
      return;
    }

    document.title = `${project.title} | Sharp Properties`;

    container.innerHTML = `
      <section class="project-detail-hero">
        <div class="container">
          <h1 class="section-title">${project.title}</h1>
          <div class="project-detail-meta">
            <div class="project-detail-meta-item">
              <span class="project-detail-meta-label">Category</span>
              <span class="project-detail-meta-value">${project.category}</span>
            </div>
            <div class="project-detail-meta-item">
              <span class="project-detail-meta-label">Location</span>
              <span class="project-detail-meta-value">${project.location}</span>
            </div>
            <div class="project-detail-meta-item">
              <span class="project-detail-meta-label">Status</span>
              <span class="project-detail-meta-value">${project.details.status}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-primary">
        <div class="container">
          <div class="project-detail-gallery">
            <div class="project-detail-gallery-item">
              <img src="${project.image}" alt="${project.title}" onerror="this.parentElement.style.background='var(--bg-secondary)'">
            </div>
            <div class="project-detail-gallery-item">
              <img src="${project.image}" alt="${project.title} detail" onerror="this.parentElement.style.background='var(--bg-secondary)'">
            </div>
          </div>

          <div class="project-detail-content">
            <div>
              <div class="gold-line"></div>
              <h2 class="section-title" style="font-size:clamp(24px,3vw,36px);">Project Overview</h2>
              <p style="color:var(--text-secondary);line-height:1.8;margin-bottom:32px;">${project.overview}</p>

              <h3 style="font-family:var(--font-primary);font-size:18px;font-weight:700;text-transform:uppercase;color:var(--white);margin-bottom:16px;">Scope of Work</h3>
              <ul class="scope-list">
                ${project.scope.map(item => `<li>${item}</li>`).join('')}
              </ul>

              <h3 style="font-family:var(--font-primary);font-size:18px;font-weight:700;text-transform:uppercase;color:var(--white);margin:32px 0 16px;">Project Process</h3>
              <div class="process-timeline" style="display:flex;gap:16px;flex-wrap:wrap;">
                ${project.process.map((step, i) => `
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--gold);color:var(--bg-dark);font-family:var(--font-primary);font-size:12px;font-weight:700;">${String(i + 1).padStart(2, '0')}</span>
                    <span style="font-size:14px;color:var(--text-secondary);">${step}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="project-detail-sidebar">
              <h4 class="sidebar-title">Project Details</h4>
              <div class="sidebar-item">
                <span class="sidebar-item-label">Type</span>
                <span class="sidebar-item-value">${project.details.type}</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-item-label">Area</span>
                <span class="sidebar-item-value">${project.details.area}</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-item-label">Duration</span>
                <span class="sidebar-item-value">${project.details.duration}</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-item-label">Status</span>
                <span class="sidebar-item-value">${project.details.status}</span>
              </div>
              <div class="sidebar-item">
                <span class="sidebar-item-label">Location</span>
                <span class="sidebar-item-value">${project.location}</span>
              </div>
              <a href="/contact.html" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:24px;">
                DISCUSS YOUR PROJECT
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  getNotFoundHTML() {
    return `
      <section class="section" style="min-height:50vh;display:flex;align-items:center;justify-content:center;text-align:center;">
        <div class="container">
          <div class="page-404-number">404</div>
          <h2 class="section-title">PROJECT NOT FOUND</h2>
          <p style="color:var(--text-secondary);margin-bottom:32px;">The project you are looking for could not be found.</p>
          <a href="/projects.html" class="btn btn-primary">VIEW ALL PROJECTS →</a>
        </div>
      </section>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => ProjectsModule.init());
