/* 
    Solaris Menu - Dynamic Logic Layer
    Handles rendering, search, navigation and UI interactions.
*/

const menuData = {
    player: [
        {
            group: "General Options",
            icon: "fa-sliders",
            items: [
                { id: "revive_death", label: "Revive on Death", type: "toggle", value: false },
                { id: "revive_now", label: "Revive", type: "action" },
                { id: "suicide", label: "Suicide", type: "action" },
                { id: "clean_ped", label: "Clean Injuries", type: "action" },
                { id: "handcuffs", label: "Cuff/Uncuff", type: "action" },
                { id: "vest", label: "Set Vest", type: "action" },
                { id: "tp_waypoint", label: "Teleport to Waypoint", type: "action" }
            ]
        },
        {
            group: "Powers",
            icon: "fa-bolt-lightning",
            items: [
                { id: "godmode", label: "Invincibility", type: "toggle", value: true },
                { id: "full_invis", label: "Full Invisible", type: "toggle", value: false },
                { id: "super_jump", label: "Super Jump", type: "toggle", value: false },
                { id: "super_punch", label: "Super Punch", type: "toggle", value: false },
                { id: "super_run", label: "Super Speed", type: "toggle", value: false },
                { id: "run_speed", label: "Run Speed", type: "slider", value: 50 },
                { id: "explosive_eyes", label: "Explosive Eyes", type: "toggle", value: false },
                { id: "laser_eyes", label: "Laser Eyes", type: "toggle", value: false }
            ]
        },
        {
            group: "Movement",
            icon: "fa-person-walking",
            items: [
                { id: "noclip", label: "Noclip", type: "toggle", value: false },
                { id: "noclip_invis", label: "Invisible Noclip", type: "toggle", value: false },
                { id: "noclip_speed", label: "Noclip Speed", type: "slider", value: 30 },
                { id: "freecam", label: "Freecam", type: "toggle", value: false },
                { id: "freecam_speed", label: "Freecam Speed", type: "slider", value: 40 },
                { id: "inf_stamina", label: "Infinite Stamina", type: "toggle", value: true },
                { id: "auto_tp_way", label: "Automatic TP Way", type: "toggle", value: true }
            ]
        }
    ],
    vehicle: [
        {
            group: "Basic Vehicle",
            icon: "fa-car-side",
            items: [
                { id: "v_repair", label: "Repair Vehicle", type: "action" },
                { id: "v_clean", label: "Clean Vehicle", type: "action" },
                { id: "v_god", label: "Vehicle God Mode", type: "toggle", value: false },
                { id: "v_speed", label: "Speed Multiplier", type: "slider", value: 10 }
            ]
        }
    ],
    radar: [
        {
            group: "Radar Options",
            icon: "fa-satellite-dish",
            items: [
                { id: "radar_toggle", label: "Enable Radar", type: "toggle", value: true },
                { id: "radar_zoom", label: "Zoom Level", type: "slider", value: 50 }
            ]
        }
    ],
    weapons: [
        {
            group: "Weapon Mods",
            icon: "fa-gun",
            items: [
                { id: "master_aim", label: "Master Aimbot", type: "toggle", value: true },
                { id: "silent_aim", label: "Silent Aim", type: "toggle", value: false },
                { id: "no_recoil", label: "No Recoil", type: "toggle", value: true },
                { id: "no_spread", label: "No Spread", type: "toggle", value: true },
                { id: "inf_ammo", label: "Infinite Ammo", type: "toggle", value: true }
            ]
        }
    ],
    visuals: [
        {
            group: "ESP Suite",
            icon: "fa-eye",
            items: [
                { id: "esp_master", label: "Master ESP", type: "toggle", value: true },
                { id: "esp_box", label: "Box ESP", type: "toggle", value: true },
                { id: "esp_skele", label: "Skeleton", type: "toggle", value: true },
                { id: "esp_dist", label: "Distance", type: "toggle", value: true }
            ]
        }
    ],
    exploits: [
        {
            group: "Protections",
            icon: "fa-shield-halved",
            items: [
                { id: "antiaim", label: "Antiaim", type: "toggle", value: true },
                { id: "anti_tp", label: "Block TP to Me", type: "toggle", value: true },
                { id: "anti_cuffs", label: "Anti Cuffs", type: "toggle", value: true }
            ]
        }
    ],
    settings: [
        {
            group: "Theme",
            icon: "fa-palette",
            items: [
                { id: "change_bind", label: "Change Bind [...]", type: "action" },
                { id: "menu_accent", label: "Menu Accent", type: "accent", value: "solaris" },
                { id: "rgb_rainbow", label: "RGB Rainbow", type: "toggle", value: false },
                { id: "menu_alpha", label: "Transparency", type: "slider", value: 90 }
            ]
        }
    ]
};

