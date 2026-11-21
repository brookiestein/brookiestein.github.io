// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil; -*-
(() => {
    const el = document.getElementById('typed');
    const cursor = document.querySelector('.cursor');
    if (!el || !cursor)
	return;

    if (window.matchMedia('(prefer-reduced-motion: reduce)').matches)
	return;

    const phrases = [
	'I build Linux desktop tools in C and C++.',
	'I write Qt and GTK apps that feel native.',
	'I lock down networks with nftables.',
	'I audit processes and hunt root causes.',
	'I run Gentoo with ZFS on root.',
	'I also run Gentoo with the alternative toolchain musl + LLVM.',
	'I manage system and user services with systemd.',
	'I\'m learning to break things, ethically.'
    ];

    const wait = ms => new Promise(r => setTimeout(r, ms));
    let current = el.textContent;
    let p = 0;

    async function run() {
	await wait(2600);
	for (;;) {
	    cursor.classList.add('busy');
	    while (current.length) {
		current = current.slice(0, -1);
		el.textContent = current;
		await wait(25);
	    }

	    await wait(300);
	    p = (p + 1) % phrases.length;
	    const next = phrases[p];
	    for (let i = 1; i <= next.length; ++i) {
		current = next.slice(0, i);
		el.textContent = current;
		await wait(45 + Math.random() * 55);
	    }

	    cursor.classList.remove('busy');
	    await wait(2600);
	}
    }

    run();
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
