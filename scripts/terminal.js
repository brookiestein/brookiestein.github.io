(() => {
    const i18n = window.I18N;
    const dialog = document.getElementById('term');
    const out = document.getElementById('term-out');
    const form = document.getElementById('term-form');
    const input = document.getElementById('term-in');
    const closeButton = document.getElementById('term-close');
    const openButton = document.getElementById('term-open');
    if (!i18n || !dialog || !out || !form || !input || typeof dialog.showModal !== 'function')
	return;

    const t = i18n.t;
    const text = el => (el ? el.textContent.trim().replace(/\s+/g, ' ') : '');
    const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

    // Everything the terminal shows is read from the page itself, so it always
    // matches the visible content (and its translation).
    const projects = () => [...document.querySelectorAll('.project')].map(p => {
	const a = p.querySelector('h3 a');
	return {
	    name: text(a),
	    key: slug(text(a)),
	    url: a.href,
	    desc: text(p.querySelector('p')),
	    tags: [...p.querySelectorAll('.tags li')].map(text)
	};
    });

    const files = {
	'about.txt': () => [...document.querySelectorAll('#about .cols > div p')].map(text),
	'skills.txt': () => [...document.querySelectorAll('#about dl dt')].map(dt => `${text(dt)}: ${text(dt.nextElementSibling)}`),
	'contact.txt': () => [...document.querySelectorAll('#contact ul a')].map(a => `${text(a)}: ${a.href}`)
    };

    function findProject(arg) {
	const key = slug(arg);
	if (!key)
	    return null;
	const list = projects();
	const exact = list.find(p => p.key === key);
	if (exact)
	    return exact;
	const starts = list.filter(p => p.key.startsWith(key));
	return starts.length === 1 ? starts[0] : null;
    }

    function parse(line) {
	const args = [];
	const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
	let m;
	while ((m = re.exec(line)) !== null)
	    args.push(m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3]);
	return args;
    }

    function print(s = '', cls = '') {
	const div = document.createElement('div');
	if (cls)
	    div.className = cls;
	div.textContent = s;
	out.appendChild(div);
    }

    const printAll = lines => lines.forEach(l => print(l));

    // Count the event in GoatCounter if its script is loaded and not blocked.
    function track(name, title) {
	if (window.goatcounter && typeof window.goatcounter.count === 'function')
	    window.goatcounter.count({ path: name, title, event: true });
    }

    const commands = {
	help() {
	    printAll(i18n.list('term.help'));
	},
	ls([arg]) {
	    if (!arg || arg === '~' || arg === '.')
		return print([...Object.keys(files), 'cv.pdf', 'projects/'].join('  '));

	    const path = arg.replace(/^(\.\/|~\/)/, '').replace(/\/$/, '');
	    if (path === 'projects') {
		print(projects().map(p => p.key + '/').join('  '));
		return print(t('term.tryCat'), 'echo');
	    }

	    print(t('term.lsNoAccess', { arg }));
	    const p = path.startsWith('projects/') ? findProject(path.slice(9)) : null;
	    if (p)
		print(t('term.tryCatOne', { name: p.key }), 'echo');
	},
	cat([arg]) {
	    if (!arg)
		return print(t('term.catMissing'));

	    const name = arg.replace(/^(\.\/|~\/|projects\/)/, '').replace(/\/$/, '').toLowerCase();
	    const file = has(files, name) ? files[name] : has(files, name + '.txt') ? files[name + '.txt'] : null;
	    if (file)
		return printAll(file());

	    const p = findProject(name);
	    if (p)
		return printAll([p.name, p.desc, `${t('term.tags')}: ${p.tags.join(', ')}`, p.url]);
	    print(t('term.catNone', { arg }));
	},
	open([arg]) {
	    if (!arg)
		return print(t('term.openMissing'));

	    if (/^cv(\.pdf)?$/i.test(arg)) {
		const link = document.querySelector('a[download]');
		if (!link)
		    return print(t('term.noCv'));
		link.click();
		return print(t('term.downloading'));
	    }

	    const p = findProject(arg.replace(/^projects\//, ''));
	    if (!p)
		return print(t('term.projectNotFound', { arg }));
	    window.open(p.url, '_blank', 'noopener');
	    print(t('term.opening', { url: p.url }));
	},
	grep([arg]) {
	    if (!arg)
		return print(t('term.grepMissing'));

	    const needle = arg.toLowerCase();
	    const button = [...document.querySelectorAll('.tags button')].find(b => b.textContent.trim().toLowerCase() === needle);
	    if (!button)
		return print(t('term.grepNone', { arg }));

	    if (button.getAttribute('aria-pressed') !== 'true')
		button.click();

	    dialog.close();
	    document.getElementById('projects').scrollIntoView();
	},
	theme([arg]) {
	    const now = document.documentElement.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	    if (!arg)
		return print(t('term.themeNow', { theme: now }));

	    if (arg !== 'dark' && arg !== 'light')
		return print(t('term.themeBad'));

	    const toggle = document.getElementById('theme-toggle');
	    if (arg !== now && toggle)
		toggle.click();
	    print(t('term.themeSet', { theme: arg }));
	},
	whoami() {
	    print(text(document.querySelector('.name')) || 'brayan');
	},
	clear() {
	    out.textContent = '';
	},
	exit() {
	    dialog.close();
	},
	sudo() {
	    print(t('term.sudo'));
	}
    };

    const history = [];
    let cursor = 0;

    function run(line) {
	print('$ ' + line, 'echo');
	const args = parse(line);
	const cmd = (args.shift() || '').toLowerCase();
	if (cmd) {
	    history.push(line);
	    cursor = history.length;
	    if (has(commands, cmd))
		commands[cmd](args);
	    else
		print(t('term.notFound', { cmd }));
	}
	out.scrollTop = out.scrollHeight;
    }

    function complete() {
	const value = input.value;
	const parts = value.split(/\s+/);
	const last = parts.pop().toLowerCase();
	const first = parts[0];

	const pool = parts.length === 0
	      ? Object.keys(commands)
	      : first === 'theme'
	      ? ['dark', 'light']
	      : first === 'ls'
	      ? ['projects']
	      : [...Object.keys(files), 'cv', ...projects().map(p => p.key)];

	const matches = pool.filter(w => w.startsWith(last));
	if (matches.length === 1) {
	    input.value = [...parts, matches[0]].join(' ') + ' ';
	} else if (matches.length > 1) {
	    print('$ ' + value, 'echo');
	    print(matches.join('  '));
	    out.scrollTop = out.scrollHeight;
	}
    }

    function openTerminal() {
	if (dialog.open)
	    return;
	dialog.showModal();
	track('terminal-open', 'Terminal opened');
	if (!out.children.length)
	    printAll([t('term.welcome'), '']);
	input.focus();
    }

    form.addEventListener('submit', e => {
	e.preventDefault();
	const line = input.value.trim();
	input.value = '';
	run(line);
    });

    input.addEventListener('keydown', e => {
	if (e.key === 'Tab' && !e.shiftKey && input.value.trim()) {
	    e.preventDefault();
	    complete();
	} else if (e.key === 'ArrowUp') {
	    e.preventDefault();
	    if (cursor > 0)
		input.value = history[--cursor];
	} else if (e.key === 'ArrowDown') {
	    e.preventDefault();
	    cursor = Math.min(cursor + 1, history.length);
	    input.value = history[cursor] || '';
	}
    });

    dialog.addEventListener('click', e => {
	if (e.target === dialog)
	    dialog.close();
    });

    if (closeButton)
	closeButton.addEventListener('click', () => dialog.close());
    if (openButton)
	openButton.addEventListener('click', openTerminal);

    document.addEventListener('keydown', e => {
	if (e.key.toLowerCase() !== 't' || e.ctrlKey || e.metaKey || e.altKey)
	    return;
	if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]'))
	    return;
	e.preventDefault();
	openTerminal();
    });
})();
