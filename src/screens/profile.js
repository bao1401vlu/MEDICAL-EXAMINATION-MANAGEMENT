export function render() {
  const container = document.createElement('div');
  container.className = 'profile-content animate-fade-in';
  
  const doctor = window.state.selectedDoctor;

  container.innerHTML = `
    <header style="background: white; border-bottom: 1px solid var(--border-color); padding: 1.5rem 4rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
      <h2 style="font-size: 1.5rem; font-weight: 800;">${window.t('view_profile')}</h2>
      <button class="btn-secondary" style="width: auto; padding: 12px 24px; font-weight: 700;" onclick="window.goBack()">
        ← ${window.t('back')}
      </button>
    </header>
    <main style="padding: 4rem; display: grid; grid-template-columns: 380px 1fr; gap: 5rem; max-width: 1400px; margin: 0 auto;">
      <aside class="left-col">
        <div class="card" style="padding: 0; overflow: hidden; text-align: center; border: 1px solid var(--border-color); box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <img src="${doctor.img}" style="width: 100%; height: 400px; object-fit: cover;" />
          <div style="padding: 2rem;">
            <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">${doctor.name}</h2>
            <span style="background: #E0F2FE; color: var(--primary); padding: 6px 16px; border-radius: 100px; font-size: 1rem; font-weight: 700;">${window.t(doctor.specialty)}</span>
          </div>
        </div>
      </aside>
      <section class="right-col">
        <h3 style="font-size: 2rem; font-weight: 800; margin-bottom: 2rem;">${window.t('about_doctor')}</h3>
        <p style="color: var(--text-muted); font-size: 1.25rem; line-height: 1.8; margin-bottom: 3rem;">
          ${doctor.name} is a distinguished specialist in ${window.t(doctor.specialty)} with over 15 years of experience in leading medical institutions. 
          Dedicated to providing compassionate care and utilizing the latest medical advancements to ensure optimal health outcomes for all patients.
        </p>
        <div class="card" style="background: white; border: 1px solid #E0F2FE; padding: 3rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 20px 40px rgba(0, 166, 251, 0.05); border-radius: 24px;">
          <div><p style="color: var(--text-muted); font-weight: 700; font-size: 1rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">${window.t('consultation_fee')}</p><p style="font-size: 3.5rem; font-weight: 900; color: var(--text-main);">${window.fCurrency(doctor.fee)}</p></div>
          <button class="btn-primary" style="width: auto; padding: 20px 60px; font-size: 1.125rem; font-weight: 800; border-radius: 100px; box-shadow: 0 12px 24px rgba(0, 166, 251, 0.25);" onclick="window.location.hash='#/book'">${window.t('book_appointment')}</button>
        </div>
      </section>
    </main>
  `;
  return container;
}
