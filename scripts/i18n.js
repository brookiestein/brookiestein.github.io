(() => {
    const supported = ['en', 'es'];

    const dict = {
        en: {
            title: 'Brayan Mejía Salazar · Software developer',
            notFoundTitle: '404 · Brayan Mejía Salazar',
            notFoundBadge: 'Error 404 · Page not found',
            notFoundLede: 'The page you’re looking for doesn’t exist or has moved. The projects are still where you left them.',
            backHome: 'Back to home',
            switchLang: 'Switch to Spanish',
            cvFile: './files/Resume.pdf',
            cvName: 'Brayan-Mejia-Resume.pdf',
            cvEvent: 'cv-download-en',
            darkMode: 'Dark mode',
            closeTerminal: 'Close terminal',
            name: 'Brayan Mejía Salazar · Dominican Republic',
            phrases: [
                'I build apps for Linux and Windows.',
                'I write Qt and GTK apps that feel native.',
                'I lock down networks with nftables.',
                'I audit processes and hunt root causes.',
                'I run Gentoo with ZFS on root.',
                'I run Gentoo on musl and LLVM.',
                'I manage services with systemd.',
                'I\'m learning to break things, ethically.'
            ],
            lede: 'Small, fast programs that do one job well: a screen locker that reacts to your phone, a power menu, a music player, a VPN kill switch. Open source, written with Qt, GTK and the shell.',
            downloadCv: 'Download CV',
            projects: 'Projects',
            clear: 'Clear',
            filterStatus: '{count} of {total} projects use {tag}',
            btScreenLocker: 'A background service that locks your session when your phone’s Bluetooth moves out of range.',
            qbit: 'A lightweight music player with optional video playback. Available for Linux and Windows.',
            downloadWin: 'Download for Windows (.exe)',
            spm: 'A power menu to hibernate, reboot, shut down or suspend, styled after the one in MATE.',
            killSwitch: 'A fail-closed firewall for ProtonVPN on Gentoo. If the WireGuard tunnel drops, all traffic stops instead of leaking.',
            ppd: 'A graphical interface for power-profiles-daemon that sets the active power profile through D-Bus calls.',
            about: 'About',
            about1: 'I’m a Software Engineering student at UAPA and have worked at Telenord for five years, the last three as a quality auditor, where I learned to care about process and about finding the cause of a problem, not just its symptom.',
            about2: 'I’ve used Linux daily for over nine years. I’m currently completing cybersecurity courses and I’m looking for developer roles, including remote ones.',
            platformsDt: 'Platforms',
            platformsDd: 'Linux, Windows (QBitMPlayer ships a .exe)',
            languagesDt: 'Languages',
            toolkitsDt: 'Toolkits',
            systemsDt: 'Systems',
            systemsDd: 'Linux (Gentoo, Arch, Debian, Ubuntu, Fedora), systemd, nftables, dnsmasq & dnscrypt-proxy, WireGuard',
            spokenDt: 'Spoken languages',
            spokenDd: 'Spanish (native), English (B2 or higher)',
            contact: 'Contact',
            copy: 'Copy',
            copied: 'Copied',
            copyFailed: 'Copy failed',
            openTerminal: 'Open terminal',
            orPress: 'or press',
            closeImage: 'Close image',
            galleryLabel: 'Project screenshots',
            enlarge: 'Enlarge image',

            tabScan: 'Scan',
            tabDevices: 'Devices',
            tabDark: 'Dark',
            tabLight: 'Light',
            tabGui: 'GUI',
            tabCli: 'CLI',
            tabRuleset: 'Ruleset',
            tabTables: 'Tables',

            shotBtScan: 'BtScreenLocker dialog showing a 30-second Bluetooth device discovery message.',
            shotBtDevices: 'BtScreenLocker window listing discovered Bluetooth devices with name, MAC address, signal strength and an Add button.',
            shotQbitDark: 'QBitMPlayer on Windows in dark mode showing the playlist panel and playback controls.',
            shotQbitLight: 'QBitMPlayer on Windows in light mode showing the playlist panel and playback controls.',
            shotSpm: 'spm window with the buttons Hibernate, PowerOff, Reboot, Suspend and Exit, and a shutdown countdown.',
            shotSpmCli: 'Terminal output of spm --help listing command-line flags and default options.',
            shotKillSwitchRules: 'nftables ruleset for table inet vpn_killswitch with default drop policies and WireGuard sets.',
            shotKillSwitchTables: 'Terminal output of nft list tables showing active vpn_killswitch and connlog tables.',
            shotPpdGui: 'PowerProfilesDaemonGUI window with radio buttons for Power Saver, Balanced, and Performance selected.',
            shotPpdCli: 'Terminal output of powerprofilesgui --help and -a alongside a desktop notification showing Active profile: performance.',

            'tip.C': 'A low-level language that gives direct control over memory and the system.',
            'tip.C++': 'C with classes, templates and a rich standard library.',
            'tip.Qt': 'A cross-platform framework for building native desktop apps.',
            'tip.QtDBus': 'Qt\'s module for talking to other programs over D-Bus.',
            'tip.Qt Multimedia': 'Qt\'s module for playing audio and video.',
            'tip.GTK': 'The GNOME toolkit for building desktop interfaces.',
            'tip.Gtkmm': 'The official C++ bindings for GTK.',
            'tip.D-Bus': 'The messaging system that lets Linux programs talk to each other and to services.',
            'tip.nftables': 'The Linux kernel\'s firewall, the successor to iptables.',
            'tip.WireGuard': 'A fast, modern VPN protocol built into the Linux kernel.',
            'tip.systemd': 'The service manager that starts and supervises daemons on most Linux systems.',
            'tip.Shell': 'Scripts that automate tasks from the command line.',
            'tip.CMake': 'A build system generator for C and C++ projects.',
            'tip.Meson': 'A fast, modern build system, popular in GTK projects.',
            'tip.Windows': 'QBitMPlayer ships a ready-to-run .exe in its GitHub releases.',

            'term.welcome': 'Welcome. Type "help" to see what you can do.',
            'term.help': [
                'Available commands:',
                '  ls [projects]         list files or projects',
                '  cat <file|project>    read a file or a project',
                '  open <project|cv>     open a repo or download the CV',
                '  grep <tag>            filter the projects by technology',
                '  theme [dark|light]    show or change the color theme',
                '  whoami, clear, exit',
                'Tab completes, and the arrow keys browse your history.'
            ],
            'term.tryCat': 'Try: cat <project-name>',
            'term.tryCatOne': 'Try: cat {name}',
            'term.lsNoAccess': 'ls: cannot access \'{arg}\': No such file or directory',
            'term.catMissing': 'cat: missing file operand',
            'term.catNone': 'cat: {arg}: No such file or directory',
            'term.tags': 'Tags',
            'term.openMissing': 'open: missing operand',
            'term.noCv': 'open: cv.pdf: No such file or directory',
            'term.downloading': 'Downloading the CV...',
            'term.projectNotFound': 'open: {arg}: project not found',
            'term.opening': 'Opening {url}',
            'term.grepMissing': 'grep: missing operand',
            'term.grepNone': 'grep: no project uses "{arg}"',
            'term.themeNow': 'Current theme: {theme}',
            'term.themeBad': 'theme: expected "dark" or "light"',
            'term.themeSet': 'Theme set to {theme}.',
            'term.sudo': 'brayan is not in the sudoers file. This incident will be reported.',
            'term.notFound': '{cmd}: command not found. Type "help".'
        },

        es: {
            title: 'Brayan Mejía Salazar · Desarrollador de software',
            notFoundTitle: '404 · Brayan Mejía Salazar',
            notFoundBadge: 'Error 404 · Página no encontrada',
            notFoundLede: 'La página que buscas no existe o se ha movido. Los proyectos siguen donde los dejaste.',
            backHome: 'Volver al inicio',
            switchLang: 'Cambiar a inglés',
            cvFile: './files/Curriculum.pdf',
            cvName: 'Brayan-Mejia-Curriculum.pdf',
            cvEvent: 'cv-download-es',
            darkMode: 'Modo oscuro',
            closeTerminal: 'Cerrar terminal',
            name: 'Brayan Mejía Salazar · República Dominicana',
            phrases: [
                'Creo aplicaciones para Linux y Windows.',
                'Hago apps Qt y GTK que se sienten nativas.',
                'Blindo redes con nftables.',
                'Audito procesos y busco causas raíz.',
                'Uso Gentoo con ZFS en la raíz.',
                'Uso Gentoo con musl y LLVM.',
                'Gestiono servicios con systemd.',
                'Aprendo a romper cosas, pero con ética.'
            ],
            lede: 'Programas pequeños y rápidos que hacen una sola cosa bien: un bloqueador de pantalla que reacciona a tu teléfono, un menú de energía, un reproductor de música y un kill switch de VPN. Código abierto, escrito con Qt, GTK y la shell.',
            downloadCv: 'Descargar CV',
            projects: 'Proyectos',
            clear: 'Limpiar',
            filterStatus: '{count} de {total} proyectos usan {tag}',
            btScreenLocker: 'Un servicio en segundo plano que bloquea tu sesión cuando el Bluetooth de tu teléfono sale del alcance.',
            qbit: 'Un reproductor de música ligero con reproducción de video opcional. Disponible para Linux y Windows.',
            downloadWin: 'Descargar para Windows (.exe)',
            spm: 'Un menú de energía para hibernar, reiniciar, apagar o suspender, con el estilo del de MATE.',
            killSwitch: 'Un firewall que falla cerrado para ProtonVPN en Gentoo. Si el túnel de WireGuard se cae, todo el tráfico se detiene en lugar de filtrarse.',
            ppd: 'Una interfaz gráfica para power-profiles-daemon que cambia el perfil de energía activo mediante llamadas a D-Bus.',
            about: 'Acerca de',
            about1: 'Soy estudiante de Ingeniería de Software en la UAPA y llevo cinco años en Telenord, los últimos tres como auditor de calidad, donde aprendí a cuidar el proceso y a buscar la causa de un problema, no solo su síntoma.',
            about2: 'Uso Linux a diario desde hace más de nueve años. Actualmente curso programas de ciberseguridad y busco puestos de desarrollador, incluidos los remotos.',
            platformsDt: 'Plataformas',
            platformsDd: 'Linux, Windows (QBitMPlayer incluye un .exe)',
            languagesDt: 'Lenguajes',
            toolkitsDt: 'Frameworks y herramientas',
            systemsDt: 'Sistemas',
            systemsDd: 'Linux (Gentoo, Arch, Debian, Ubuntu, Fedora), systemd, nftables, dnsmasq y dnscrypt-proxy, WireGuard',
            spokenDt: 'Idiomas',
            spokenDd: 'Español (nativo), inglés (B2 o superior)',
            contact: 'Contacto',
            copy: 'Copiar',
            copied: 'Copiado',
            copyFailed: 'No se pudo copiar',
            openTerminal: 'Abrir terminal',
            orPress: 'o presiona',
            closeImage: 'Cerrar imagen',
            galleryLabel: 'Capturas del proyecto',
            enlarge: 'Ampliar imagen',

            tabScan: 'Escaneo',
            tabDevices: 'Dispositivos',
            tabDark: 'Oscuro',
            tabLight: 'Claro',
            tabGui: 'Interfaz',
            tabCli: 'CLI',
            tabRuleset: 'Reglas',
            tabTables: 'Tablas',

            shotBtScan: 'Diálogo de BtScreenLocker mostrando el mensaje de búsqueda de dispositivos Bluetooth de 30 segundos.',
            shotBtDevices: 'Ventana de BtScreenLocker con la lista de dispositivos Bluetooth detectados, nombre, dirección MAC, intensidad de señal y botón Add.',
            shotQbitDark: 'QBitMPlayer en Windows en modo oscuro mostrando el panel de lista de reproducción y los controles.',
            shotQbitLight: 'QBitMPlayer en Windows en modo claro mostrando el panel de lista de reproducción y los controles.',
            shotSpm: 'Ventana de spm con los botones Hibernate, PowerOff, Reboot, Suspend y Exit, y una cuenta regresiva para el apagado.',
            shotSpmCli: 'Salida en terminal de spm --help mostrando las opciones de línea de comandos.',
            shotKillSwitchRules: 'Conjunto de reglas de nftables para table inet vpn_killswitch con políticas drop por defecto y conjuntos de WireGuard.',
            shotKillSwitchTables: 'Salida en terminal de nft list tables mostrando las tablas activas vpn_killswitch y connlog.',
            shotPpdGui: 'Ventana de PowerProfilesDaemonGUI con opciones para Power Saver, Balanced y Performance seleccionado.',
            shotPpdCli: 'Salida en terminal de powerprofilesgui --help y -a junto a una notificación de escritorio mostrando Active profile: performance.',

            'tip.C': 'Un lenguaje de bajo nivel que da control directo sobre la memoria y el sistema.',
            'tip.C++': 'C con clases, plantillas y una biblioteca estándar muy completa.',
            'tip.Qt': 'Un framework multiplataforma para crear aplicaciones de escritorio nativas.',
            'tip.QtDBus': 'El módulo de Qt para comunicarse con otros programas mediante D-Bus.',
            'tip.Qt Multimedia': 'El módulo de Qt para reproducir audio y video.',
            'tip.GTK': 'El toolkit de GNOME para crear interfaces de escritorio.',
            'tip.Gtkmm': 'Los bindings oficiales de C++ para GTK.',
            'tip.D-Bus': 'El sistema de mensajería que permite a los programas de Linux comunicarse entre sí y con los servicios.',
            'tip.nftables': 'El framework de firewall del kernel de Linux, sucesor de iptables.',
            'tip.WireGuard': 'Un protocolo de VPN rápido y moderno integrado en el kernel de Linux.',
            'tip.systemd': 'El gestor de servicios que inicia y supervisa los demonios en la mayoría de sistemas Linux.',
            'tip.Shell': 'Scripts que automatizan tareas desde la línea de comandos.',
            'tip.CMake': 'Un generador de sistemas de compilación para proyectos en C y C++.',
            'tip.Meson': 'Un sistema de compilación rápido y moderno, popular en proyectos de GTK.',
            'tip.Windows': 'QBitMPlayer incluye un .exe listo para usar en sus releases de GitHub.',

            'term.welcome': 'Bienvenido. Escribe "help" para ver qué puedes hacer.',
            'term.help': [
                'Comandos disponibles:',
                '  ls [projects]          lista archivos o proyectos',
                '  cat <archivo|proyecto> lee un archivo o un proyecto',
                '  open <proyecto|cv>     abre un repo o descarga el CV',
                '  grep <tag>             filtra los proyectos por tecnología',
                '  theme [dark|light]     muestra o cambia el tema de color',
                '  whoami, clear, exit',
                'Tab completa y las flechas recorren tu historial.'
            ],
            'term.tryCat': 'Prueba: cat <nombre-del-proyecto>',
            'term.tryCatOne': 'Prueba: cat {name}',
            'term.lsNoAccess': "ls: no se puede acceder a '{arg}': No existe el archivo o el directorio",
            'term.catMissing': 'cat: falta el operando de archivo',
            'term.catNone': 'cat: {arg}: No existe el archivo o el directorio',
            'term.tags': 'Tags',
            'term.openMissing': 'open: falta el operando',
            'term.noCv': 'open: cv.pdf: No existe el archivo o el directorio',
            'term.downloading': 'Descargando el CV...',
            'term.projectNotFound': 'open: {arg}: proyecto no encontrado',
            'term.opening': 'Abriendo {url}',
            'term.grepMissing': 'grep: falta el operando',
            'term.grepNone': 'grep: ningún proyecto usa "{arg}"',
            'term.themeNow': 'Tema actual: {theme}',
            'term.themeBad': 'theme: se esperaba "dark" o "light"',
            'term.themeSet': 'Tema cambiado a {theme}.',
            'term.sudo': 'brayan no está en el archivo sudoers. Este incidente será reportado.',
            'term.notFound': '{cmd}: orden no encontrada. Escribe "help".'
        }
    };

    function detect() {
        try {
            const saved = localStorage.getItem('lang');
            if (supported.includes(saved))
                return saved;
        } catch (e) {
        }

        const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
        for (const l of prefs) {
            const code = String(l || '').toLowerCase().split('-')[0];
            if (supported.includes(code))
                return code;
        }

        return 'en';
    }

    let lang = detect();

    const get = key => {
        const own = dict[lang][key];
        return own !== undefined ? own : dict.en[key];
    };

    const format = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? vars[k] : m));

    const t = (key, vars) => {
        const v = get(key);
        return typeof v === 'string' ? format(v, vars) : key;
    };

    const list = key => {
        const v = get(key);
        return Array.isArray(v) ? v : [];
    };

    const toggle = document.getElementById('lang-toggle');

    function apply() {
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = get(el.dataset.i18n);
            if (typeof v === 'string')
                el.textContent = v;
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            el.dataset.i18nAttr.split(';').forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s.trim());
                const v = get(key);
                if (attr && typeof v === 'string')
                    el.setAttribute(attr, v);
            });
        });

        const first = list('phrases')[0];
        const typed = document.getElementById('typed');
        if (first && typed) {
            typed.textContent = first;
            const h1 = typed.closest('h1');
            if (h1)
                h1.setAttribute('aria-label', first);
        }

        if (toggle) {
            const other = lang === 'en' ? 'es' : 'en';
            toggle.textContent = other.toUpperCase();
            toggle.setAttribute('aria-label', t('switchLang'));
        }
    }

    function setLang(next) {
        if (!supported.includes(next) || next === lang)
            return;
        lang = next;
        try {
            localStorage.setItem('lang', lang);
        } catch (e) {
        }
        apply();
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    window.I18N = {
        get lang() { return lang; },
        supported,
        get,
        t,
        list,
        setLang
    };

    apply();

    if (toggle) {
        toggle.addEventListener('click', () => {
            setLang(lang === 'en' ? 'es' : 'en');
        });
    }
})();
