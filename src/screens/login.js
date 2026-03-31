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
        <div id="login-error" style="background: #FEF2F2; color: #EF4444; padding: 12px; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.875rem; font-weight: 600; display: none; border: 1px solid #FCA5A5;">
          ${window.t('wrong_password')}
        </div>
        <div class="form-group"><label>${window.t('phone')}</label><input type="tel" placeholder="${window.t('phone_placeholder')}" required /></div>
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;"><label style="margin-bottom: 0;">${window.t('password')}</label><a href="#" style="font-size: 0.8125rem; font-weight: 500;">${window.t('forgot_password')}</a></div>
          <input type="password" id="password-input" placeholder="${window.t('password_placeholder')}" required />
        </div>
        <button type="submit" id="login-btn" class="btn-primary" style="margin-top: 1rem; font-size: 1rem; padding: 14px;">${window.t('login')}</button>
      </form>
      <p style="margin-top: 2rem; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
        ${window.t('no_account')} <a href="#/" style="font-weight: 600;">${window.t('signup')}</a>
      </p>
    </div>
  `;

  const form = container.querySelector('#login-form');
  const errorDiv = container.querySelector('#login-error');
  const loginBtn = container.querySelector('#login-btn');
  const phoneInput = container.querySelector('input[type="tel"]');
  const passwordInput = container.querySelector('#password-input');

  form.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    
    // Simulate loading
    loginBtn.innerText = window.t('loading');
    loginBtn.disabled = true;
    errorDiv.style.display = 'none';

    setTimeout(() => {
      const regUser = JSON.parse(localStorage.getItem('registered_user'));
      const phone = phoneInput.value;
      const pass = passwordInput.value;

      // Logic: match regUser OR fallback to default if no regUser exists
      let success = false;
      let userData = null;

      if (regUser && regUser.phone === phone && regUser.password === pass) {
        success = true;
        userData = regUser;
      } else if (!regUser && phone === '0123456789' && pass === '123456') {
        // Default demo account
        success = true;
        userData = { name: 'Nguyen Van A', phone: '0123456789' };
      }

      if (success) {
        localStorage.setItem('logged_in_user', JSON.stringify(userData));
        window.location.hash = '#/dashboard';
        window.location.reload(); 
      } else {
        errorDiv.style.display = 'block';
        form.classList.add('animate-shake');
        loginBtn.innerText = window.t('login');
        loginBtn.disabled = false;
        setTimeout(() => form.classList.remove('animate-shake'), 500);
      }
    }, 1000);
  });

  return container;
}
