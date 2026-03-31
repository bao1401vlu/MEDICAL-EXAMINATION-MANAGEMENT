import './style.css'
import { translations } from './utils/translations.js'
import { renderSidebar } from './components/Sidebar.js'

// App State
// App State
let currentLang = 'en';
// Sync with localStorage if needed but default to English
localStorage.setItem('lang', 'en');

// Global Client-Side State
// Global Client-Side State
const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user')) || { name: 'Nguyen Van A' };

window.state = {
  userName: loggedInUser.name,
  userPhone: loggedInUser.phone || '',
  selectedDoctor: { name: 'Dr. James Wilson', specialty: 'cardiology', img: '/src/assets/doctor_1.png', fee: 1500000 },
  selectedDate: '15/03/2026',
  selectedTime: '10:30 AM',
  appointments: [
    { doctor: 'Dr. James Wilson', specialty: 'cardiology', dateTime: '15/03/2026 at 10:30 AM', status: 'Paid' },
    { doctor: 'Dr. James Wilson', specialty: 'cardiology', dateTime: '15/03/2026 at 02:00 PM', status: 'Paid' }
  ],
  healthRecord: {
    bloodType: 'O+',
    allergies: '', // Test empty state
    diagnosis: 'Mild Hypertension',
    labResults: [
      { 
        name: 'blood_test', 
        date: '01/03/2026', 
        status: 'normal',
        details: 'RBC Count: 5.1 million/cells/mcL (Normal: 4.7-6.1)\nHemoglobin: 14.5 g/dL (Normal: 13.8-17.2)\nHematocrit: 44% (Normal: 41%-50%)\nWhite Blood Cell: 7,200 cells/mcL (Normal: 4,500-11,000)'
      },
      { 
        name: 'xray_chest', 
        date: '15/02/2026', 
        status: 'normal',
        details: 'Lung Fields: Clear, no focal consolidation or pleural effusion.\nHeart Size: Within normal limits.\nBony Structures: Intact, no acute fractures or lesions.\nImpression: Normal study.'
      }
    ]
  }
};

// Global Modal Utility
window.showModal = (title, content) => {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal-container">
      <div style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;">
        <h3 style="font-size: 1.25rem;">${title}</h3>
        <button id="modal-close-icon" style="background: transparent; color: var(--text-muted); padding: 5px; font-size: 1.5rem; border: none; cursor: pointer;">×</button>
      </div>
      <div style="padding: 2.5rem; text-align: center;">
        <div style="width: 64px; height: 64px; background: #F0F9FF; color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <p style="font-size: 1.125rem; line-height: 1.8; color: var(--text-main); font-weight: 500; white-space: pre-line;">${content}</p>
        <button id="modal-close-btn" class="btn-primary" style="margin-top: 2rem; width: auto; padding: 12px 40px;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const close = () => {
    backdrop.style.opacity = '0';
    backdrop.style.transition = 'opacity 0.2s ease';
    setTimeout(() => backdrop.remove(), 200);
  };

  const closeIcon = backdrop.querySelector('#modal-close-icon');
  const closeBtn = backdrop.querySelector('#modal-close-btn');
  
  if (closeIcon) closeIcon.onclick = close;
  if (closeBtn) closeBtn.onclick = close;
  backdrop.onclick = (e) => { if (e.target === backdrop) close(); };
};

// Global Helpers
window.t = (key) => translations[currentLang][key] || key;

window.fCurrency = (amount) => {
  // Always use Vietnamese currency format (VND)
  return amount.toLocaleString('vi-VN') + ' ₫';
};

window.goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.hash = '#/dashboard';
  }
};

window.logout = () => {
  localStorage.removeItem('logged_in_user');
  window.location.hash = '#/login';
  window.location.reload(); // Refresh to reset state
};
const routes = {
  '/': { loader: () => import('./screens/register.js'), layout: 'full' },
  '/login': { loader: () => import('./screens/login.js'), layout: 'full' },
  '/dashboard': { loader: () => import('./screens/dashboard.js'), layout: 'dash' },
  '/search': { loader: () => import('./screens/search.js'), layout: 'dash' },
  '/profile': { loader: () => import('./screens/profile.js'), layout: 'dash' },
  '/book': { loader: () => import('./screens/book.js'), layout: 'dash' },
  '/appointments': { loader: () => import('./screens/appointments.js'), layout: 'dash' },
  '/checkout': { loader: () => import('./screens/checkout.js'), layout: 'dash' },
  '/notifications': { loader: () => import('./screens/notifications.js'), layout: 'dash' },
  '/health-record': { loader: () => import('./screens/healthRecord.js'), layout: 'dash' },
};

async function navigate() {
  const hash = window.location.hash.slice(1) || '/';
  const route = routes[hash] || routes['/'];
  
  const app = document.querySelector('#app');
  app.innerHTML = `<div class="loading">${window.t('loading')}</div>`;

  try {
    const module = await route.loader();
    app.innerHTML = '';
    
    if (route.layout === 'full') {
      app.appendChild(module.render());
    } else {
      // Dashboard Layout
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'dashboard-layout animate-fade-in';
      layoutContainer.style.display = 'flex';
      layoutContainer.style.minHeight = '100vh';
      
      const activeHash = '#' + (hash === '/' ? '' : hash);
      layoutContainer.appendChild(renderSidebar(activeHash));
      
      const contentArea = document.createElement('main');
      contentArea.style.cssText = 'flex: 1; background: var(--bg-light); max-height: 100vh; overflow-y: auto;';
      contentArea.appendChild(module.render());
      
      layoutContainer.appendChild(contentArea);
      app.appendChild(layoutContainer);
    }
    
    // renderLangSwitcher(); // Removed as per request (English only)
  } catch (err) {
    app.innerHTML = `<div class="error">${window.t('error')}</div>`;
    console.error(err);
  }
}

// renderLangSwitcher removed

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
