export function render() {
  const container = document.createElement('div');
  container.className = 'split-container animate-fade-in';
  container.innerHTML = `
    <div class="split-left">
      <img src="/src/assets/register_hero.png" alt="Medical Clinic" />
    </div>
    <div class="split-right">
      <div class="header-logo">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary)">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <span>${window.t('brand')}</span>
      </div>
      <h2 style="margin-bottom: 0.5rem; font-size: 1.875rem;">${window.t('login_title')}</h2>
      <p style="color: var(--text-muted); margin-bottom: 2rem;">${window.t('welcome_back')} <br><span style="font-size: 0.75rem;">${window.t('demo_note')}</span></p>
      <form id="login-form">
        <div class="form-group"><label>${window.t('phone')}</label><input type="tel" placeholder="${window.t('phone_placeholder')}" required /></div>
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;"><label style="margin-bottom: 0;">${window.t('password')}</label><a href="#" style="font-size: 0.8125rem; font-weight: 500;">${window.t('forgot_password')}</a></div>
          <input type="password" placeholder="${window.t('password_placeholder')}" required />
        </div>
        <button type="submit" class="btn-primary" style="margin-top: 1rem; font-size: 1rem; padding: 14px;">${window.t('login')}</button>
      </form>
      <p style="margin-top: 2rem; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
        ${window.t('no_account')} <a href="#/" style="font-weight: 600;">${window.t('signup')}</a>
      </p>
    </div>
  `;
  container.querySelector('#login-form').addEventListener('submit', (e) => { e.preventDefault(); window.location.hash = '#/dashboard'; });
  return container;
}
