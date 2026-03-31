export function render() {
  const container = document.createElement('div');
  container.className = 'appointments-content animate-fade-in';
  container.style.padding = '4rem';
  
  const updateUI = () => {
    const appointments = [...window.state.appointments];
    
    // Date parsing helper
    const isWithin24Hours = (dateTimeStr) => {
      try {
        const [datePart, timePart] = dateTimeStr.split(' at ');
        const [day, month, year] = datePart.split('/').map(Number);
        
        // Simplistic parsing for AM/PM
        let [time, modifier] = timePart.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        
        const appointmentDate = new Date(year, month - 1, day, hours, minutes);
        const now = new Date();
        const diffInMs = appointmentDate - now;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        
        return diffInHours >= 0 && diffInHours < 24;
      } catch (e) {
        return false;
      }
    };

    container.innerHTML = `
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem;">
          <h1 style="font-size: 3rem; font-weight: 900; letter-spacing: -1px;">${window.t('appointments')}</h1>
          <button class="btn-primary" style="width: auto; padding: 16px 36px; font-size: 1.125rem; font-weight: 700; border-radius: 100px;" onclick="window.location.hash='#/search'">${window.t('book_appointment')}</button>
        </header>
        <div class="card" style="padding: 0; overflow: hidden; border: 1px solid var(--border-color); border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color);">
                <th style="padding: 2rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">${window.t('doctor_name')}</th>
                <th style="padding: 2rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">${window.t('select_specialty')}</th>
                <th style="padding: 2rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">${window.t('date_time')}</th>
                <th style="padding: 2rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">${window.t('status')}</th>
                <th style="padding: 2rem; color: var(--text-muted); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">${window.t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${appointments.length > 0 ? appointments.map((app, idx) => `
                <tr style="border-bottom: 1px solid var(--border-color); background: white; transition: background 0.2s;">
                  <td style="padding: 2rem; font-weight: 800; font-size: 1.125rem;">${app.doctor}</td>
                  <td style="padding: 2rem;"><span style="background: #E0F2FE; color: var(--primary); padding: 8px 18px; border-radius: 100px; font-size: 0.875rem; font-weight: 800; border: 1px solid #BAE6FD;">${window.t(app.specialty)}</span></td>
                  <td style="padding: 2rem; color: var(--text-main); font-weight: 600; font-size: 1rem;">${app.dateTime}</td>
                  <td style="padding: 2rem;"><span style="color: ${app.status === 'Paid' ? '#10B981' : '#F59E0B'}; font-weight: 700; font-size: 0.875rem;">✓ ${window.t(app.status?.toLowerCase()) || app.status || 'Pending'}</span></td>
                  <td style="padding: 2rem;"><button class="btn-cancel" data-idx="${idx}" style="padding: 10px 20px; font-size: 0.875rem; font-weight: 700; border: 1.5px solid #EF4444; color: #EF4444; border-radius: 10px; background: transparent; cursor: pointer; transition: all 0.2s;">${window.t('cancel')}</button></td>
                </tr>
              `).join('') : `<tr><td colspan="5" style="padding: 4rem; text-align: center; color: var(--text-muted); font-weight: 600;">No appointments found.</td></tr>`}
            </tbody>
          </table>
        </div>
    `;

    container.querySelectorAll('.btn-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-idx');
        const app = appointments[idx];
        
        if (isWithin24Hours(app.dateTime)) {
          alert(window.t('cancel_error_24h'));
          return;
        }

        if (confirm(window.t('cancel_confirm'))) {
          window.state.appointments.splice(window.state.appointments.indexOf(app), 1);
          updateUI();
        }
      });
      btn.addEventListener('mouseenter', () => { btn.style.background = '#FEF2F2'; });
      btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; });
    });
  };

  updateUI();
  return container;
}
