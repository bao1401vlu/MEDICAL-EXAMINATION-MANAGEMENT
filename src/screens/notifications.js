export function render() {
  const container = document.createElement('div');
  container.className = 'notifications-content animate-fade-in';
  container.style.padding = '4rem';
  
  container.innerHTML = `
      <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; font-weight: 900; letter-spacing: -1px;">${window.t('notifications')}</h1>
      </header>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 800px;">
        <div class="card" style="padding: 2rem; border-left: 6px solid var(--primary); background: white; box-shadow: 0 8px 24px rgba(0,0,0,0.03); display: flex; align-items: center; gap: 2rem;">
           <div style="font-size: 1.75rem; background: #E0F2FE; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📅</div>
           <div>
             <p style="font-weight: 800; font-size: 1.125rem; margin-bottom: 6px;">${window.t('coming_up')}</p>
             <p style="font-size: 1rem; color: var(--text-muted);">${window.t('today_summary')}</p>
           </div>
           <span style="margin-left: auto; color: var(--text-muted); font-size: 0.8125rem; font-weight: 600;">2m ago</span>
        </div>
        
        <div class="card" style="padding: 2rem; border-left: 6px solid #10B981; background: white; box-shadow: 0 8px 24px rgba(0,0,0,0.03); display: flex; align-items: center; gap: 2rem;">
           <div style="font-size: 1.75rem; background: #ECFDF5; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">🧪</div>
           <div>
             <p style="font-weight: 800; font-size: 1.125rem; margin-bottom: 6px;">New Lab Result</p>
             <p style="font-size: 1rem; color: var(--text-muted);">Your blood test results are ready to view. Status: <strong>Normal</strong></p>
           </div>
           <span style="margin-left: auto; color: var(--text-muted); font-size: 0.8125rem; font-weight: 600;">1h ago</span>
        </div>
      </div>
  `;
  return container;
}
