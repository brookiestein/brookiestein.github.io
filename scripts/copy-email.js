(() => {
    const button = document.getElementById('copy-email');
    const status = document.getElementById('copy-status');
    const i18n = window.I18N;
    if (!button || !status || !i18n)
        return;

    let timer;
    button.addEventListener('click', async () => {
        const email = button.dataset.email;
        let ok = false;

        try {
            await navigator.clipboard.writeText(email);
            ok = true;
        } catch (e) {
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                ok = document.execCommand('copy');
            } catch (e2) {
            }
            ta.remove();
        }

        status.textContent = i18n.t(ok ? 'copied' : 'copyFailed');
        clearTimeout(timer);
        timer = setTimeout(() => { status.textContent = ''; }, 2000);
    });
})();
