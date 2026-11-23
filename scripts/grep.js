(() => {
    const i18n = window.I18N;
    const projects = [...document.querySelectorAll('.project')];
    const bar = document.getElementById('filter-status');
    const text = document.getElementById('filter-text');
    const clear = document.getElementById('filter-clear');
    if (!projects.length || !bar || !i18n)
        return;

    document.querySelectorAll('.tags').forEach(ul => {
        ul.classList.add('interactive');
        ul.querySelectorAll('li').forEach(li => {
            const b = document.createElement('button');
            b.type = 'button';
            b.textContent = li.textContent.trim();
            b.setAttribute('aria-pressed', 'false');
            li.textContent = '';
            li.appendChild(b);
        });
    });

    const buttons = [...document.querySelectorAll('.tags button')];
    let active = null;

    function apply(notify = true) {
        let count = 0;
        projects.forEach(p => {
            const match = !active ||
                [...p.querySelectorAll('.tags button')].some(b => b.textContent === active);
            p.classList.toggle('dim', !match);
            if (match)
                ++count;
        });

        buttons.forEach(b => b.setAttribute('aria-pressed', String(b.textContent === active)));
        bar.hidden = !active;
        text.textContent = active ? i18n.t('filterStatus', { count, total: projects.length, tag: active }) : '';
        if (notify)
            document.dispatchEvent(new CustomEvent('filterchange', { detail: { tag: active } }));
    }

    buttons.forEach(b => b.addEventListener('click', () => {
        active = active === b.textContent ? null : b.textContent;
        apply();
    }));

    clear.addEventListener('click', () => { active = null; apply(); });
    document.addEventListener('langchange', () => apply(false));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && active) {
            active = null;
            apply();
        }
    });
})();