let currentCategory = 'player';
let searchQuery = '';
let isAutoScrolling = false;

const NAV_TO_SECTION = {
    player: 'player',
    vehicles: 'vehicle',
    vehicle: 'vehicle',
    weapons: 'weapons',
    online: 'radar',
    utils: 'visuals',
    server: 'exploits',
    exploits: 'exploits',
    configs: 'settings',
    settings: 'settings',
};

function sectionIdForNav(navId) {
    return NAV_TO_SECTION[navId] || navId;
}

function navIdForSection(sectionId) {
    for (const [nav, sec] of Object.entries(NAV_TO_SECTION)) {
        if (sec === sectionId) return nav;
    }
    return sectionId;
}

// DOM Elements
const tileGrid = document.getElementById('tile-grid');
const searchInput = document.getElementById('function-search');
const notification = document.getElementById('notification');

function init() {
    renderAll();
    setupEvents();
    setupObservers();
}

/* ---- Render ALL categories ---- */
function renderAll() {
    tileGrid.innerHTML = '';

    const sectionId = sectionIdForNav(currentCategory);
    const catIds = searchQuery
        ? Object.keys(menuData)
        : (menuData[sectionId] ? [sectionId] : [currentCategory]);

    catIds.forEach(catId => {
        const categoryData = menuData[catId];
        if (!categoryData) return;
        
        const section = document.createElement('div');
        section.className = 'category-section';
        section.id = `section-${catId}`;
        section.setAttribute('data-category', catId);

        const header = document.createElement('div');
        header.className = 'category-header';
        const label = catId === 'vehicle' ? 'vehicles' : catId;
        header.innerHTML = `<span>${label.replace(/_/g, ' ')}</span>`;
        section.appendChild(header);

        let itemsRendered = 0;

        categoryData.forEach((group, groupIdx) => {
            const filteredItems = group.items.filter(item =>
                item.label.toLowerCase().includes(searchQuery)
            );

            if (filteredItems.length === 0) return;

            const tile = document.createElement('div');
            tile.className = 'tile tile-entry-anim';
            tile.style.animationDelay = `${groupIdx * 60}ms`;

            const tileHeader = `
                <div class="tile-header">
                    <i class="fa-solid ${group.icon} tile-icon"></i>
                    <span>${group.group}</span>
                </div>
            `;

            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'tile-items';

            filteredItems.forEach((item, itemIdx) => {
                const delay = `${(groupIdx * 60) + (itemIdx * 30) + 80}ms`;

                if (item.type === 'accent') {
                    const itemEl = document.createElement('div');
                    itemEl.className = 'function-item item-entry-anim';
                    itemEl.style.animationDelay = delay;

                    const colors = [
                        { name: 'solaris', hex: '#00b585', rgb: '0, 181, 133', bright: '#00e0a5' },
                        { name: 'green', hex: '#22c55e', rgb: '34, 197, 94', bright: '#4ade80' },
                        { name: 'blue', hex: '#3b82f6', rgb: '59, 130, 246', bright: '#60a5fa' },
                        { name: 'purple', hex: '#a855f7', rgb: '168, 85, 247', bright: '#c084fc' },
                        { name: 'red', hex: '#ef4444', rgb: '239, 68, 68', bright: '#f87171' },
                        { name: 'pink', hex: '#ec4899', rgb: '236, 72, 153', bright: '#f472b6' },
                        { name: 'amber', hex: '#eab308', rgb: '234, 179, 8', bright: '#facc15' },
                        { name: 'cyan', hex: '#06b6d4', rgb: '6, 182, 212', bright: '#22d3ee' }
                    ];

                    let selectorHtml = '<div class="accent-color-selector">';
                    colors.forEach(c => {
                        const activeClass = item.value === c.name ? 'active' : '';
                        selectorHtml += `<div class="accent-dot ${activeClass}" style="background-color: ${c.hex};" data-color="${c.name}"></div>`;
                    });
                    selectorHtml += '</div>';

                    itemEl.innerHTML = `
                        <span class="function-label">${item.label}</span>
                        <div class="function-control">${selectorHtml}</div>
                    `;

                    itemEl.querySelectorAll('.accent-dot').forEach(dot => {
                        dot.onclick = () => {
                            const colName = dot.getAttribute('data-color');
                            item.value = colName;

                            const isRgbActive = menuData.settings[0].items.find(i => i.id === 'rgb_rainbow').value;
                            if (!isRgbActive) {
                                const c = colors.find(color => color.name === colName);
                                setAccentColor(c.hex, c.rgb, c.bright);
                            }

                            itemEl.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('active'));
                            dot.classList.add('active');

                            onInteraction(item.id, colName);
                        };
                    });

                    itemsContainer.appendChild(itemEl);
                    itemsRendered++;
                    return;
                }

                const itemEl = document.createElement('div');
                itemEl.className = 'function-item item-entry-anim';
                if (item.type === 'toggle' && item.value) {
                    itemEl.classList.add('toggled-on');
                }
                itemEl.style.animationDelay = delay;

                let control = '';
                if (item.type === 'toggle') {
                    control = `<div class="toggle-switch ${item.value ? 'on' : ''}" data-id="${item.id}"></div>`;
                } else if (item.type === 'slider') {
                    control = `
                        <div class="slider-wrap">
                            <input type="range" min="0" max="100" value="${item.value}" data-id="${item.id}">
                            <span class="slider-val">${item.value}${item.unit || ''}</span>
                        </div>
                    `;
                } else {
                    control = `<span class="action-btn">${item.value || '<i class="fa-solid fa-chevron-right"></i>'}</span>`;
                }

                itemEl.innerHTML = `
                    <span class="function-label">${item.label}</span>
                    <div class="function-control">${control}</div>
                `;

                // Interaction logic
                if (item.type === 'toggle') {
                    itemEl.querySelector('.toggle-switch').onclick = (e) => {
                        item.value = !item.value;
                        e.currentTarget.classList.toggle('on');
                        itemEl.classList.toggle('toggled-on', item.value); 
                        onInteraction(item.id, item.value);

                        if (item.id === 'rgb_rainbow') {
                            if (item.value) {
                                startRGBRainbow();
                            } else {
                                stopRGBRainbow();
                            }
                        }
                    };
                } else if (item.type === 'slider') {
                    const slider = itemEl.querySelector('input');
                    const valDisplay = itemEl.querySelector('.slider-val');
                    slider.oninput = (e) => {
                        item.value = e.target.value;
                        valDisplay.textContent = `${item.value}${item.unit || ''}`;
                        onInteraction(item.id, item.value);
                    };
                } else {
                    itemEl.onclick = () => {
                        if (item.id === 'change_bind') {
                            startListeningForKey(item, itemEl);
                        } else {
                            onInteraction(item.id, 'executed');
                            showNotify(`Action: ${item.label}`);
                        }
                    };
                }

                itemsContainer.appendChild(itemEl);
                itemsRendered++;
            });

            tile.innerHTML = tileHeader;
            tile.appendChild(itemsContainer);
            section.appendChild(tile);
        });

        if (itemsRendered > 0) {
            tileGrid.appendChild(section);
        }
    });

    // Forced reveal for top section
    const firstSection = tileGrid.querySelector('.category-section');
    if (firstSection) firstSection.classList.add('reveal');
}

