(() => {
    const i18n = window.I18N;
    const galleries = [...document.querySelectorAll('.gallery')];
    if (!i18n || !galleries.length)
        return;

    const currentTheme = () => document.documentElement.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const labelOf = fig => {
        const v = fig.dataset.labelKey ? i18n.get(fig.dataset.labelKey) : null;
        return typeof v === 'string' ? v : (fig.dataset.label || '');
    };

    let box = null;
    function openLightbox(src, alt) {
        if (!box) {
            box = document.createElement('dialog');
            box.className = 'lightbox';
            const img = document.createElement('img');
            const close = document.createElement('button');
            close.type = 'button';
            close.className = 'close';
            close.textContent = '\u00d7';
            close.setAttribute('aria-label', i18n.t('closeImage'));
            box.append(img, close);
            box.addEventListener('click', e => {
                if (e.target === box || e.target === close)
                    box.close();
            });
            document.body.appendChild(box);
        }

        const img = box.querySelector('img');
        img.src = src;
        img.alt = alt || '';
        box.showModal();
    }

    let uid = 0;
    const updaters = [];
    const themeUpdaters = [];

    galleries.forEach(gallery => {
        const figures = [...gallery.querySelectorAll('.shot')];
        if (!figures.length)
            return;

        const id = ++uid;
        let tabs = [];
        let list = null;

        if (figures.length > 1) {
            list = document.createElement('div');
            list.className = 'tabs';
            list.setAttribute('role', 'tablist');
            list.setAttribute('aria-label', i18n.t('galleryLabel'));

            tabs = figures.map((fig, i) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'tab';
                b.id = `g${id}-tab${i}`;
                b.setAttribute('role', 'tab');
                b.setAttribute('aria-controls', `g${id}-panel${i}`);
                b.textContent = labelOf(fig);
                fig.id = `g${id}-panel${i}`;
                fig.setAttribute('role', 'tabpanel');
                fig.setAttribute('aria-labelledby', b.id);
                list.appendChild(b);
                return b;
            });

            gallery.appendChild(list);
        }

        function select(i, focus) {
            figures.forEach((fig, j) => {
                fig.classList.toggle('active', i === j);
                if (i !== j)
                    fig.querySelectorAll('video').forEach(v => v.pause());
            });

            tabs.forEach((b, j) => {
                b.setAttribute('aria-selected', String(i === j));
                b.tabIndex = i === j ? 0 : -1;
            });

            if (focus && tabs[i])
                tabs[i].focus();
        }

        tabs.forEach((b, i) => {
            b.addEventListener('click', () => select(i));
            b.addEventListener('keydown', e => {
                const last = tabs.length - 1;
                let next = null;
                if (e.key === 'ArrowRight')
                    next = i === last ? 0 : i + 1;
                else if (e.key === 'ArrowLeft')
                    next = i === 0 ? last : i - 1;
                else if (e.key === 'Home')
                    next = 0;
                else if (e.key === 'End')
                    next = last;

                if (next !== null) {
                    e.preventDefault();
                    select(next, true);
                }
            });
        });

        const zooms = [];
        figures.forEach(fig => {
            const img = fig.querySelector('img');
            if (!img)
                return;

            const zoom = document.createElement('button');
            zoom.type = 'button';
            zoom.className = 'zoom';
            zoom.setAttribute('aria-label', i18n.t('enlarge'));
            img.parentNode.insertBefore(zoom, img);
            zoom.appendChild(img);
            zoom.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
            zooms.push(zoom);
        });

        updaters.push(() => {
            if (list)
                list.setAttribute('aria-label', i18n.t('galleryLabel'));
            tabs.forEach((b, i) => {
                b.textContent = labelOf(figures[i]);
            });
            zooms.forEach(z => z.setAttribute('aria-label', i18n.t('enlarge')));
        });

        themeUpdaters.push(theme => {
            const index = figures.findIndex(fig => fig.dataset.theme === theme);
            if (index !== -1)
                select(index);
        });

        gallery.classList.add('ready');
        const initial = figures.findIndex(fig => fig.dataset.theme === currentTheme());
        select(initial !== -1 ? initial : 0);
    });

    document.addEventListener('themechange', e => {
        themeUpdaters.forEach(fn => fn(e.detail.theme));
        if (box) {
            const close = box.querySelector('.close');
            if (close)
                close.setAttribute('aria-label', i18n.t('closeImage'));
        }
    });

    document.addEventListener('langchange', () => {
        updaters.forEach(fn => fn());
        if (box) {
            const close = box.querySelector('.close');
            if (close)
                close.setAttribute('aria-label', i18n.t('closeImage'));
        }
    });
})();
