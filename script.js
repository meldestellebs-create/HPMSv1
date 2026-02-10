
// ==========================================
// GLOBALE STEUERUNG (Tabs)
// ==========================================
function switchTool(toolId) {
    // Buttons
    document.querySelectorAll('.tool-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + toolId).classList.add('active');

    // Sections
    document.querySelectorAll('.tool-section').forEach(s => s.classList.add('hidden'));
    const activeSection = document.getElementById('tool-' + toolId);
    activeSection.classList.remove('hidden');
    activeSection.classList.add('animate-in');
}

// =========================================================
// TOOL 1: BQW-2 (Wizard Logik - Mit kompletter Datenbank)
// =========================================================
let bqwStand = '';

// Optionen Step 2
const bqwZielOptionen = {
    kein: [
        { id: 'deutsch', label: 'Deutsch lernen', icon: '🗣️', desc: 'Sprache erlernen' },
        { id: 'hauptschul', label: 'Hauptschulabschluss', icon: '📝', desc: 'Abschluss nachholen' },
        { id: 'orientierung', label: 'Orientierung', icon: '🧭', desc: 'Berufliche Orientierung' },
        { id: 'ausbildung', label: 'Ausbildung', icon: '🎯', desc: 'Ausbildung beginnen' }
    ],
    hauptschul: [
        { id: 'mittlerer', label: 'Mittlere Reife', icon: '📚', desc: 'Fachschulreife' },
        { id: 'orientierung', label: 'Orientierung', icon: '🧭', desc: 'Beruflich orientieren' },
        { id: 'ausbildung', label: 'Ausbildung', icon: '🎯', desc: 'Lehre beginnen' }
    ],
    mittlerer: [
        { id: 'fhr', label: 'Fachhochschulreife', icon: '🎓', desc: 'BK besuchen' },
        { id: 'abitur', label: 'Abitur', icon: '🎖️', desc: 'Allg. Hochschulreife' },
        { id: 'orientierung', label: 'Orientierung', icon: '🧭', desc: 'Beruflich orientieren' },
        { id: 'ausbildung', label: 'Ausbildung', icon: '🎯', desc: 'Lehre beginnen' }
    ]
};

// DATENBANK (Vollständig inkl. PDF Links)
const bqwData = {
    kein: {
        deutsch: [
            {
                name: "VABO - Vorqualifizierungsjahr Arbeit/Beruf",
                desc: "Für junge Menschen ohne Deutschkenntnisse.",
                details: ["Dauer: 1 Jahr", "Ziel: Deutsch A1-B1", "Schulplatzgarantie"],
                // PDF LINK MIT LEERZEICHEN (Encoded)
                link: "Anfrage%20VABO%20SJ%2026-27%20Version%2003-02-2026.pdf",
                btn: "Vermittlungsanfrage VABO (PDF)"
            },
            {
                name: "Integrationskurs",
                desc: "Bundesweites Angebot zum Spracherwerb.",
                details: ["Dauer: 6-10 Monate", "Träger: VHS u.a."],
                link: "https://www.vhs-stuttgart.de",
                btn: "Zur VHS Stuttgart"
            }
        ],
        hauptschul: [
            {
                name: "AVdual",
                desc: "Ausbildungsvorbereitung dual - Hauptschulabschluss nachholen.",
                details: ["Dauer: 1 Jahr", "Viel Praxis", "Sozialpäd. Begleitung"],
                link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                btn: "Vermittlungsanfrage AVdual (PDF)"
            },
            {
                name: "Schulfremdenprüfung",
                desc: "Abschluss ohne Schulbesuch durch Prüfung.",
                details: ["Vorbereitung nötig", "Anmeldung beim Schulamt"],
                link: "#",
                btn: "Infos Schulamt"
            },
            {
                name: "BvB (Berufsvorbereitende Bildungsmaßnahme)",
                desc: "Vorbereitung auf Ausbildung durch die Agentur für Arbeit.",
                details: ["Dauer: bis 12 Monate", "Mit Vergütung (BAB)"],
                link: "https://www.arbeitsagentur.de",
                btn: "Agentur für Arbeit"
            }
        ],
        orientierung: [ 
            { name: "Freiwilligendienste (FSJ / FÖJ)", desc: "Freiwilliges Soziales Jahr.", details: ["Dauer: 12 Monate", "Taschengeld"], link: "https://www.jugendagentur.net", btn: "Jugendagentur" },
            { name: "EQ (Einstiegsqualifizierung)", desc: "Langzeitpraktikum im Betrieb.", details: ["Dauer: 6-12 Monate", "Vergütung"], link: "https://www.arbeitsagentur.de", btn: "Agentur für Arbeit" }
        ],
        ausbildung: [ { name: "AVdual", desc: "Vorbereitung auf Ausbildung.", details: ["Praktikum + Schule"], link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf", btn: "Vermittlungsanfrage AVdual" } ]
    },
    hauptschul: {
        mittlerer: [
            {
                name: "2-jährige Berufsfachschule (2BFS)",
                desc: "Weg zur Mittleren Reife.",
                details: ["Dauer: 2 Jahre", "Profile: Technik, Pflege, Hauswirtschaft"],
                link: "https://www.farbegestaltung.de/wp-content/uploads/Einjaehrige-Berufsfachschule-Angebote-Stuttgart-02_2025.pdf",
                btn: "Infoblatt (PDF)"
            },
            {
                name: "Berufsaufbauschule (BAS)",
                desc: "Mittlere Reife nach abgeschlossener Ausbildung.",
                details: ["Dauer: 1 Jahr"],
                link: "#",
                btn: "Infos BAS"
            }
        ],
        ausbildung: [ { name: "Duale Ausbildung", desc: "Lehre im Betrieb + Berufsschule.", details: ["Dauer: 3 Jahre"], link: "https://www.hwk-stuttgart.de", btn: "HWK Lehrstellen" } ],
        orientierung: [ { name: "AVdual", desc: "Zur Notenverbesserung.", details: ["Praxis"], link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf", btn: "Anfrage AVdual" } ]
    },
    mittlerer: {
        fhr: [ { name: "Berufskolleg (BK)", desc: "Führt zur Fachhochschulreife.", details: ["Dauer: 1-2 Jahre"], link: "https://bewo.kultus-bw.de", btn: "BewO Bewerbung" } ],
        abitur: [ { name: "Berufliches Gymnasium", desc: "Weg zum Abitur.", details: ["Dauer: 3 Jahre", "Schnitt 3,0 nötig"], link: "https://bewo.kultus-bw.de", btn: "BewO Bewerbung" } ],
        ausbildung: [ { name: "Duale Ausbildung", desc: "Anspruchsvolle Berufe.", details: ["Karrierechancen"], link: "https://www.ihk.de", btn: "IHK Infos" } ],
        orientierung: [ { name: "Freiwilligendienste", desc: "FSJ / FÖJ / BFD", details: ["6-18 Monate"], link: "https://www.jugendagentur.net", btn: "Jugendagentur" } ]
    }
};

function bqwSelectStand(stand) {
    bqwStand = stand;
    document.getElementById('bqw-step1').classList.add('hidden');
    document.getElementById('bqw-step2').classList.remove('hidden');

    const grid = document.getElementById('bqw-ziel-grid');
    grid.innerHTML = '';

    (bqwZielOptionen[stand] || []).forEach(opt => {
        grid.innerHTML += `
            <div class="option-card animate-in" onclick="bqwShowResults('${opt.id}')">
                <div class="card-icon-wrapper">${opt.icon}</div>
                <h3>${opt.label}</h3>
                <p>${opt.desc}</p>
            </div>
        `;
    });
}

function bqwShowResults(ziel) {
    document.getElementById('bqw-step2').classList.add('hidden');
    document.getElementById('bqw-results').classList.remove('hidden');

    const grid = document.getElementById('bqw-results-grid');
    grid.innerHTML = '';

    const results = bqwData[bqwStand]?.[ziel] || [];
    if(results.length === 0) grid.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';

    results.forEach(res => {
        const detailsHtml = res.details.map(d => `<li>${d}</li>`).join('');
        grid.innerHTML += `
            <div class="result-card animate-in">
                <div class="result-header"><h3>${res.name}</h3></div>
                <p class="result-desc">${res.desc}</p>
                <ul class="result-details">${detailsHtml}</ul>
                <div class="result-footer">
                    <a href="${res.link}" target="_blank" class="btn btn-primary btn-full">${res.btn}</a>
                </div>
            </div>
        `;
    });
}

function bqwReset() {
    bqwStand = '';
    document.getElementById('bqw-results').classList.add('hidden');
    document.getElementById('bqw-step2').classList.add('hidden');
    document.getElementById('bqw-step1').classList.remove('hidden');
}

// =========================================================
// TOOL 2: BW-Option-7 (Bildungswegetool - Dropdowns)
// =========================================================
const bw7Targets = {
    kein: { hsa: "Hauptschulabschluss", ausbildung: "Ausbildung (AVdual)" },
    hsa: { mr: "Mittlere Reife", ausbildung: "Berufsausbildung" },
    mr: { fhr: "Fachhochschulreife", abi: "Abitur", ausbildung: "Berufsausbildung" },
    fhr: { studium_fh: "Studium (FH)", ausbildung: "Ausbildung" },
    abi: { studium: "Studium (Uni/FH)", ausbildung: "Ausbildung" }
};

const bw7Paths = {
    'kein-hsa': { steps: ['Start: Ohne Abschluss', 'VABO (bei Sprachbedarf)', 'AVdual (Ausbildungsvorbereitung)', 'Ziel: Hauptschulabschluss'], info: 'Der Weg führt über das AVdual, um den Abschluss nachzuholen.' },
    'kein-ausbildung': { steps: ['Start: Ohne Abschluss', 'AVdual', 'Ziel: Ausbildung'], info: 'AVdual macht dich fit für die Ausbildung durch Praktika.' },
    'hsa-mr': { steps: ['Start: Hauptschulabschluss', '2-jährige Berufsfachschule (2BFS)', 'Ziel: Mittlere Reife'], info: 'Klassischer Weg über die 2BFS in zwei Jahren.' },
    'hsa-ausbildung': { steps: ['Start: Hauptschulabschluss', 'Duale Ausbildung', 'Ziel: Geselle/Facharbeiter'], info: 'Direkter Einstieg in den Beruf.' },
    'mr-abi': { steps: ['Start: Mittlere Reife', 'Berufliches Gymnasium (3 Jahre)', 'Ziel: Abitur'], info: 'Voraussetzung: Schnitt 3,0 in Hauptfächern (D,M,E).' },
    'mr-fhr': { steps: ['Start: Mittlere Reife', 'Berufskolleg (BK)', 'Ziel: Fachhochschulreife'], info: 'Qualifiziert für FH-Studium und gehobene Ausbildungen.' },
    'mr-ausbildung': { steps: ['Start: Mittlere Reife', 'Duale Ausbildung', 'Ziel: Beruf'], info: 'Gute Chancen auf anspruchsvolle Berufe (Bank, Industrie, IT).' },
    'fhr-studium_fh': { steps: ['Start: Fachhochschulreife', 'Fachhochschule (FH)', 'Ziel: Bachelor'], info: 'Studium an einer Hochschule für Angewandte Wissenschaften.' },
    'abi-studium': { steps: ['Start: Abitur', 'Universität / Hochschule', 'Ziel: Bachelor/Master'], info: 'Freie Wahl aller Studiengänge.' }
};

function bw7UpdateTargets() {
    const start = document.getElementById('bw7-start').value;
    const zielSelect = document.getElementById('bw7-ziel');
    zielSelect.innerHTML = '<option value="" disabled selected>Ziel wählen...</option>';

    if (bw7Targets[start]) {
        Object.entries(bw7Targets[start]).forEach(([key, label]) => {
            zielSelect.innerHTML += `<option value="${key}">${label}</option>`;
        });
        zielSelect.disabled = false;
    } else {
        zielSelect.disabled = true;
    }
    document.getElementById('bw7-visual').classList.add('hidden');
}

function bw7ShowPath() {
    const start = document.getElementById('bw7-start').value;
    const ziel = document.getElementById('bw7-ziel').value;
    const key = `${start}-${ziel}`;
    const data = bw7Paths[key] || { steps: ['Start', 'Individueller Weg', 'Ziel'], info: 'Bitte Beratungstermin vereinbaren.' };

    // Timeline bauen
    const timeline = document.getElementById('bw7-timeline');
    timeline.innerHTML = '';

    data.steps.forEach((step, index) => {
        const isLast = index === data.steps.length - 1;
        timeline.innerHTML += `
            <div class="timeline-step animate-in" style="animation-delay: ${index * 0.1}s">
                <div class="t-circle">${index + 1}</div>
                <div class="t-text">${step}</div>
            </div>
            ${!isLast ? '<div class="t-line"></div>' : ''}
        `;
    });

    document.getElementById('bw7-info').innerText = data.info;
    document.getElementById('bw7-visual').classList.remove('hidden');
}