/* ---- Intersection Observers ---- */
function setupObservers() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            } else {
                entry.target.classList.remove('reveal');
            }
        });
    }, { threshold: 0.1 });

    const spyObserver = new IntersectionObserver((entries) => {
        if (isAutoScrolling) return; 

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const catId = entry.target.getAttribute('data-category');
                updateActiveNav(catId);
            }
        });
    }, { 
        root: tileGrid,
        threshold: 0.5,
        rootMargin: "-20% 0px -40% 0px"
    });

    document.querySelectorAll('.category-section').forEach(section => {
        revealObserver.observe(section);
        spyObserver.observe(section);
    });
}

function updateActiveNav(sectionId) {
    const navId = navIdForSection(sectionId);
    if (navId === currentCategory) return;

    currentCategory = navId;
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-category') === navId);
    });
}

function setupEvents() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.onclick = (e) => {
            e.preventDefault();
            const navId = item.getAttribute('data-category');
            const secId = sectionIdForNav(navId);
            currentCategory = navId;
            document.querySelectorAll('.nav-item').forEach(n => {
                n.classList.toggle('active', n.getAttribute('data-category') === navId);
            });
            renderAll();
            setupObservers();
        };
    });

    searchInput.oninput = (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderAll();
        setupObservers(); 
    };
}

