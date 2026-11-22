// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil; -*-
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
	const tag = e.detail.tag;
	++token;
	const t = token;
	if (reduced) {
	    current = tag ? command(tag) : phrases()[p];
	    el.textContent = current;
	    return;
	}

	if (tag) {
	    show(command(tag), t);
	} else {
	    p = (p + 1) % phrases().length;
	    show(phrases()[p], t).then(() => rotate(t));
	}
    });

    if (!reduced)
	rotate(token);
})();

(() => {
    const root = document.documentElement;
    const button = document.getElementById('theme-toggle');
    if (!button)
	return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const current = () => root.dataset.theme || (mq.matches ? 'dark' : 'light');
    const sync = () => button.setAttribute('aria-pressed', String(current() === 'dark'));

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

    function apply() {
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
	text.textContent = active ? i18n.t('filterStatus', { count, total: projects.length, tag: active}) : '';
	document.dispatchEvent(new CustomEvent('filterchange', { detail: { tag: active } }));
    }

    buttons.forEach(b => b.addEventListener('click', () => {
	active = active === b.textContent ? null : b.textContent;
	apply();
    }));

    clear.addEventListener('click', () => { active = null; apply(); });
    document.addEventListener('keydown', e => {
	if (e.key === 'Escape' && active) {
	    active = null;
	    apply();
	}
    });
})();

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
