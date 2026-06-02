/* 
    Solaris Menu - Dynamic Logic Layer
    Handles rendering, search, navigation and UI interactions.
*/

/* opt_N ids match Solaris2.lua TileMenu export order (MenuDef) */
const MENU_FALLBACK = {
    player: [
        { group: "Character", icon: "fa-solid fa-shield-halved", items: [
            { id: "opt_1", label: "Revive", type: "action" },
            { id: "opt_2", label: "Suicide", type: "action" },
            { id: "opt_3", label: "Set Health", type: "slider", min: 0, max: 200, value: 100, unit: "" },
            { id: "opt_4", label: "Set Armour", type: "slider", min: 0, max: 100, value: 0, unit: "" },
            { id: "opt_5", label: "Clear Wounds", type: "action" },
            { id: "opt_6", label: "Open Locked Doors", type: "action" }
        ]},
        { group: "Survival", icon: "fa-solid fa-heart", items: [
            { id: "opt_7", label: "God Mode", type: "toggle", value: false },
            { id: "opt_8", label: "Semi God Mode", type: "toggle", value: false },
            { id: "opt_9", label: "Auto Revive", type: "toggle", value: false },
            { id: "opt_10", label: "Fake Dead", type: "toggle", value: false }
        ]},
        { group: "Powers", icon: "fa-solid fa-bolt", items: [
            { id: "opt_11", label: "Invisible", type: "toggle", value: false },
            { id: "opt_12", label: "Fast Punch", type: "toggle", value: false },
            { id: "opt_13", label: "Turn Tiny", type: "toggle", value: false },
            { id: "opt_14", label: "Infinite Stamina", type: "toggle", value: false },
            { id: "opt_15", label: "Infinite Oxygen", type: "toggle", value: false },
            { id: "opt_16", label: "Fast Run", type: "toggle", value: false },
            { id: "opt_17", label: "Super Jump", type: "toggle", value: false },
            { id: "opt_18", label: "Laser Eyes", type: "toggle", value: false }
        ]},
        { group: "Movement", icon: "fa-solid fa-person-running", items: [
            { id: "opt_19", label: "Noclip", type: "toggle", value: false },
            { id: "opt_20", label: "Noclip Mode", type: "cycle", options: ["Normal", "Invisible", "Full Invisible"], value: 0 },
            { id: "opt_21", label: "Noclip Speed", type: "slider", min: 1, max: 50, value: 10, unit: "" },
            { id: "opt_22", label: "Solo Session", type: "toggle", value: false },
            { id: "opt_23", label: "Auto TP Waypoint", type: "toggle", value: false },
            { id: "opt_24", label: "TP to Waypoint", type: "action" },
            { id: "opt_25", label: "TP Forward 5m", type: "action" }
        ]}
    ],
    combat: [
        { group: "Ragebot", icon: "fa-solid fa-crosshairs", items: [
            { id: "opt_26", label: "Enable Ragebot", type: "toggle", value: false },
            { id: "opt_27", label: "Magic Bullet", type: "toggle", value: false },
            { id: "opt_28", label: "Target Dead", type: "toggle", value: true },
            { id: "opt_29", label: "FOV Circle", type: "slider", min: 20, max: 300, value: 80, unit: "px" }
        ]},
        { group: "Destroyer", icon: "fa-solid fa-skull-crossbones", items: [
            { id: "opt_30", label: "Destroyer Mode", type: "toggle", value: false },
            { id: "opt_31", label: "Target Dead", type: "toggle", value: true },
            { id: "opt_32", label: "Target NPCs", type: "toggle", value: true },
            { id: "opt_33", label: "FOV Circle", type: "slider", min: 20, max: 300, value: 80, unit: "px" },
            { id: "opt_34", label: "Shoot Cars (Weapon)", type: "toggle", value: false }
        ]},
        { group: "Shooting", icon: "fa-solid fa-gun", items: [
            { id: "opt_35", label: "Remove Recoil", type: "toggle", value: false },
            { id: "opt_36", label: "RPG Mode", type: "toggle", value: false },
            { id: "opt_37", label: "Explosion on Hit", type: "toggle", value: false },
            { id: "opt_38", label: "Shoot Vehicles", type: "toggle", value: false },
            { id: "opt_39", label: "Laser Eyes", type: "toggle", value: false },
            { id: "opt_40", label: "Shooting Mode (FA)", type: "toggle", value: false }
        ]}
    ],
    weaponry: [
        { group: "Spawner", icon: "fa-solid fa-plus", items: [
            { id: "opt_41", label: "Give ALL Weapons", type: "action" },
            { id: "opt_42", label: "Ammo Amount", type: "slider", min: 1, max: 9999, value: 999, unit: "" },
            { id: "opt_43", label: "Spawn Named Weapon", type: "action" },
            { id: "opt_44", label: "Pistol", type: "action" },
            { id: "opt_45", label: "Assault Rifle", type: "action" },
            { id: "opt_46", label: "RPG", type: "action" }
        ]},
        { group: "My Weapons", icon: "fa-solid fa-gun", items: [
            { id: "opt_47", label: "Fill Ammo", type: "action" },
            { id: "opt_48", label: "Give Full Attachments", type: "action" },
            { id: "opt_49", label: "Remove Current Weapon", type: "action" },
            { id: "opt_50", label: "Remove All Weapons", type: "action" },
            { id: "opt_51", label: "Infinite Ammo", type: "toggle", value: false },
            { id: "opt_52", label: "No Reload", type: "toggle", value: false },
            { id: "opt_53", label: "Remove Recoil", type: "toggle", value: false },
            { id: "opt_54", label: "RGB Weapon", type: "toggle", value: false },
            { id: "opt_55", label: "Weapon Size", type: "slider", min: 1, max: 10, value: 1, unit: "x" }
        ]},
        { group: "Crosshair", icon: "fa-solid fa-crosshairs", items: [
            { id: "opt_56", label: "Enable Crosshair", type: "toggle", value: false },
            { id: "opt_57", label: "Crosshair Type", type: "cycle", options: ["Simple Cross", "Dot", "Circle", "T-Shape", "X-Shape"], value: 0 },
            { id: "opt_58", label: "Size", type: "slider", min: 1, max: 50, value: 10, unit: "px" },
            { id: "opt_59", label: "Offset X", type: "slider", min: -50, max: 50, value: 1, unit: "px" },
            { id: "opt_60", label: "Offset Y", type: "slider", min: -50, max: 50, value: 1, unit: "px" }
        ]}
    ],
    vehicles: [
        { group: "Your Vehicle", icon: "fa-solid fa-car", items: [
            { id: "opt_61", label: "Easy Handling", type: "toggle", value: false },
            { id: "opt_62", label: "Horn Boost", type: "toggle", value: false },
            { id: "opt_63", label: "Auto Repair", type: "toggle", value: false },
            { id: "opt_64", label: "Infinite Fuel", type: "toggle", value: false }
        ]}
    ],
    players: [],
    server: [],
    assists: [],
    protections: [],
    settings: []
};