function onInteraction(id, val) {
    console.log(`[Interaction] ${id} -> ${val}`);
}

function showNotify(msg) {
    if (!notification) return;
    notification.textContent = msg;
    notification.classList.add('show');
    clearTimeout(window.notifTimeout);
    window.notifTimeout = setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

/* ---- Keybind Listening & Accent Picker Helpers ---- */
let isListeningForKey = false;
function startListeningForKey(item, itemEl) {
    if (isListeningForKey) return;
    isListeningForKey = true;

    const labelEl = itemEl.querySelector('.function-label');

    labelEl.textContent = "Change Bind [Press Key...]";
    labelEl.style.color = "var(--accent)";

    function onKeyDown(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.key === 'Escape') {
            window.removeEventListener('keydown', onKeyDown, true);
            isListeningForKey = false;
            renderAll();
            setupObservers();
            showNotify('Keybind change cancelled');
            return;
        }

        let keyName = e.key;
        if (keyName === ' ') keyName = 'SPACE';
        else if (keyName.length === 1) keyName = keyName.toUpperCase();
        else keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);

        item.label = `Change Bind [${keyName}]`;
        
        window.removeEventListener('keydown', onKeyDown, true);
        isListeningForKey = false;

        renderAll();
        setupObservers();
        onInteraction(item.id, keyName);
        showNotify(`Keybind updated to: ${keyName}`);
    }

    window.addEventListener('keydown', onKeyDown, true);
}

let rgbInterval = null;
let rgbHue = 0;

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

function startRGBRainbow() {
    if (rgbInterval) return;
    
    function cycle() {
        const rgbRainbowItem = menuData.settings[0].items.find(i => i.id === 'rgb_rainbow');
        if (!rgbRainbowItem || !rgbRainbowItem.value) {
            rgbInterval = null;
            applyPresetAccent();
            return;
        }
        rgbHue = (rgbHue + 0.7) % 360;
        const [r, g, b] = hslToRgb(rgbHue, 95, 50);
        const hex = rgbToHex(r, g, b);
        
        const [br, bg, bb] = hslToRgb(rgbHue, 95, 60);
        const brightHex = rgbToHex(br, bg, bb);
        
        setAccentColor(hex, `${r}, ${g}, ${b}`, brightHex);
        rgbInterval = requestAnimationFrame(cycle);
    }
    
    rgbInterval = requestAnimationFrame(cycle);
}

function stopRGBRainbow() {
    applyPresetAccent();
}

function applyPresetAccent() {
    const accentItem = menuData.settings[0].items.find(i => i.id === 'menu_accent');
    const selectedColor = accentItem ? accentItem.value : 'solaris';
    
    const colors = {
        solaris: { hex: '#00b585', rgb: '0, 181, 133', bright: '#00e0a5' },
        green: { hex: '#22c55e', rgb: '34, 197, 94', bright: '#4ade80' },
        blue: { hex: '#3b82f6', rgb: '59, 130, 246', bright: '#60a5fa' },
        purple: { hex: '#a855f7', rgb: '168, 85, 247', bright: '#c084fc' },
        red: { hex: '#ef4444', rgb: '239, 68, 68', bright: '#f87171' },
        pink: { hex: '#ec4899', rgb: '236, 72, 153', bright: '#f472b6' },
        amber: { hex: '#eab308', rgb: '234, 179, 8', bright: '#facc15' },
        cyan: { hex: '#06b6d4', rgb: '6, 182, 212', bright: '#22d3ee' }
    };
    
    const c = colors[selectedColor] || colors.solaris;
    setAccentColor(c.hex, c.rgb, c.bright);
}

function setAccentColor(hex, rgb, brightHex) {
    document.documentElement.style.setProperty('--accent', hex);
    document.documentElement.style.setProperty('--accent-rgb', rgb);
    if (brightHex) {
        document.documentElement.style.setProperty('--accent-bright', brightHex);
    }
}

init();


/* ---- FiveM NUI/DUI Hooks Injected during compile ---- */
window.__sol_suppressClick = false;

