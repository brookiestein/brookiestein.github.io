(() => {
    const root = document.documentElement;
    const button = document.getElementById('theme-toggle');
    if (!button)
        return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const current = () => root.dataset.theme || (mq.matches ? 'dark' : 'light');
    const sync = () => {
        const theme = current();
        button.setAttribute('aria-pressed', String(theme === 'dark'));
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    button.addEventListener('click', () => {
        const next = current() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;

        try {
            localStorage.setItem('theme', next);
        } catch (e) {
        }

        sync();
    });

    mq.addEventListener('change', sync);
    sync();
})();
