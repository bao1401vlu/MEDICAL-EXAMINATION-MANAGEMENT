export function render() {
  const container = document.createElement('div');
  container.className = 'book-content animate-fade-in';
  
  const doctor = window.state.selectedDoctor;
  let selectedDate = window.state.selectedDate;
  let selectedTime = window.state.selectedTime;

  const updateUI = () => {
    container.innerHTML = `
      <header style="background: white; border-bottom: 1px solid var(--border-color); padding: 1.5rem 4rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
        <h2 style="font-size: 1.5rem; font-weight: 800;">${window.t('select_date_time')}</h2>
        <button class="btn-secondary" style="width: auto; padding: 12px 24px; font-weight: 700;" onclick="window.goBack()">
          ← ${window.t('back')}
        </button>
      </header>
      <main style="padding: 4rem; max-width: 1200px; margin: 0 auto;">
        <p style="color: var(--text-muted); margin-bottom: 3rem; font-size: 1.125rem;">Booking with <strong>${doctor.name}</strong></p>
        
        <div style="display: grid; grid-template-columns: 1fr 400px; gap: 4rem;">
          <div class="card calendar-card" style="padding: 3rem; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 2.5rem; font-size: 1.75rem; font-weight: 900;">${window.t('mar')} 2026</h3>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; gap: 15px;">
               ${[window.t('mon'), window.t('tue'), window.t('wed'), window.t('thu'), window.t('fri'), window.t('sat'), window.t('sun')].map(day => `<div style="font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">${day}</div>`).join('')}
               ${Array(31).fill(0).map((_, i) => {
                 const day = i + 1;
                 const dateStr = `${day < 10 ? '0' + day : day}/03/2026`;
                 const isSelected = selectedDate === dateStr;
                 return `<div class="calendar-day" data-date="${dateStr}" style="padding: 15px; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.2s; ${isSelected ? 'background: var(--primary); color: white; font-weight: 800; box-shadow: 0 8px 16px rgba(0, 166, 251, 0.25);' : 'hover:background: #F1F5F9;'}">${day}</div>`;
               }).join('')}
            </div>
          </div>
          <div class="time-slots">
            <h3 style="margin-bottom: 2rem; font-size: 1.5rem; font-weight: 800;">${window.t('available_slots')}</h3>
            <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1rem;">
              ${['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'].map(time => {
                const isSelected = selectedTime === time;
                return `<button class="time-slot-btn ${isSelected ? 'btn-primary' : 'btn-secondary'}" data-time="${time}" style="padding: 18px; font-weight: 700; font-size: 1rem; ${isSelected ? 'box-shadow: 0 8px 16px rgba(0, 166, 251, 0.2);' : ''}">${time}</button>`;
              }).join('')}
            </div>
            <button id="confirm-btn" class="btn-primary" style="margin-top: 4rem; padding: 20px; font-size: 1.125rem; font-weight: 800; border-radius: 100px; box-shadow: 0 12px 24px rgba(0, 166, 251, 0.3);">${window.t('confirm_appointment')}</button>
          </div>
        </div>
      </main>
    `;

    container.querySelectorAll('.calendar-day').forEach(el => {
      el.addEventListener('click', () => {
        selectedDate = el.getAttribute('data-date');
        updateUI();
      });
    });

    container.querySelectorAll('.time-slot-btn').forEach(el => {
      el.addEventListener('click', () => {
        selectedTime = el.getAttribute('data-time');
        updateUI();
      });
    });

    container.querySelector('#confirm-btn').addEventListener('click', () => {
      window.state.selectedDate = selectedDate;
      window.state.selectedTime = selectedTime;
      window.location.hash = '#/checkout';
    });
  };

  updateUI();
  return container;
}