window.__solClickAt = function(x, y) {
    if (window.__sol_suppressClick) return;
    const el = document.elementFromPoint(x, y);
    if (!el) return;
    
    let target = el;
    if (el.classList.contains('function-item') && el.querySelector('.toggle-switch')) {
        target = el.querySelector('.toggle-switch');
    } else if (el.closest('.nav-item')) {
        target = el.closest('.nav-item');
    }
    
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
    });
    target.dispatchEvent(event);
};

function applyStateSync(stateObj) {
    if (!stateObj) return;
    for (const [id, value] of Object.entries(stateObj)) {
        const toggleEl = document.querySelector('.toggle-switch[data-id="' + id + '"]');
        if (toggleEl) {
            if (value) {
                toggleEl.classList.add('on');
                toggleEl.closest('.function-item').classList.add('toggled-on');
            } else {
                toggleEl.classList.remove('on');
                toggleEl.closest('.function-item').classList.remove('toggled-on');
            }
        }
        
        for (const catKey in menuData) {
            const cat = menuData[catKey];
            const subtabs = Array.isArray(cat) ? cat : (Object.values(cat).filter(v => Array.isArray(v)).flat());
            for (const group of subtabs) {
                if (group.items) {
                    const item = group.items.find(i => i.id === id);
                    if (item) item.value = value;
                }
            }
        }
    }
}

function readUiVar(name, fallback) {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
    return (isNaN(v) || v <= 0) ? fallback : v;
}

function applyDisplayScale(menuScale, monitorScale) {
    const menu = Math.max(0.85, Math.min(1.35, Number(menuScale) || 1));
    document.documentElement.style.setProperty("--menu-scale", String(menu));
    document.documentElement.style.setProperty("--monitor-scale", "1");
    document.documentElement.style.setProperty("--ui-zoom", "1");
}

function handleSolarisMessage(data) {
    if (!data || !data.type) return;

    if (data.type === "solaris:setScale" && data.scale != null) {
        applyDisplayScale(data.scale, readUiVar("--monitor-scale", 1));
        return;
    }

    if (data.type === "solaris:setMonitorResolution") {
        applyDisplayScale(readUiVar("--menu-scale", 1), data.scale);
        return;
    }

    if (data.type === "solaris:click") {
        if (window.__solClickAt) window.__solClickAt(data.x, data.y);
        return;
    }

    if (data.type === "solaris:visible" || data.type === "solaris:setVisible") {
        const show = data.visible === true;
        document.documentElement.classList.add("dui-mode");
        document.body.classList.add("dui-mode");
        document.body.classList.remove("dui-boot");
        document.body.style.display = show ? "flex" : "none";
        document.body.style.visibility = show ? "visible" : "hidden";
        document.body.style.opacity = show ? "1" : "0";
        var wrap = document.querySelector(".menu-wrapper");
        if (wrap) {
            wrap.style.display = "flex";
            wrap.style.visibility = "visible";
            wrap.style.opacity = "1";
        }
        return;
    }

    if (data.type === "solaris:setState") {
        applyStateSync(data.state);
        return;
    }

    if (data.type === "solaris:init") {
        applyPresetAccent();
        return;
    }
}

window.addEventListener("message", function (event) {
    let data = event.data;
    if (typeof data === "string") {
        try { data = JSON.parse(data); } catch (e) { return; }
    }
    handleSolarisMessage(data);
});

window.handleDuiMessage = function (raw) {
    let data = raw;
    if (typeof data === "string") {
        try { data = JSON.parse(data); } catch (e) { return; }
    }
    handleSolarisMessage(data);
};

if (!/[?&]preview=1\b/.test(window.location.search) && window.location.protocol !== "file:") {
    document.documentElement.classList.add("dui-mode");
    document.body.classList.add("dui-mode");
    document.body.style.display = "flex";
    document.body.style.visibility = "visible";
    document.body.style.opacity = "1";
    applyDisplayScale(1, 1);
}

let _solClipSeq = 0;
function solClipboardRelay(payload) {
    try {
        _solClipSeq++;
        payload._seq = _solClipSeq;
        const s = 'SOLARIS_NUI::' + _solClipSeq + '::' + JSON.stringify(payload);
        const ta = document.createElement('textarea');
        ta.value = s;
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        console.log(s);
    } catch(e) {}
}

const originalOnInteraction = window.onInteraction;
window.onInteraction = function(id, val) {
    if (originalOnInteraction) originalOnInteraction(id, val);
    
    const payload = {
        id: id,
        value: val,
        action: 'interaction'
    };
    solClipboardRelay(payload);
}