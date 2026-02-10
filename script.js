
// ==========================================
// NAVIGATION & SELECTION LOGIC
// ==========================================

function startTool(toolName) {
    // Hide Selection
    document.getElementById('orientation-selection').classList.add('hidden');
    document.getElementById('tool-container').classList.remove('hidden');
    document.getElementById('tool-container').classList.add('animate-in');

    // Show correct Content
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

    // Reset specific tool states if needed
    resetWizard(); 
}

// ==========================================
// TOOL 1: BILDUNGS- UND QUALIFIZIERUNGSWEGE (FULL DATABASE)
// ==========================================
let selectedBildungsstand = '';
let selectedZiel = '';

// Ziel-Optionen (Expanded based on repo)
const zielOptionen = {
    kein: [
        { id: 'deutsch', label: 'Deutsch lernen', icon: '🗣️', desc: 'Deutsche Sprache erlernen und verbessern' },
        { id: 'hauptschul', label: 'Hauptschulabschluss machen', icon: '📝', desc: 'Einen gleichwertigen Bildungsstand erwerben' },
        { id: 'orientierung', label: 'Beruflich orientieren', icon: '🧭', desc: 'Mich beruflich orientieren und vorbereiten' },
        { id: 'ausbildung', label: 'Ausbildung beginnen', icon: '🎯', desc: 'Eine Ausbildung starten' }
    ],
    hauptschul: [
        { id: 'mittlerer', label: 'Mittleren Bildungsabschluss', icon: '📚', desc: 'Die Fachschulreife erwerben' },
        { id: 'orientierung', label: 'Beruflich orientieren', icon: '🧭', desc: 'Mich beruflich orientieren' },
        { id: 'ausbildung', label: 'Ausbildung beginnen', icon: '🎯', desc: 'Eine Ausbildung starten' }
    ],
    mittlerer: [
        { id: 'fhr', label: 'Fachhochschulreife', icon: '🎓', desc: 'Die Fachhochschulreife erwerben' },
        { id: 'abitur', label: 'Abitur (Allg. Hochschulreife)', icon: '🎖️', desc: 'Das Abitur machen' },
        { id: 'orientierung', label: 'Beruflich orientieren', icon: '🧭', desc: 'Mich beruflich orientieren' },
        { id: 'ausbildung', label: 'Ausbildung beginnen', icon: '🎯', desc: 'Eine Ausbildung starten' }
    ]
};

