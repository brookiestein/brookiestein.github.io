(() => {
    const i18n = window.I18N;
    const dialog = document.getElementById('project-modal');
    const titleEl = document.getElementById('pm-title');
    const tagsEl = document.getElementById('pm-tags');
    const sectionsEl = document.getElementById('pm-sections');
    const repoEl = document.getElementById('pm-repo');
    const closeButton = document.getElementById('pm-close');
    const bodyEl = document.getElementById('pm-body');
    if (!i18n || !dialog || !titleEl || !sectionsEl || typeof dialog.showModal !== 'function')
        return;

    const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const scrollPositions = new Map();
    let currentKey = null;

    function track(name, title) {
        if (window.goatcounter && typeof window.goatcounter.count === 'function')
            window.goatcounter.count({ path: name, title, event: true });
    }

    function appendFormattedText(container, text) {
        const parts = text.split(/(`[^`]+`)/g);
        parts.forEach(part => {
            if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
                const code = document.createElement('code');
                code.textContent = part.slice(1, -1);
                container.appendChild(code);
            } else if (part) {
                container.appendChild(document.createTextNode(part));
            }
        });
    }

    function getProjectMeta(key) {
        for (const p of document.querySelectorAll('.project')) {
            const a = p.querySelector('h3 a');
            if (a && slug(a.textContent.trim()) === key) {
                return {
                    name: a.textContent.trim(),
                    url: a.href,
                    tags: [...p.querySelectorAll('.tags li')].map(el => el.textContent.trim())
                };
            }
        }
        return null;
    }

    function render(key) {
        const meta = getProjectMeta(key);
        const detail = i18n.get('detail.' + key);
        if (!meta || !detail)
            return false;

        currentKey = key;
        titleEl.textContent = meta.name;

        tagsEl.textContent = '';
        meta.tags.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            tagsEl.appendChild(li);
        });

        const blocks = [
            ['modalProblem', detail.problem],
            ['modalSolution', detail.solution],
            ['modalArch', detail.arch],
            ['modalDecisions', detail.decisions]
        ];

        sectionsEl.textContent = '';
        blocks.forEach(([labelKey, text]) => {
            if (!text)
                return;

            const sec = document.createElement('div');
            sec.className = 'modal-section';
            const h4 = document.createElement('h4');
            h4.textContent = i18n.t(labelKey);
            const p = document.createElement('p');
            appendFormattedText(p, text);
            sec.append(h4, p);
            sectionsEl.appendChild(sec);
        });

        repoEl.href = meta.url;
        repoEl.setAttribute('data-goatcounter-click', `modal-repo-${key}`);
        return true;
    }

    function open(key) {
        if (!render(key))
            return;

        if (!dialog.open) {
            dialog.showModal();
            track(`modal-${key}`, `Project details: ${key}`);
        }

        bodyEl.scrollTop = scrollPositions.get(key) || 0;
    }

    bodyEl.addEventListener('scroll', () => {
        if (dialog.open && currentKey)
            scrollPositions.set(currentKey, bodyEl.scrollTop);
    }, { passive: true });

    document.addEventListener('click', e => {
        const button = e.target.closest && e.target.closest('.more-btn');
        if (button)
            open(button.dataset.project);
    });

    if (closeButton)
        closeButton.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', e => {
        if (e.target === dialog)
            dialog.close();
    });

    document.addEventListener('langchange', () => {
        if (dialog.open && currentKey) {
            const saved = scrollPositions.get(currentKey) || 0;
            render(currentKey);
            bodyEl.scrollTop = saved;
        }
    });
})();