const menuData = {};
mergeMenuData(MENU_FALLBACK);

let currentCategory = 'player';
let searchQuery = '';
let isAutoScrolling = false;

function sectionIdForNav(navId) {
    return navId;
}

function navIdForSection(sectionId) {
    return sectionId;
}

function iconClass(icon) {
    if (!icon) return 'fa-solid fa-sliders';
    return icon.indexOf('fa-') >= 0 ? icon : 'fa-solid ' + icon;
}

function mergeMenuData(patch) {
    if (!patch || typeof patch !== 'object') return;
    for (const key of Object.keys(patch)) {
        menuData[key] = patch[key];
    }
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

    if (!catIds.length || (catIds.length === 1 && !menuData[catIds[0]])) {
        tileGrid.innerHTML = '<div class="menu-loading">Loading options…</div>';
        return;
    }

    catIds.forEach(catId => {
        const categoryData = menuData[catId];
        if (!categoryData || !categoryData.length) return;
        
        const section = document.createElement('div');
        section.className = 'category-section';
        section.id = `section-${catId}`;
        section.setAttribute('data-category', catId);
        section.classList.add('reveal');

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
            tile.className = 'tile';

            const tileHeader = `
                <div class="tile-header">
                    <i class="${iconClass(group.icon)} tile-icon"></i>
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
                itemEl.className = 'function-item';
                if (item.type === 'toggle' && item.value) {
                    itemEl.classList.add('toggled-on');
                }

                let control = '';
                if (item.type === 'toggle') {
                    control = `<div class="toggle-switch ${item.value ? 'on' : ''}" data-id="${item.id}"></div>`;
                } else if (item.type === 'slider') {
                    const smin = item.min != null ? item.min : 0;
                    const smax = item.max != null ? item.max : 100;
                    control = `
                        <div class="slider-wrap">
                            <input type="range" min="${smin}" max="${smax}" value="${item.value}" data-id="${item.id}">
                            <span class="slider-val">${item.value}${item.unit || ''}</span>
                        </div>
                    `;
                } else if (item.type === 'cycle' && item.options && item.options.length) {
                    const opt = item.options[item.value] || item.options[0];
                    control = `<span class="cycle-val" data-id="${item.id}">${opt}</span>`;
                } else if (item.type === 'info') {
                    control = `<span class="info-val">${item.valueStr || ''}</span>`;
                } else {
                    control = `<span class="action-btn"><i class="fa-solid fa-chevron-right"></i></span>`;
                }

                itemEl.setAttribute('data-id', item.id);
                itemEl.innerHTML = `
                    <span class="function-label">${item.label}</span>
                    <div class="function-control">${control}</div>
                `;

                // Interaction logic
                if (item.type === 'toggle') {
                    const sw = itemEl.querySelector('.toggle-switch');
                    sw.onclick = (e) => {
                        e.stopPropagation();
                        item.value = !item.value;
                        sw.classList.toggle('on', item.value);
                        itemEl.classList.toggle('toggled-on', item.value);
                        onInteraction(item.id, item.value);
                    };
            } else if (item.type === 'slider') {
                const slider = itemEl.querySelector('input');
                const valDisplay = itemEl.querySelector('.slider-val');
                let sliderTimer = null;
                const pushSlider = () => {
                    valDisplay.textContent = `${item.value}${item.unit || ''}`;
                    onInteraction(item.id, item.value, { slider: true });
                };
                slider.oninput = (e) => {
                    e.stopPropagation();
                    item.value = parseInt(e.target.value, 10);
                    valDisplay.textContent = `${item.value}${item.unit || ''}`;
                    clearTimeout(sliderTimer);
                    sliderTimer = setTimeout(pushSlider, 180);
                };
                slider.onchange = (e) => {
                    e.stopPropagation();
                    item.value = parseInt(e.target.value, 10);
                    clearTimeout(sliderTimer);
                    pushSlider();
                };
                } else if (item.type === 'cycle') {
                    itemEl.style.cursor = 'pointer';
                    itemEl.onclick = (e) => {
                        e.stopPropagation();
                        item.value = (item.value + 1) % item.options.length;
                        itemEl.querySelector('.cycle-val').textContent = item.options[item.value];
                        onInteraction(item.id, item.value);
                    };
                } else if (item.type === 'action') {
                    itemEl.style.cursor = 'pointer';
                    itemEl.onclick = (e) => {
                        e.stopPropagation();
                        onInteraction(item.id, 'executed');
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

let _sliderRelayTimer = null;

function onInteraction(id, val, opts) {
    if (id === '__sol_refresh') return;
    const payload = { id: id, value: val, action: 'interaction' };
    const isSlider = opts && opts.slider === true;
    if (isSlider) {
        clearTimeout(_sliderRelayTimer);
        _sliderRelayTimer = setTimeout(function () {
            solClipboardRelay(payload);
        }, 120);
        return;
    }
    solClipboardRelay(payload);
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

window.__solClickAt = function(x, y, texW, texH) {
    if (window.__sol_suppressClick) return;
    texW = texW || 950;
    texH = texH || 650;
    const vw = window.innerWidth || texW;
    const vh = window.innerHeight || texH;
    const cx = Math.floor(x * (vw / texW));
    const cy = Math.floor(y * (vh / texH));
    const el = document.elementFromPoint(cx, cy);
    if (!el) return;

    const nav = el.closest('.nav-item');
    if (nav) {
        nav.click();
        return;
    }

    const item = el.closest('.function-item');
    if (!item) return;

    const toggle = item.querySelector('.toggle-switch');
    if (toggle) {
        toggle.click();
        return;
    }
    const slider = item.querySelector('input[type="range"]');
    if (slider) {
        slider.focus();
        return;
    }
    const cycle = item.querySelector('.cycle-val');
    if (cycle) {
        item.click();
        return;
    }
    item.click();
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
        if (window.__solClickAt) window.__solClickAt(data.x, data.y, data.w || 950, data.h || 650);
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

    if (data.type === "solaris:setMenuData") {
        window.__applyMenuData(data.menuData);
        return;
    }

    if (data.type === "solaris:interact" && data.id) {
        solClipboardRelay({ id: data.id, value: data.value, action: 'interaction' });
        return;
    }

    if (data.type === "solaris:notify") {
        const msg = [data.title, data.text].filter(Boolean).join(": ");
        if (msg) showNotify(msg);
        return;
    }
}

window.__applyMenuData = function (patch) {
    mergeMenuData(patch);
    if (patch && Object.keys(patch).length && !menuData[currentCategory]) {
        currentCategory = Object.keys(patch)[0];
    }
    renderAll();
    setupObservers();
};

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

window.onInteraction = onInteraction;