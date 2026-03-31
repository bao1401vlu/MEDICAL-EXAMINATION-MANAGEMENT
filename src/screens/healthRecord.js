export function render() {
  const container = document.createElement('div');
  container.className = 'health-record-content animate-fade-in';
  container.style.padding = '4rem';
  
  const record = window.state.healthRecord || {};
  const allergies = record.allergies || window.t('no_known_allergies');

  container.innerHTML = `
      <header style="margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; font-weight: 900; letter-spacing: -1px;">${window.t('health_record')}</h1>
        <p style="color: var(--text-muted); font-size: 1.125rem; margin-top: 0.5rem;">Comprehensive overview of your medical background.</p>
      </header>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; max-width: 1200px;">
        <div class="card" style="padding: 2.5rem; border-top: 6px solid #EF4444; position: relative; overflow: hidden;">
           <div style="position: absolute; right: -10px; top: -10px; font-size: 5rem; opacity: 0.05; color: #EF4444;">🩸</div>
           <p style="font-size: 0.8125rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1rem;">${window.t('blood_type')}</p>
           <p style="font-size: 3rem; font-weight: 900; color: #EF4444;">${record.bloodType || 'N/A'}</p>
        </div>
        
        <div class="card" style="padding: 2.5rem; border-top: 6px solid #F59E0B; position: relative; overflow: hidden;">
           <div style="position: absolute; right: -10px; top: -10px; font-size: 5rem; opacity: 0.05; color: #F59E0B;">⚠️</div>
           <p style="font-size: 0.8125rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1rem;">${window.t('allergies')}</p>
           <p style="font-size: 1.5rem; font-weight: 700; color: ${record.allergies ? '#D97706' : '#10B981'};">${allergies}</p>
        </div>
        
        <div class="card" style="padding: 2.5rem; border-top: 6px solid var(--primary); position: relative; overflow: hidden;">
           <div style="position: absolute; right: -10px; top: -10px; font-size: 5rem; opacity: 0.05; color: var(--primary);">📋</div>
           <p style="font-size: 0.8125rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1rem;">${window.t('diagnosis')}</p>
           <p style="font-size: 1.5rem; font-weight: 700;">${record.diagnosis || 'None Reported'}</p>
        </div>
      </div>

      <div style="margin-top: 4rem; max-width: 1200px;">
        <h2 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 2rem;">Laboratory & Diagnostics</h2>
        <div class="card" style="padding: 0; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color);">
                <th style="padding: 1.5rem 2.5rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">Test Name</th>
                <th style="padding: 1.5rem 2.5rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">Date Reported</th>
                <th style="padding: 1.5rem 2.5rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">Status</th>
                <th style="padding: 1.5rem 2.5rem; text-align: right;"></th>
              </tr>
            </thead>
            <tbody>
              ${record.labResults?.map((res, idx) => `
                <tr style="border-bottom: 1px solid var(--border-color); background: white;">
                  <td style="padding: 1.5rem 2.5rem; font-weight: 800; font-size: 1.125rem;">${window.t(res.name)}</td>
                  <td style="padding: 1.5rem 2.5rem; color: var(--text-muted); font-weight: 600;">${res.date}</td>
                  <td style="padding: 1.5rem 2.5rem;"><span style="background: #ECFDF5; color: #10B981; padding: 6px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; border: 1px solid #D1FAE5;">✓ ${window.t(res.status)}</span></td>
                  <td style="padding: 1.5rem 2.5rem; text-align: right;"><button class="btn-secondary btn-view-details" data-idx="${idx}" style="padding: 8px 16px; font-size: 0.8125rem;">${window.t('view_details')}</button></td>
                </tr>
              `).join('') || `<tr><td colspan="4" style="padding: 3rem; text-align: center;">No lab results found.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.onclick = () => {
        const idx = btn.getAttribute('data-idx');
        const res = record.labResults[idx];
        window.showModal(window.t(res.name), res.details);
      };
    });

    container.insertAdjacentHTML('beforeend', `
      <div class="card" style="margin-top: 3rem; padding: 2.5rem; background: #F8FAFC; border: 1px dashed #CBD5E1; max-width: 1200px;">
        <h3 style="font-size: 1.125rem; margin-bottom: 0.75rem;">Information Statement</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">This record is compiled from your previous laboratory results and physician notes within the MediPortal network. If you notice any inaccuracies, please contact your primary care provider immediately.</p>
      </div>
  `);
  return container;
}
