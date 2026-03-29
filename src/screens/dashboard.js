export function render() {
  const container = document.createElement('div');
  container.className = 'dashboard-content animate-fade-in';
  container.style.padding = '3rem 4rem';
  
  // Local state simulation
  let medTaken = false;

  const showNotification = (msg) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed; top: 40px; right: 40px; background: var(--primary); color: white; padding: 16px 32px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); z-index: 10000; font-weight: 700; font-size: 1rem; animation: slideIn 0.5s ease;
    `;
    notification.innerText = msg;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      notification.style.transition = 'all 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  const updateUI = () => {
    container.innerHTML = `
        <section style="background: linear-gradient(135deg, var(--primary) 0%, #06B6D4 100%); padding: 3rem; border-radius: 24px; color: white; margin-bottom: 3rem; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 166, 251, 0.2);">
          <div style="position: relative; z-index: 2;">
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: white;">${window.t('hello')}, John Doe! 👋</h1>
            <p style="font-size: 1.125rem; opacity: 0.9;">${window.t('today_summary')}</p>
          </div>
          <svg style="position: absolute; right: -50px; bottom: -50px; opacity: 0.1; color: white;" width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        </section>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
          <div style="display: flex; flex-direction: column; gap: 3rem;">
            <div>
              <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 12px;"><span style="display: block; width: 12px; height: 12px; border-radius: 50%; background: #EF4444;"></span>${window.t('urgent_reminders')}</h2>
              <div class="card" style="border-left: 6px solid ${medTaken ? '#10B981' : '#F59E0B'}; background: ${medTaken ? '#ECFDF5' : '#FFFBEB'}; display: flex; align-items: center; gap: 2rem; padding: 1.5rem 2rem;">
                <div style="font-size: 2rem;">${medTaken ? '✅' : '💊'}</div>
                <div><h3 style="font-size: 1.125rem; margin-bottom: 4px;">${medTaken ? window.t('medication_success') : window.t('take_medication')}</h3><p style="color: var(--text-muted); font-size: 0.9375rem;">${medTaken ? window.t('next_dose_info') : window.t('medication_time')}</p></div>
                ${!medTaken ? `<button id="med-btn" class="btn-primary" style="width: auto; margin-left: auto; padding: 10px 24px;">${window.t('taken_button')}</button>` : ''}
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <div class="card" style="padding: 2.5rem; border-top: 4px solid var(--primary);"><p style="color: var(--text-muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase;">${window.t('medical_id')}</p><p style="font-size: 2rem; font-weight: 800; margin: 8px 0; letter-spacing: 1px;">BN-2026-8890</p></div>
              <div class="card" style="padding: 2.5rem; border-top: 4px solid #10B981;"><p style="color: var(--text-muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase;">${window.t('insurance')}</p><p style="font-size: 2rem; font-weight: 800; color: #10B981; margin: 8px 0;">${window.t('insurance_id')}</p><p style="font-size: 0.8125rem; color: #10B981; font-weight: 600;">✓ ${window.t('active')}</p></div>
            </div>
            <div class="card" style="padding: 0; overflow: hidden; border: 1px solid var(--border-color);">
              <div style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color); background: #F8FAFC; display: flex; justify-content: space-between; align-items: center;"><h3 style="font-size: 1.25rem;">${window.t('last_visit')}</h3><span style="font-size: 0.875rem; color: var(--text-muted); font-weight: 600;">01/03/2026</span></div>
              <div style="padding: 2.5rem; display: flex; align-items: center; gap: 2.5rem;">
                <img src="/src/assets/doctor_1.png" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                <div style="flex: 1;"><h4 style="font-size: 1.25rem; margin-bottom: 4px;">Dr. James Wilson</h4><p style="color: var(--primary); font-weight: 700; font-size: 0.875rem; margin-bottom: 12px;">${window.t('cardiology')}</p><p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6;">${window.t('last_visit_note')}</p></div>
                <button class="btn-secondary" style="width: auto;" onclick="alert('${window.t('simulating')}')">${window.t('view_details')}</button>
              </div>
            </div>
            <div>
              <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${window.t('lab_results')}</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                 <div class="card" style="display: flex; align-items: center; gap: 1.5rem; cursor: pointer;" onclick="showNotification('${window.t('opening_doc')}')">
                   <div style="width: 52px; height: 52px; background: #F0F9FF; color: var(--primary); border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                   </div>
                   <div><p style="font-weight: 700;">${window.t('blood_test')}</p><p style="font-size: 0.8125rem; color: #10B981; font-weight: 700;">${window.t('normal')}</p></div>
                 </div>
                 <div class="card" style="display: flex; align-items: center; gap: 1.5rem; cursor: pointer;" onclick="showNotification('${window.t('opening_doc')}')">
                   <div style="width: 52px; height: 52px; background: #ECFDF5; color: #10B981; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                   </div>
                   <div><p style="font-weight: 700;">${window.t('xray_chest')}</p><p style="font-size: 0.8125rem; color: #10B981; font-weight: 700;">${window.t('normal')}</p></div>
                 </div>
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 3rem;">
            <div class="card" style="background: #FFFBEB; border: 1px solid #FEF3C7; padding: 2rem;">
              <h3 style="font-size: 1.125rem; color: #92400E; margin-bottom: 12px; border-bottom: 1px solid #FDE68A; padding-bottom: 8px;">${window.t('health_tip')}</h3>
              <p style="font-size: 0.9375rem; color: #92400E; line-height: 1.6; font-weight: 500;">${window.t('tip_content')}</p>
            </div>
            <div>
              <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${window.t('coming_up')}</h2>
              <div class="card" style="padding: 0; overflow: hidden; border: 2px solid #E0F2FE;">
                <div style="background: #F0F9FF; padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                  <div style="background: white; padding: 10px; border-radius: 12px; text-align: center; min-width: 65px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                    <p style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">${window.t('mar')}</p>
                    <p style="font-size: 1.5rem; font-weight: 800;">15</p>
                  </div>
                  <div><p style="font-weight: 700; font-size: 1.125rem;">Dr. James Wilson</p></div>
                </div>
                <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 12px;">
                  <button class="btn-primary" style="padding: 12px; font-size: 0.875rem;" onclick="showNotification('${window.t('opening_doc')}')">${window.t('view_instructions')}</button>
                  <button class="btn-secondary" style="padding: 12px; font-size: 0.875rem;" onclick="window.location.hash='#/book'">${window.t('reschedule')}</button>
                </div>
              </div>
            </div>
            <div>
              <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${window.t('quick_tools')}</h2>
              <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                <button class="card" onclick="showNotification('${window.t('simulating')}')" style="display: flex; align-items: center; gap: 15px; width: 100%; padding: 1.75rem; text-align: left; cursor: pointer; border: 1px solid var(--border-color);"><span style="font-size: 2rem;">💬</span><div><p style="font-weight: 800; font-size: 1.125rem;">${window.t('ask_specialist')}</p></div></button>
                <button class="card" onclick="showNotification('${window.t('opening_doc')}')" style="display: flex; align-items: center; gap: 15px; width: 100%; padding: 1.75rem; text-align: left; cursor: pointer; border: 1px solid var(--border-color);"><span style="font-size: 2rem;">📁</span><div><p style="font-weight: 800; font-size: 1.125rem;">${window.t('manage_docs')}</p></div></button>
              </div>
            </div>
          </div>
        </div>
    `;

    const btn = container.querySelector('#med-btn'); 
    if (btn) btn.addEventListener('click', () => { 
      medTaken = true; 
      updateUI(); 
      showNotification(window.t('medication_success'));
    });
  };

  updateUI();
  return container;
}
