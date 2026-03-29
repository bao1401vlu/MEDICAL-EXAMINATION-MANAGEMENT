export function renderSidebar(activeHash) {
  const sidebar = document.createElement('aside');
  sidebar.style.cssText = `
    width: 280px; 
    background: white; 
    border-right: 1px solid var(--border-color); 
    display: flex; 
    flex-direction: column; 
    padding: 2.5rem;
    height: 100vh;
    position: sticky;
    top: 0;
  `;

  const navItems = [
    { label: 'home', hash: '#/dashboard', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { label: 'appointments', hash: '#/appointments', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { label: 'find_doctor', hash: '#/search', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' },
  ];

  sidebar.innerHTML = `
    <div class="header-logo" style="margin-bottom: 3.5rem;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary)">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      <span style="font-size: 1.5rem; font-weight: 800; letter-spacing: -0.5px;">${window.t('brand')}</span>
    </div>

    <nav style="flex: 1; display: flex; flex-direction: column; gap: 0.75rem;">
      ${navItems.map(item => {
        const isActive = activeHash === item.hash;
        return `
          <a href="${item.hash}" style="display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-radius: 14px; ${isActive ? 'background: #E0F2FE; color: var(--primary); font-weight: 700;' : 'color: var(--text-muted);'} transition: all 0.2s;">
            ${item.icon}
            ${window.t(item.label)}
          </a>
        `;
      }).join('')}
    </nav>

    <div style="padding: 1.5rem; background: #F8FAFC; border-radius: 16px; margin-top: 2rem;">
      <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 12px;">${window.t('support_hero_title')}</p>
      <p style="font-size: 0.875rem; font-weight: 500; margin-bottom: 12px;">${window.t('support_hero_text')}</p>
      <button class="btn-primary" style="padding: 8px 16px; font-size: 0.8125rem;" onclick="alert('Chat simulation coming soon!')">${window.t('chat_now')}</button>
    </div>
  `;

  return sidebar;
}
