export function render() {
  const container = document.createElement('div');
  container.className = 'search-page animate-fade-in';
  
  const doctors = [
    { name: 'Dr. James Wilson', specialty: 'cardiology', img: '/src/assets/doctor_1.png', fee: 150 },
    { name: 'Dr. Sarah Lee', specialty: 'dermatology', img: '/src/assets/doctor_2.png', fee: 120 },
    { name: 'Dr. Robert Chen', specialty: 'neurology', img: '/src/assets/doctor_3.png', fee: 180 },
    { name: 'Dr. Emily Watson', specialty: 'pediatrics', img: '/src/assets/doctor_4.png', fee: 100 }
  ];

  const selectDoctor = (doc) => {
    window.state.selectedDoctor = doc;
    window.location.hash = '#/profile';
  };

  container.innerHTML = `
    <section class="hero-banner" style="background: linear-gradient(135deg, #E0F2FE 0%, #FFFFFF 100%); padding: 5rem 4rem; text-align: center; border-bottom: 1px solid var(--border-color);">
      <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem;">${window.t('find_right_doctor')}</h1>
      <div class="search-box" style="background: white; padding: 10px; border-radius: 100px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); max-width: 900px; margin: 0 auto; display: flex; gap: 10px; align-items: center; border: 1px solid var(--border-color);">
        <div style="flex: 2; position: relative; padding-left: 30px;">
          <svg style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--text-muted)" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" id="search-input" placeholder="${window.t('search_placeholder')}" style="border: none; box-shadow: none; padding: 15px 15px 15px 35px; font-size: 1.125rem; width: 100%;" />
        </div>
        <div style="flex: 1; border-left: 1px solid var(--border-color);"><select style="width: 100%; border: none; padding: 15px 25px; background: transparent; cursor: pointer; color: var(--text-main); font-weight: 600; font-size: 1rem;">
          <option>${window.t('select_specialty')}</option>
          <option>${window.t('cardiology')}</option>
          <option>${window.t('dermatology')}</option>
          <option>${window.t('pediatrics')}</option>
          <option>${window.t('neurology')}</option>
        </select></div>
        <button id="search-btn" class="btn-primary" style="width: auto; padding: 15px 40px; border-radius: 100px; font-size: 1rem; font-weight: 700;">${window.t('search_button')}</button>
      </div>
    </section>
    <main style="padding: 4rem;">
      <div id="doctor-grid" class="doctor-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; max-width: 1400px; margin: 0 auto;">
        ${doctors.map((doc, idx) => `
          <div class="card doc-card" data-idx="${idx}" style="padding: 0; overflow: hidden; cursor: pointer; border: 1px solid var(--border-color); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
            <div style="height: 300px; overflow: hidden;">
              <img src="${doc.img}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" />
            </div>
            <div style="padding: 2rem; border-top: 1px solid var(--border-color);">
              <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">${doc.name}</h3>
              <p style="color: var(--primary); font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem;">${window.t(doc.specialty)}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-top: 1rem; border-top: 1px solid #F1F5F9;">
                 <span style="color: var(--text-muted); font-size: 0.875rem; font-weight: 600;">${window.t('consultation_fee')}</span>
                 <span style="font-size: 1.25rem; font-weight: 800;">${window.fCurrency(doc.fee)}</span>
              </div>
              <button class="btn-secondary" style="width: 100%; font-size: 1rem; padding: 14px; font-weight: 700;">${window.t('view_profile')}</button>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
  `;

  container.querySelectorAll('.doc-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = card.getAttribute('data-idx');
      selectDoctor(doctors[idx]);
    });
    card.addEventListener('mouseenter', () => {
      card.querySelector('img').style.transform = 'scale(1.05)';
      card.style.borderColor = 'var(--primary)';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('img').style.transform = 'scale(1)';
      card.style.borderColor = 'var(--border-color)';
    });
  });

  const searchBtn = container.querySelector('#search-btn');
  searchBtn.addEventListener('click', () => {
    searchBtn.innerText = window.t('loading');
    setTimeout(() => {
      searchBtn.innerText = window.t('search_button');
      alert(`Simulation: Found ${doctors.length} doctors.`);
    }, 800);
  });

  return container;
}
