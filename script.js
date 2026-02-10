
// ==========================================
// NAVIGATION & SELECTION LOGIC
// ==========================================

function startTool(toolName) {
    document.getElementById('orientation-selection').classList.add('hidden');
    document.getElementById('tool-container').classList.remove('hidden');
    document.getElementById('tool-container').classList.add('animate-in');

    if (toolName === 'wizard') {
        document.getElementById('wizard-content').classList.remove('hidden');
        document.getElementById('path-content').classList.add('hidden');
    } else if (toolName === 'path') {
        document.getElementById('path-content').classList.remove('hidden');
        document.getElementById('wizard-content').classList.add('hidden');
    }
}

function backToSelection() {
    document.getElementById('tool-container').classList.add('hidden');
    document.getElementById('orientation-selection').classList.remove('hidden');
    document.getElementById('orientation-selection').classList.add('animate-in');

    // Reset states
    resetWizard(); 
    resetPathTool();
}

// ==========================================
// TOOL 1: WIZARD (VABO/AVdual + DB)
// ==========================================
let selectedBildungsstand = '';
let selectedZiel = '';

const zielOptionen = {
    kein: [
        { id: 'deutsch', label: 'Deutsch lernen', icon: '🗣️', desc: 'Deutsche Sprache erlernen' },
        { id: 'hauptschul', label: 'Hauptschulabschluss', icon: '📝', desc: 'Den Abschluss nachholen' },
        { id: 'ausbildung', label: 'Ausbildungsvorbereitung', icon: '🛠️', desc: 'Bereit für die Ausbildung werden' }
    ],
    hauptschul: [
        { id: 'mittlerer', label: 'Mittlere Reife', icon: '📚', desc: 'Weiter zur Fachschulreife' },
        { id: 'ausbildung', label: 'Ausbildung', icon: '🎓', desc: 'Direkt in den Beruf starten' },
        { id: 'verbessern', label: 'Abschluss verbessern', icon: '📈', desc: 'Noten verbessern & Praxis' }
    ],
    mittlerer: [
        { id: 'bk', label: 'Berufskolleg', icon: '💼', desc: 'Fachhochschulreife & Assistent' },
        { id: 'gymnasium', label: 'Berufliches Gymnasium', icon: '🏛️', desc: 'Abitur machen' },
        { id: 'ausbildung', label: 'Ausbildung', icon: '🎓', desc: 'Duale Ausbildung beginnen' }
    ]
};