// FULL DATABASE (Merged from uploaded file:110 + VABO/AVdual specific links)
const bildungswegeData = {
    kein: {
        deutsch: [
            {
                name: "VABO - Vorqualifizierungsjahr Arbeit/Beruf",
                description: "Für junge Menschen ohne Deutschkenntnisse, die die deutsche Sprache erlernen möchten.",
                dauer: "Mindestens 1 Schuljahr",
                voraussetzungen: "Berufsschulpflichtig (u18), nicht deutsche Herkunftssprache, geringe oder keine Deutschkenntnisse",
                ergebnis: "Spracherwerb bis B1, Vorbereitung für Ausbildung oder weitere Schularten",
                finanzierung: "Schulbesuch kostenfrei",
                kontakt: { name: "Meldestelle der beruflichen Schulen Stuttgart", telefon: "0711 / 216-60277", email: "meldestelle-bs@stuttgart.de" },
                besonderheiten: "Intensive Sprachförderung bis B1-Niveau",
                // CUSTOM FIELD FOR DIRECT PDF DOWNLOAD
                pdfLink: "Anfrage-VABO-SJ-26-27-Version-03-02-2026.pdf",
                pdfLabel: "Vermittlungsanfrage VABO (PDF)"
            },
            {
                name: "Integrationskurs",
                description: "Bundesweites Angebot zum Erlernen der deutschen Sprache für Zugewanderte.",
                dauer: "6-10 Monate",
                voraussetzungen: "Migrationshintergrund, Aufenthaltstitel",
                ergebnis: "Deutschkenntnisse bis B1, Orientierungskurs",
                finanzierung: "Für Berechtigte kostenlos oder reduziert",
                kontakt: { name: "Volkshochschule Stuttgart", web: "www.vhs-stuttgart.de" },
                besonderheiten: "Abschluss mit DTZ-Prüfung"
            }
        ],
        hauptschul: [
            {
                name: "AVdual - Ausbildungsvorbereitung dual",
                description: "Für junge Menschen ohne Schulabschluss, die berufsschulpflichtig sind.",
                dauer: "1 Schuljahr",
                voraussetzungen: "Berufsschulpflichtig (u18), kein Ausbildungsplatz",
                ergebnis: "Hauptschulabschluss möglich, Übergang in Ausbildung",
                finanzierung: "Schulbesuch kostenfrei",
                kontakt: { name: "Meldestelle der beruflichen Schulen Stuttgart", telefon: "0711 / 216-60277", email: "meldestelle-bs@stuttgart.de" },
                besonderheiten: "Hoher Praktikumsanteil, sozialpädagogische Begleitung",
                pdfLink: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                pdfLabel: "Vermittlungsanfrage AVdual (PDF)"
            },
            {
                name: "Schulfremdenprüfung Hauptschulabschluss",
                description: "Erwerb eines Schulabschlusses außerhalb eines schulischen Bildungsgangs.",
                dauer: "Individuell",
                voraussetzungen: "Wohnort BW, Schulbesuch führt nicht zum Abschluss",
                ergebnis: "Hauptschulabschluss",
                finanzierung: "Vorbereitungskurse kostenpflichtig",
                kontakt: { name: "Staatliches Schulamt Stuttgart" },
                besonderheiten: "Vorbereitung über VHS möglich"
            }
        ],
        orientierung: [
             {
                name: "Freiwilligendienste (FSJ/FÖJ/BFD)",
                description: "Soziales oder ökologisches Jahr zur Orientierung.",
                dauer: "6-18 Monate",
                voraussetzungen: "Vollzeitschulpflicht erfüllt",
                ergebnis: "Zertifikat, praktische Erfahrung",
                finanzierung: "Taschengeld, Sozialversicherung",
                kontakt: { name: "Jugendagentur Stuttgart", web: "www.jugendagentur.net" },
                besonderheiten: "Start oft im September"
            }
        ],
        ausbildung: [
            {
                name: "AVdual (Ausbildungsvorbereitung)",
                description: "Vorbereitung auf eine Ausbildung durch Praktika und Schule.",
                dauer: "1 Schuljahr",
                voraussetzungen: "Berufsschulpflichtig (u18)",
                ergebnis: "Ausbildungsreife, Hauptschulabschluss",
                kontakt: { name: "Meldestelle Stuttgart", email: "meldestelle-bs@stuttgart.de" },
                pdfLink: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                pdfLabel: "Vermittlungsanfrage AVdual (PDF)"
            }
        ]
    },
    hauptschul: {
        mittlerer: [
            {
                name: "2-jährige Berufsfachschule (2BFS)",
                description: "Schulischer Weg zum mittleren Bildungsabschluss mit beruflicher Grundbildung.",
                dauer: "2 Schuljahre",
                voraussetzungen: "Hauptschulabschluss",
                ergebnis: "Fachschulreife (Mittlere Reife)",
                kontakt: { name: "Berufliche Schulen Stuttgart", web: "www.bewo.kultus-bw.de" },
                besonderheiten: "Anmeldung über BewO bis 1. März"
            },
            {
                name: "Berufsaufbauschule (BAS)",
                description: "Für Personen mit Hauptschulabschluss UND Berufsausbildung.",
                dauer: "1 Schuljahr",
                voraussetzungen: "HSA + Ausbildung",
                ergebnis: "Mittlere Reife",
                kontakt: { name: "Technische Oberschule Stuttgart" }
            }
        ],
        orientierung: [
            {
                name: "AVdual",
                description: "Auch mit Hauptschulabschluss möglich zur Orientierung und Notenverbesserung.",
                dauer: "1 Schuljahr",
                kontakt: { name: "Meldestelle Stuttgart" },
                pdfLink: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                pdfLabel: "Vermittlungsanfrage AVdual (PDF)"
            },
            {
                name: "Freiwilligendienste (FSJ/FÖJ)",
                description: "Praktisches Jahr zur Orientierung.",
                dauer: "12 Monate",
                kontakt: { name: "Jugendagentur Stuttgart", web: "www.jugendagentur.net" }
            }
        ],
        ausbildung: [
            {
                name: "Duale Ausbildung",
                description: "Betriebliche Ausbildung im Unternehmen und Berufsschule.",
                dauer: "2-3.5 Jahre",
                voraussetzungen: "Je nach Betrieb",
                ergebnis: "Berufsabschluss",
                kontakt: { name: "IHK / Handwerkskammer", web: "www.ihk.de" },
                besonderheiten: "Vergütung während der Ausbildung"
            },
            {
                name: "1-jährige Berufsfachschule (1BFS)",
                description: "Das erste Ausbildungsjahr findet vollzeitschulisch statt.",
                dauer: "1 Jahr",
                voraussetzungen: "Vorvertrag meist nötig",
                ergebnis: "Anrechnung auf Ausbildung",
                kontakt: { name: "Berufliche Schulen Stuttgart" }
            }
        ]
    },
    mittlerer: {
        fhr: [
            {
                name: "Berufskolleg (BK)",
                description: "Führt zur Fachhochschulreife und ggf. Berufsabschluss (Assistent).",
                dauer: "1-3 Jahre",
                voraussetzungen: "Mittlere Reife",
                ergebnis: "Fachhochschulreife",
                kontakt: { name: "BewO Online", web: "www.bewo.kultus-bw.de" },
                besonderheiten: "Anmeldung bis 1. März"
            }
        ],
        abitur: [
            {
                name: "Berufliches Gymnasium (BG)",
                description: "Der Weg zum Abitur mit beruflichem Profil (Technik, Wirtschaft, Soziales, etc.).",
                dauer: "3 Jahre",
                voraussetzungen: "Mittlere Reife mit Schnitt mind. 3,0 (D, M, E)",
                ergebnis: "Allgemeine Hochschulreife",
                kontakt: { name: "BewO Online", web: "www.bewo.kultus-bw.de" },
                besonderheiten: "Anmeldung bis 1. März"
            }
        ],
        ausbildung: [
            {
                name: "Duale Ausbildung",
                description: "Anspruchsvolle Ausbildungsberufe stehen offen.",
                dauer: "2-3 Jahre",
                kontakt: { name: "IHK / HWK" }
            }
        ],
        orientierung: [
            {
                name: "Freiwilligendienste",
                description: "FSJ / FÖJ / BFD",
                dauer: "6-18 Monate",
                kontakt: { name: "Jugendagentur Stuttgart" }
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

    if(options.length === 0) {
        container.innerHTML = '<p>Keine Optionen verfügbar.</p>';
        return;
    }

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
        // Create Details List
        let detailsHtml = '';
        if(item.dauer) detailsHtml += `<li><strong>Dauer:</strong> ${item.dauer}</li>`;
        if(item.voraussetzungen) detailsHtml += `<li><strong>Voraussetzung:</strong> ${item.voraussetzungen}</li>`;

        // Buttons: External Link vs PDF Download
        let buttonHtml = '';
        if (item.pdfLink) {
            buttonHtml = `<a href="${item.pdfLink}" target="_blank" class="btn btn-primary btn-full"><i class="fas fa-download"></i> ${item.pdfLabel}</a>`;
        } else if (item.kontakt && item.web) {
            buttonHtml = `<a href="https://${item.web.replace('https://','')}" target="_blank" class="btn btn-glass btn-full"><i class="fas fa-external-link-alt"></i> Website öffnen</a>`;
        }

        const card = document.createElement('div');
        card.className = 'result-card animate-in';
        card.innerHTML = `
            <div class="result-header"><h3>${item.name}</h3></div>
            <p class="result-desc">${item.description}</p>
            <ul class="result-details">${detailsHtml}</ul>
            <div class="result-footer">
                ${buttonHtml}
            </div>
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
// TOOL 2: BILDUNGSWEGETOOL (Visual Path Explorer)
// ==========================================
// Simple visualizer logic
const pathData = {
    hsa: [
        { title: "2-jährige Berufsfachschule (2BFS)", desc: "Führt zur Mittleren Reife", icon: "📚" },
        { title: "Berufsausbildung (Dual)", desc: "Lehre im Betrieb + Berufsschule", icon: "🛠️" },
        { title: "AVdual", desc: "Berufsvorbereitung & Abschlussverbesserung", icon: "🧭" }
    ],
    mr: [
        { title: "Berufliches Gymnasium", desc: "Weg zum Abitur (3 Jahre)", icon: "🏛️" },
        { title: "Berufskolleg (BK)", desc: "Fachhochschulreife + Beruf", icon: "💼" },
        { title: "Duale Ausbildung", desc: "Anspruchsvolle Berufe", icon: "🎓" }
    ],
    avdual: [
        { title: "Ausbildung", desc: "Start in den Beruf", icon: "🚀" },
        { title: "2-jährige Berufsfachschule", desc: "Bei gutem Hauptschulabschluss", icon: "📚" }
    ]
};

function showPath(start) {
    const container = document.getElementById('path-visual');
    const stepsContainer = container.querySelector('.path-steps');

    document.querySelectorAll('.path-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    stepsContainer.innerHTML = '';
    const paths = pathData[start];

    paths.forEach(step => {
        const node = document.createElement('div');
        node.className = 'path-node animate-in';
        node.innerHTML = `
            <div class="node-icon">${step.icon}</div>
            <strong>${step.title}</strong>
            <small style="display:block; color:var(--text-muted); margin-top:5px;">${step.desc}</small>
        `;
        stepsContainer.appendChild(node);
    });

    container.classList.remove('hidden');
}

// Scroll Helper
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
