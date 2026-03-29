import './style.css'
import { translations } from './utils/translations.js'
import { renderSidebar } from './components/Sidebar.js'

// App State
let currentLang = localStorage.getItem('lang') || 'vi';

// Global Client-Side State
window.state = {
  selectedDoctor: { name: 'Dr. James Wilson', specialty: 'cardiology', img: '/src/assets/doctor_1.png', fee: 150 },
  selectedDate: '15/03/2026',
  selectedTime: '10:30 AM',
  appointments: [
    { doctor: 'Dr. James Wilson', specialty: 'cardiology', dateTime: '15/03/2026 at 10:30 AM' }
  ]
};

// Global Helpers
window.t = (key) => translations[currentLang][key] || key;

window.fCurrency = (amount) => {
  if (currentLang === 'vi') {
    const vndAmount = amount * 25000;
    return vndAmount.toLocaleString('vi-VN') + window.t('currency');
  }
  return window.t('currency') + amount.toLocaleString('en-US');
};

window.goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.hash = '#/dashboard';
  }
};

// Router setup
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
    
    renderLangSwitcher();
  } catch (err) {
    app.innerHTML = `<div class="error">${window.t('error')}</div>`;
    console.error(err);
  }
}

function renderLangSwitcher() {
  let switcher = document.querySelector('.lang-switcher');
  if (!switcher) {
    switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    document.body.appendChild(switcher);
  }

  switcher.innerHTML = `
    <button class="btn-secondary" style="border-radius: 100px; padding: 10px 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid var(--border-color); background: white;">
      🌐 ${window.t('switch_to')}
    </button>
  `;

  switcher.onclick = () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('lang', currentLang);
    window.location.reload();
  };
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
