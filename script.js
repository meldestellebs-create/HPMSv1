
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
// PATH EXPLORER TOOL (Bildungswegetool)
// ==========================================
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


// ==========================================
// WIZARD TOOL (Bildungs- und Qualifizierungswege)
// ==========================================
let selectedBildungsstand = '';
let selectedZiel = '';

const zielOptionen = {
    kein: [
        { id: 'deutsch', label: 'Deutsch lernen', icon: '🗣️', desc: 'Ich möchte primär Deutsch lernen.' },
        { id: 'hauptschul', label: 'Hauptschulabschluss', icon: '📝', desc: 'Ich will den Abschluss nachholen.' },
        { id: 'ausbildung', label: 'Ausbildungsvorbereitung', icon: '🛠️', desc: 'Bereit für die Ausbildung werden.' }
    ],
    hauptschul: [
        { id: 'mittlerer', label: 'Mittlere Reife', icon: '📚', desc: 'Weiter zur Fachschulreife.' },
        { id: 'ausbildung', label: 'Ausbildung', icon: '🎓', desc: 'Direkt in den Beruf starten.' },
        { id: 'verbessern', label: 'Abschluss verbessern', icon: '📈', desc: 'Noten verbessern & Praxis.' }
    ],
    mittlerer: [
        { id: 'bk', label: 'Berufskolleg', icon: '💼', desc: 'Fachhochschulreife & Assistent.' },
        { id: 'gymnasium', label: 'Berufliches Gymnasium', icon: '🏛️', desc: 'Allgemeine Hochschulreife (Abitur).' },
        { id: 'ausbildung', label: 'Ausbildung', icon: '🎓', desc: 'Duale Ausbildung beginnen.' }
    ]
};

const bildungswegeData = {
    kein: {
        deutsch: [
            {
                title: "VABO",
                subtitle: "Vorqualifizierungsjahr Arbeit/Beruf",
                desc: "Intensiver Spracherwerb für Neuzugewanderte. Der Fokus liegt auf Deutschlernen und Berufsorientierung.",
                badges: ["Schulplatz", "Deutsch A1-B1"],
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
                desc: "Führt in zwei Jahren zur Mittleren Reife. Verschiedene Profile (Technik, Wirtschaft, Pflege).",
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
                desc: "Der Weg zum Abitur mit beruflichem Schwerpunkt (TG, WG, SG, etc.).",
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

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
