export function render() {
  const container = document.createElement('div');
  container.className = 'checkout-content animate-fade-in';
  
  const doctor = window.state.selectedDoctor;
  const date = window.state.selectedDate;
  const time = window.state.selectedTime;

  container.innerHTML = `
    <header style="background: white; border-bottom: 1px solid var(--border-color); padding: 1.5rem 4rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
      <h2 style="font-size: 1.5rem; font-weight: 800;">${window.t('checkout')}</h2>
      <button class="btn-secondary" style="width: auto; padding: 12px 24px; font-weight: 700;" onclick="window.goBack()">
        ← ${window.t('back')}
      </button>
    </header>
    <main style="padding: 4rem; max-width: 1200px; margin: 0 auto;">
      <div style="display: grid; grid-template-columns: 1fr 500px; gap: 5rem;">
        <section class="left-col">
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 2rem;">${window.t('order_summary')}</h3>
          <div class="card" style="padding: 3rem; background: white; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 2.5rem; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
            <img src="${doctor.img}" style="width: 120px; height: 120px; border-radius: 20px; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-weight: 900; font-size: 1.75rem; margin-bottom: 8px;">${doctor.name}</p>
              <p style="color: var(--primary); font-weight: 800; font-size: 1.125rem; margin-bottom: 1.5rem;">${window.t(doctor.specialty)}</p>
              <div style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem;">
                 <p style="font-size: 1rem; color: var(--text-muted); font-weight: 600;">📅 ${date}</p>
                 <p style="font-size: 1rem; color: var(--text-muted); font-weight: 600;">🕒 ${time}</p>
              </div>
              <p style="font-size: 2.5rem; font-weight: 900; color: var(--text-main);">${window.fCurrency(doctor.fee)}</p>
            </div>
          </div>
        </section>
        <section class="right-col">
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 2rem;">${window.t('payment_method')}</h3>
          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 3rem;">
            <button class="card" style="padding: 1.75rem; text-align: left; border: 2px solid var(--primary); background: #F0F9FF; display: flex; align-items: center; gap: 15px; border-radius: 20px;">
               <span style="font-size: 2rem;">💳</span>
               <span style="font-weight: 800; font-size: 1.125rem;">${window.t('credit_card')}</span>
            </button>
            <button class="card" style="padding: 1.75rem; text-align: left; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 15px; border-radius: 20px;">
               <span style="font-size: 2rem;">📱</span>
               <span style="font-weight: 800; font-size: 1.125rem;">${window.t('e_wallet')}</span>
            </button>
          </div>
          <button id="pay-btn" class="btn-primary" style="padding: 22px; font-size: 1.25rem; font-weight: 900; border-radius: 100px; box-shadow: 0 12px 30px rgba(0, 166, 251, 0.35);">${window.t('pay_now')}</button>
        </section>
      </div>
    </main>
  `;

  container.querySelector('#pay-btn').addEventListener('click', () => {
    window.state.appointments.push({
      doctor: doctor.name,
      specialty: doctor.specialty,
      dateTime: `${date} at ${time}`
    });
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed; top: 40px; right: 40px; background: #10B981; color: white; padding: 16px 32px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); z-index: 10000; font-weight: 700; font-size: 1.125rem; animation: slideIn 0.5s ease;
    `;
    notification.innerText = "✓ Appointment Confirmed!";
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => {
        notification.remove();
        window.location.hash = '#/appointments';
      }, 500);
    }, 2500);
  });

  return container;
}