const bildungswegeData = {
    kein: {
        deutsch: [
            {
                title: "VABO",
                subtitle: "Vorqualifizierungsjahr Arbeit/Beruf",
                desc: "Intensiver Spracherwerb für Neuzugewanderte ohne Deutschkenntnisse.",
                badges: ["Schulplatz", "Deutsch A1-B1"],
                // FIXED PDF LINK
                link: "Anfrage-VABO-SJ-26-27-Version-03-02-2026.pdf",
                linkText: "Vermittlungsanfrage VABO (PDF)"
            }
        ],
        hauptschul: [
            {
                title: "AVdual",
                subtitle: "Ausbildungsvorbereitung dual",
                desc: "Hole deinen Hauptschulabschluss nach und sammle praktische Erfahrung im Betrieb.",
                badges: ["Hauptschulabschluss", "Praktikum"],
                link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                linkText: "Vermittlungsanfrage AVdual (PDF)"
            }
        ],
        ausbildung: [
            {
                title: "AVdual",
                subtitle: "Ausbildungsvorbereitung",
                desc: "Perfekt zur Vorbereitung auf eine Ausbildung. Du bist im Betrieb und in der Schule.",
                badges: ["Praxis", "Orientierung"],
                link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                linkText: "Vermittlungsanfrage AVdual (PDF)"
            }
        ]
    },
    hauptschul: {
        mittlerer: [
            {
                title: "2-jährige Berufsfachschule",
                subtitle: "Fachschulreife",
                desc: "Führt in zwei Jahren zur Mittleren Reife. Verschiedene Profile.",
                badges: ["Mittlere Reife", "Vollzeit"],
                link: "https://www.farbegestaltung.de/wp-content/uploads/Einjaehrige-Berufsfachschule-Angebote-Stuttgart-02_2025.pdf",
                linkText: "Infoblatt (PDF)"
            }
        ],
        ausbildung: [
            {
                title: "Duale Ausbildung",
                subtitle: "Betrieb & Schule",
                desc: "Der Klassiker: Du lernst im Betrieb und gehst in die Berufsschule.",
                badges: ["Gehalt", "Berufsabschluss"],
                link: "https://www.hwk-stuttgart.de/lehrstellenboerse",
                linkText: "Lehrstellenbörse HWK"
            }
        ],
        verbessern: [
            {
                title: "AVdual",
                subtitle: "Abschluss verbessern",
                desc: "Du hast schon einen Abschluss, willst aber bessere Noten für die Ausbildungssuche?",
                badges: ["Verbesserung", "Praxis"],
                link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                linkText: "Vermittlungsanfrage AVdual (PDF)"
            }
        ]
    },
    mittlerer: {
        bk: [
            {
                title: "Berufskolleg",
                subtitle: "Fachhochschulreife",
                desc: "Kombiniere berufliche Bildung mit der Fachhochschulreife.",
                badges: ["FHR", "Berufsausbildung"],
                link: "https://bewo.kultus-bw.de/",
                linkText: "Bewerbung (BewO)"
            }
        ],
        gymnasium: [
            {
                title: "Berufliches Gymnasium",
                subtitle: "Allgemeine Hochschulreife",
                desc: "Der Weg zum Abitur mit beruflichem Schwerpunkt.",
                badges: ["Abitur", "3 Jahre"],
                link: "https://bewo.kultus-bw.de/",
                linkText: "Bewerbung (BewO)"
            }
        ],
        ausbildung: [
            {
                title: "Duale Ausbildung",
                subtitle: "Karriere im Beruf",
                desc: "Mit mittlerer Reife stehen dir viele anspruchsvolle Ausbildungsberufe offen.",
                badges: ["Karriere", "Vergütung"],
                link: "https://www.arbeitsagentur.de/bildung/ausbildung",
                linkText: "Berufsberatung"
            }
        ]
    }
};

function selectBildungsstand(stand) {
    selectedBildungsstand = stand;
    document.querySelectorAll('#step1 .option-card').forEach(c => c.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    renderZielOptions(stand);
    setTimeout(() => {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }, 300);
}

function renderZielOptions(stand) {
    const container = document.getElementById('zielOptionsGrid');
    container.innerHTML = '';
    const options = zielOptionen[stand] || [];
    options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'option-card animate-in';
        card.onclick = () => showResults(opt.id);
        card.innerHTML = `<div class="card-icon-wrapper">${opt.icon}</div><h3>${opt.label}</h3><p>${opt.desc}</p>`;
        container.appendChild(card);
    });
}

function showResults(zielId) {
    selectedZiel = zielId;
    document.getElementById('step2').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    const container = document.getElementById('resultsGrid');
    container.innerHTML = '';
    const data = bildungswegeData[selectedBildungsstand]?.[selectedZiel] || [];

    if (data.length === 0) {
        container.innerHTML = '<p class="text-center">Keine direkten Treffer.</p>';
        return;
    }

    data.forEach(item => {
        const badges = item.badges.map(b => `<span class="badge">${b}</span>`).join('');
        const card = document.createElement('div');
        card.className = 'result-card animate-in';
        card.innerHTML = `
            <div class="result-header"><h3>${item.title}</h3><span class="result-sub">${item.subtitle}</span></div>
            <div class="result-badges">${badges}</div>
            <p class="result-desc">${item.desc}</p>
            <a href="${item.link}" target="_blank" class="btn btn-primary btn-full">${item.linkText}</a>
        `;
        container.appendChild(card);
    });
}

function resetWizard() {
    selectedBildungsstand = '';
    selectedZiel = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

function stepBack() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}


// ==========================================
// TOOL 2: BILDUNGSWEGETOOL (DROPDOWN LOGIC)
// ==========================================

