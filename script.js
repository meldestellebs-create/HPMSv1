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
// TOOL 1: BQW-2 (Wizard Logik)
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

// DATENBANK BQW
const bqwData = {
    kein: {
        deutsch: [
            {
                name: "VABO - Vorqualifizierungsjahr Arbeit/Beruf",
                desc: "Für junge Menschen ohne Deutschkenntnisse.",
                details: ["Dauer: 1 Jahr", "Ziel: Deutsch A1-B1", "Schulplatzgarantie"],
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
// TOOL 2: BW-Option-7 (Bildungswegetool)
// EXAKTE DATEN AUS DEM ORIGINAL-REPO
// =========================================================

// Pfaddatenbank (vereinfachte Version der wichtigsten Wege)
const bw7PathsData = {
    'ohneAbschluss-hauptschulabschluss': {
        title: 'VAB/AVdual → Hauptschulabschluss',
        steps: ['Ohne Abschluss', 'VAB/AVdual + Prüfung', 'Hauptschulabschluss'],
        duration: '1-2 Jahre',
        note: 'Im VAB/AVdual wird berufliche Orientierung geboten und der Hauptschulabschluss kann über eine Prüfung erworben werden.'
    },
    'ohneAbschluss-berufsabschluss': {
        title: 'Direkte duale Ausbildung',
        steps: ['Ohne Abschluss', 'Duale Ausbildung', 'Berufsabschluss'],
        duration: '2-3,5 Jahre',
        note: 'In manchen Berufen ist eine Ausbildung auch ohne Schulabschluss möglich.'
    },
    'ohneAbschluss-mittlereReife': {
        title: 'Über Hauptschulabschluss und 2BFS',
        steps: ['Ohne Abschluss', 'AVdual/VAB', 'Hauptschulabschluss', '2BFS', 'Mittlere Reife'],
        duration: '3-4 Jahre',
        note: 'Zunächst Hauptschulabschluss erwerben, dann über die 2BFS zur Fachschulreife.'
    },
    'ohneAbschluss-fachhochschulreife': {
        title: 'Mehrstufiger Weg',
        steps: ['Ohne Abschluss', 'Hauptschulabschluss', 'Mittlere Reife', 'Berufskolleg', 'Fachhochschulreife'],
        duration: '5-7 Jahre',
        note: 'Mit jedem Abschluss gibt es immer einen Anschluss.'
    },
    'ohneAbschluss-abitur': {
        title: 'Über alle Zwischenschritte',
        steps: ['Ohne Abschluss', 'Hauptschulabschluss', 'Mittlere Reife', 'Berufliches Gymnasium', 'Abitur'],
        duration: '7-9 Jahre',
        note: 'Mit jedem Abschluss gibt es immer einen Anschluss - auch bis zum Abitur.'
    },
    'sbbz-bve': {
        title: 'Berufsvorbereitende Einrichtung',
        steps: ['SBBZ', 'BVE'],
        duration: '2 Jahre',
        note: 'Die BVE bereitet auf eine Beschäftigung auf dem allgemeinen Arbeitsmarkt vor.'
    },
    'sbbz-vabKF': {
        title: 'VAB-KF (Kooperative Form)',
        steps: ['SBBZ', 'VAB-KF'],
        duration: '1 Jahr',
        note: 'Vorbereitung auf Ausbildung oder Beschäftigung.'
    },
    'sbbz-hauptschulabschluss': {
        title: 'Hauptschulabschluss über SBBZ',
        steps: ['SBBZ', 'VAB/AVdual + Prüfung', 'Hauptschulabschluss'],
        duration: '1-2 Jahre',
        note: 'Je nach Förderschwerpunkt verschiedene Wege möglich.'
    },
    'vabo-hauptschulabschluss': {
        title: 'VABO → VAB/AVdual',
        steps: ['VABO (Deutschförderung B1)', 'VAB/AVdual + Prüfung', 'Hauptschulabschluss'],
        duration: '2 Jahre',
        note: 'Nach erfolgreicher Deutschförderung im VABO kann über VAB/AVdual der Hauptschulabschluss erworben werden.'
    },
    'avdual-hauptschulabschluss': {
        title: 'AVdual mit Prüfung',
        steps: ['AVdual', 'Prüfung', 'Hauptschulabschluss'],
        duration: '1 Jahr',
        note: 'AVdual kombiniert schulisches Lernen mit Betriebspraktika.'
    },
    'hauptschulabschluss-mittlereReife': {
        title: '2-jährige Berufsfachschule',
        steps: ['Hauptschulabschluss', '2BFS', 'Mittlere Reife'],
        duration: '2 Jahre',
        note: 'Klassischer Weg über die 2BFS zur Fachschulreife.'
    },
    'hauptschulabschluss-berufsabschluss': {
        title: 'Duale Ausbildung',
        steps: ['Hauptschulabschluss', 'Duale Ausbildung', 'Berufsabschluss'],
        duration: '2-3,5 Jahre',
        note: 'Direkter Einstieg in den Beruf mit Hauptschulabschluss.'
    },
    'mittlereReife-fachhochschulreife': {
        title: 'Berufskolleg',
        steps: ['Mittlere Reife', 'Berufskolleg (1-2 Jahre)', 'Fachhochschulreife'],
        duration: '1-2 Jahre',
        note: 'Das Berufskolleg führt zur Fachhochschulreife und qualifiziert für ein FH-Studium.'
    },
    'mittlereReife-abitur': {
        title: 'Berufliches Gymnasium',
        steps: ['Mittlere Reife', 'Berufliches Gymnasium (3 Jahre)', 'Abitur'],
        duration: '3 Jahre',
        note: 'Voraussetzung: Notendurchschnitt 3,0 in den Hauptfächern.'
    },
    'mittlereReife-berufsabschluss': {
        title: 'Duale Ausbildung',
        steps: ['Mittlere Reife', 'Duale Ausbildung', 'Berufsabschluss'],
        duration: '2-3,5 Jahre',
        note: 'Gute Chancen auf anspruchsvolle Berufe mit mittlerer Reife.'
    },
    'fachhochschulreife-bachelor': {
        title: 'Studium an Fachhochschule',
        steps: ['Fachhochschulreife', 'Studium FH', 'Bachelor/Master'],
        duration: '3-5 Jahre',
        note: 'Die Fachhochschulreife berechtigt zum Studium an Fachhochschulen.'
    },
    'abitur-bachelor': {
        title: 'Studium an Universität/FH',
        steps: ['Abitur', 'Studium Uni/FH', 'Bachelor/Master/Promotion'],
        duration: '3-8 Jahre',
        note: 'Das Abitur berechtigt zum Studium an allen Hochschulen.'
    },
    'meister-bachelor': {
        title: 'Studium mit beruflicher Qualifikation',
        steps: ['Meister/Techniker', 'Studium', 'Bachelor/Master'],
        duration: '3-5 Jahre',
        note: 'Meister/Techniker sind dem Bachelor-Niveau gleichgestellt und berechtigen zum Studium.'
    }
};

function bw7UpdateTargets() {
    const startValue = document.getElementById('bw7-start').value;
    const zielSelect = document.getElementById('bw7-ziel');

    // Zurücksetzen
    zielSelect.innerHTML = '<option value="" disabled selected>Ziel wählen...</option>';
    document.getElementById('bw7-visual').classList.add('hidden');

    // Ziel-Optionen basierend auf Start
    const targetOptions = {
        'ohneAbschluss': [
            {value: 'hauptschulabschluss', text: 'Hauptschulabschluss'},
            {value: 'berufsabschluss', text: 'Berufsabschluss'},
            {value: 'mittlereReife', text: 'Mittlere Reife/Mittlerer Bildungsabschluss'},
            {value: 'fachhochschulreife', text: 'Fachhochschulreife'},
            {value: 'abitur', text: 'Abitur/Allgemeine Hochschulreife'}
        ],
        'sbbz': [
            {value: 'bve', text: 'Berufsvorbereitende Einrichtung (BVE)'},
            {value: 'vabKF', text: 'Förderschule VAB-KF/VAB Abschluss'},
            {value: 'hauptschulabschluss', text: 'Hauptschulabschluss'},
            {value: 'berufsabschluss', text: 'Berufsabschluss'},
            {value: 'mittlereReife', text: 'Mittlere Reife'}
        ],
        'vabo': [
            {value: 'hauptschulabschluss', text: 'Hauptschulabschluss'},
            {value: 'berufsabschluss', text: 'Berufsabschluss'},
            {value: 'mittlereReife', text: 'Mittlere Reife'}
        ],
        'avdual': [
            {value: 'hauptschulabschluss', text: 'Hauptschulabschluss'},
            {value: 'berufsabschluss', text: 'Berufsabschluss'}
        ],
        'hauptschulabschluss': [
            {value: 'berufsabschluss', text: 'Berufsabschluss'},
            {value: 'mittlereReife', text: 'Mittlere Reife/Mittlerer Bildungsabschluss'},
            {value: 'fachhochschulreife', text: 'Fachhochschulreife'},
            {value: 'abitur', text: 'Abitur'}
        ],
        'mittlereReife': [
            {value: 'berufsabschluss', text: 'Berufsabschluss'},
            {value: 'fachhochschulreife', text: 'Fachhochschulreife'},
            {value: 'abitur', text: 'Abitur/Allgemeine Hochschulreife'}
        ],
        'fachhochschulreife': [
            {value: 'bachelor', text: 'Bachelor/Master/Promotion'},
            {value: 'berufsabschluss', text: 'Berufsabschluss'}
        ],
        'abitur': [
            {value: 'bachelor', text: 'Bachelor/Master/Promotion'},
            {value: 'berufsabschluss', text: 'Berufsabschluss'}
        ],
        'meister': [
            {value: 'bachelor', text: 'Bachelor/Master/Promotion'}
        ]
    };

    if (targetOptions[startValue]) {
        targetOptions[startValue].forEach(opt => {
            zielSelect.innerHTML += `<option value="${opt.value}">${opt.text}</option>`;
        });
        zielSelect.disabled = false;
    } else {
        zielSelect.disabled = true;
    }
}

function bw7ShowPath() {
    const startValue = document.getElementById('bw7-start').value;
    const zielValue = document.getElementById('bw7-ziel').value;

    if (!startValue || !zielValue) return;

    const pathKey = `${startValue}-${zielValue}`;
    const pathData = bw7PathsData[pathKey];

    const timeline = document.getElementById('bw7-timeline');
    const infoBox = document.getElementById('bw7-info');

    if (pathData) {
        // Timeline erstellen
        timeline.innerHTML = '';
        pathData.steps.forEach((step, index) => {
            const isLast = index === pathData.steps.length - 1;
            timeline.innerHTML += `
                <div class="timeline-step animate-in" style="animation-delay: ${index * 0.1}s">
                    <div class="t-circle">${index + 1}</div>
                    <div class="t-text">${step}</div>
                </div>
                ${!isLast ? '<div class="t-line"></div>' : ''}
            `;
        });

        // Info Box
        infoBox.innerHTML = `
            <strong>${pathData.title}</strong><br>
            <small>⏱️ ${pathData.duration}</small><br>
            ${pathData.note}
        `;
    } else {
        // Fallback wenn kein exakter Pfad gefunden
        timeline.innerHTML = `
            <div class="timeline-step"><div class="t-circle">1</div><div class="t-text">Ausgangspunkt</div></div>
            <div class="t-line"></div>
            <div class="timeline-step"><div class="t-circle">2</div><div class="t-text">Individueller Bildungsweg</div></div>
            <div class="t-line"></div>
            <div class="timeline-step"><div class="t-circle">3</div><div class="t-text">Zielabschluss</div></div>
        `;
        infoBox.innerHTML = 'Für diese Kombination empfehlen wir eine individuelle Beratung. Bitte wenden Sie sich an die Meldestelle.';
    }

    document.getElementById('bw7-visual').classList.remove('hidden');
}
