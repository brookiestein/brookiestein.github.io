(() => {
    const el = document.getElementById('typed');
    const cursor = document.querySelector('.cursor');
    const i18n = window.I18N;
    if (!el || !cursor || !i18n)
        return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phrases = () => i18n.list('phrases');
    const command = tag => `$ grep -l "${tag}" ~/Projects/*`;

    const wait = ms => new Promise(r => setTimeout(r, ms));
    let current = el.textContent;
    let activeTag = null;
    let token = 0;
    let p = 0;

    async function erase(t) {
        cursor.classList.add('busy');
        while (current.length && t === token) {
            current = current.slice(0, -1);
            el.textContent = current;
            await wait(15);
        }
    }

    async function type(text, t) {
        for (let i = 1; i <= text.length && t === token; ++i) {
            current = text.slice(0, i);
            el.textContent = current;
            await wait(40 + Math.random() * 50);
        }

        if (t === token)
            cursor.classList.remove('busy');
    }

    async function show(text, t) {
        await erase(t);
        if (t !== token)
            return;
        await wait(150);
        await type(text, t);
    }

    async function rotate(t) {
        await wait(2600);
        while (t === token && phrases().length) {
            p = (p + 1) % phrases().length;
            await show(phrases()[p], t);
            await wait(2600);
        }
    }

    document.addEventListener('filterchange', e => {
        activeTag = e.detail.tag;
        ++token;
        const t = token;
        if (reduced) {
            current = activeTag ? command(activeTag) : phrases()[p];
            el.textContent = current;
            return;
        }

        if (activeTag) {
            show(command(activeTag), t);
        } else {
            p = (p + 1) % phrases().length;
            show(phrases()[p], t).then(() => rotate(t));
        }
    });

    document.addEventListener('langchange', () => {
        ++token;
        const t = token;
        p = 0;
        cursor.classList.remove('busy');
        current = activeTag ? command(activeTag) : (phrases()[0] || '');
        el.textContent = current;
        if (!reduced && !activeTag)
            rotate(t);
    });

    if (!reduced)
        rotate(token);
})();