const pathMap = {
    kein: [
        { value: 'hsa', label: 'Hauptschulabschluss' },
        { value: 'ausbildung', label: 'Ausbildung (AVdual)' }
    ],
    hsa: [
        { value: 'mr', label: 'Mittlere Reife' },
        { value: 'ausbildung', label: 'Berufsausbildung' }
    ],
    mr: [
        { value: 'fhr', label: 'Fachhochschulreife' },
        { value: 'abi', label: 'Abitur' },
        { value: 'ausbildung', label: 'Berufsausbildung' }
    ],
    fhr: [
        { value: 'studium_fh', label: 'Studium (FH)' },
        { value: 'ausbildung', label: 'Berufsausbildung' }
    ],
    abi: [
        { value: 'studium', label: 'Studium (Uni/FH)' },
        { value: 'ausbildung', label: 'Berufsausbildung' }
    ]
};

const pathDetails = {
    'kein-hsa': { steps: ['VABO (bei Sprachbedarf)', 'AVdual'], desc: 'Der Weg führt über das AVdual oder VABO, um den Hauptschulabschluss nachzuholen.' },
    'kein-ausbildung': { steps: ['AVdual'], desc: 'Über das AVdual in die Ausbildungsvorbereitung.' },
    'hsa-mr': { steps: ['2-jährige Berufsfachschule (2BFS)', 'Berufsaufbauschule (nach Ausbildung)'], desc: 'Der klassische Weg zur Mittleren Reife führt über die zweijährige Berufsfachschule.' },
    'hsa-ausbildung': { steps: ['Duale Ausbildung', '1-jährige Berufsfachschule'], desc: 'Direkter Einstieg in eine duale Ausbildung oder über die 1BFS.' },
    'mr-abi': { steps: ['Berufliches Gymnasium (3 Jahre)'], desc: 'Mit einem Schnitt von 3,0 (D,M,E) kannst du auf das Berufliche Gymnasium.' },
    'mr-fhr': { steps: ['Berufskolleg (BK)'], desc: 'Das Berufskolleg führt zur Fachhochschulreife.' },
    'mr-ausbildung': { steps: ['Duale Ausbildung'], desc: 'Mit der Mittleren Reife stehen dir viele anspruchsvolle Berufe offen.' }
};

function updatePathOptions() {
    const startVal = document.getElementById('pathStart').value;
    const zielSelect = document.getElementById('pathZiel');

    zielSelect.innerHTML = '<option value="" disabled selected>Ziel wählen...</option>';
    zielSelect.disabled = true;

    if (startVal && pathMap[startVal]) {
        pathMap[startVal].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.text = opt.label;
            zielSelect.appendChild(option);
        });
        zielSelect.disabled = false;
    }
    document.getElementById('path-visual-container').classList.add('hidden');
}

function calculatePath() {
    const start = document.getElementById('pathStart').value;
    const ziel = document.getElementById('pathZiel').value;
    const key = `${start}-${ziel}`;
    const container = document.getElementById('path-visual-container');
    const timeline = document.getElementById('pathTimeline');
    const details = document.getElementById('pathDetailsContent');
    const detailsBox = document.getElementById('pathDetails');

    if (pathDetails[key]) {
        const info = pathDetails[key];

        // Render Timeline
        timeline.innerHTML = '';

        // Start Node
        timeline.innerHTML += `
            <div class="timeline-node start">
                <div class="t-icon">🏁</div>
                <span>Start</span>
            </div>
        `;

        // Steps
        info.steps.forEach(step => {
            timeline.innerHTML += `
                <div class="timeline-connector"></div>
                <div class="timeline-node step">
                    <div class="t-icon">⚡</div>
                    <span>${step}</span>
                </div>
            `;
        });

        // Ziel Node
        timeline.innerHTML += `
            <div class="timeline-connector"></div>
            <div class="timeline-node end">
                <div class="t-icon">🏆</div>
                <span>Ziel</span>
            </div>
        `;

        // Details
        details.innerHTML = `<p>${info.desc}</p>`;
        detailsBox.classList.remove('hidden');
        container.classList.remove('hidden');
        container.classList.add('animate-in');
    } else {
        // Fallback for generic paths
        timeline.innerHTML = '<p class="text-center">Weg wird berechnet...</p>';
        container.classList.remove('hidden');
    }
}

function resetPathTool() {
    document.getElementById('pathStart').value = "";
    document.getElementById('pathZiel').innerHTML = '<option value="" disabled selected>Zuerst Start wählen...</option>';
    document.getElementById('pathZiel').disabled = true;
    document.getElementById('path-visual-container').classList.add('hidden');
}

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
