(() => {
    const tip = document.getElementById('tip');
    const i18n = window.I18N;
    if (!tip || !i18n)
        return;

    let target = null;

    function show(button) {
        const message = i18n.get('tip.' + button.textContent.trim());
        if (!message)
            return;

        target = button;

        tip.textContent = message;
        tip.hidden = false;

        button.setAttribute('aria-describedby', 'tip');

        const r = button.getBoundingClientRect();
        const w = tip.offsetWidth, h = tip.offsetHeight;
        let top = r.top - h - 8;
        if (top < 8)
            top = r.bottom + 8;
        const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
        tip.style.top = top + 'px';
        tip.style.left = left + 'px';
    }

    function hide() {
        if (target)
            target.removeAttribute('aria-describedby');
        target = null;
        tip.hidden = true;
    }

    const buttonOf = e => e.target.closest && e.target.closest('.tags button');
    document.addEventListener('mouseover', e => {
        const b = buttonOf(e);
        if (b && b !== target)
            show(b);
    });
    document.addEventListener('mouseout', e => {
        if (buttonOf(e))
            hide();
    });
    document.addEventListener('focusin', e => {
        const b = buttonOf(e);
        if (b)
            show(b);
    });
    document.addEventListener('focusout', e => {
        if (buttonOf(e))
            hide();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape')
            hide();
    });
    document.addEventListener('scroll', hide, { passive: true });
})();
