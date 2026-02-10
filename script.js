
// ==========================================
// KONFIGURATION & DATEN
// ==========================================

// State Management
let currentStep = 1;
let selectedBildungsstand = '';
let selectedZiel = '';

// KORRIGIERTE DATENSTRUKTUR
// Keine "unzähligen Klammern" mehr, sondern saubere Objekte.

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

// Die "Datenbank" der Bildungswege
// Hier verknüpfen wir den Wizard mit den PDF-Downloads
const bildungswegeData = {
    kein: {
        deutsch: [
            {
                title: "VABO",
                subtitle: "Vorqualifizierungsjahr Arbeit/Beruf",
                desc: "Intensiver Spracherwerb für Neuzugewanderte. Der Fokus liegt auf Deutschlernen und Berufsorientierung.",
                badges: ["Schulplatz", "Deutsch A1-B1"],
                // WICHTIG: Hier verlinken wir direkt auf das PDF aus dem Repo
                link: "VABO%20Vermittlungsanfrage%20SJ%2026-27.pdf",
                linkText: "Anmeldeformular (PDF)"
            },
            {
                title: "Integrationskurs",
                subtitle: "Externes Angebot",
                desc: "Kurse vom BAMF oder VHS für den Spracherwerb.",
                badges: ["Extern", "Sprachzertifikat"],
                link: "https://www.bamf.de",
                linkText: "Infos beim BAMF"
            }
        ],
        hauptschul: [
            {
                title: "AVdual",
                subtitle: "Ausbildungsvorbereitung dual",
                desc: "Hole deinen Hauptschulabschluss nach und sammle praktische Erfahrung im Betrieb.",
                badges: ["Hauptschulabschluss", "Praktikum"],
                link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                linkText: "Anmeldeformular (PDF)"
            }
        ],
        ausbildung: [
            {
                title: "AVdual",
                subtitle: "Ausbildungsvorbereitung",
                desc: "Perfekt zur Vorbereitung auf eine Ausbildung. Du bist im Betrieb und in der Schule.",
                badges: ["Praxis", "Orientierung"],
                link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                linkText: "Anmeldeformular (PDF)"
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
            },
            {
                title: "1-jährige Berufsfachschule",
                subtitle: "Vollzeit",
                desc: "Das erste Lehrjahr findet komplett in der Schule statt (für bestimmte Berufe).",
                badges: ["Grundbildung", "Anrechnung"],
                link: "https://www.farbegestaltung.de/wp-content/uploads/Einjaehrige-Berufsfachschule-Angebote-Stuttgart-02_2025.pdf",
                linkText: "Mehr Infos (PDF)"
            }
        ],
        verbessern: [
            {
                title: "AVdual",
                subtitle: "Abschluss verbessern",
                desc: "Du hast schon einen Abschluss, willst aber bessere Noten für die Ausbildungssuche?",
                badges: ["Verbesserung", "Praxis"],
                link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf",
                linkText: "Anmeldeformular (PDF)"
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

// ==========================================
// LOGIK
// ==========================================

function selectBildungsstand(stand) {
    selectedBildungsstand = stand;

    // UI Update
    document.querySelectorAll('#step1 .option-card').forEach(c => c.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // Nächsten Schritt vorbereiten
    renderZielOptions(stand);

    // Smooth Transition
    setTimeout(() => {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        card.innerHTML = `
            <div class="card-icon">${opt.icon}</div>
            <h3>${opt.label}</h3>
            <p>${opt.desc}</p>
        `;
        container.appendChild(card);
    });
}

function showResults(zielId) {
    selectedZiel = zielId;

    // UI Update
    document.getElementById('step2').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Ergebnisse rendern
    const container = document.getElementById('resultsGrid');
    container.innerHTML = '';

    const data = bildungswegeData[selectedBildungsstand]?.[selectedZiel] || [];

    if (data.length === 0) {
        container.innerHTML = '<p class="text-center">Keine direkten Treffer. Bitte kontaktiere die Meldestelle.</p>';
        return;
    }

    data.forEach(item => {
        const badges = item.badges.map(b => `<span class="badge">${b}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'result-card animate-in';
        card.innerHTML = `
            <div class="result-header">
                <h3>${item.title}</h3>
                <span class="result-sub">${item.subtitle}</span>
            </div>
            <div class="result-badges">${badges}</div>
            <p class="result-desc">${item.desc}</p>
            <a href="${item.link}" target="_blank" class="btn btn-primary btn-full">
                ${item.linkText}
            </a>
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

    // Reset selections
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function stepBack() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll Funktionen
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners für Tabs (falls noch benötigt)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Initial
document.addEventListener('DOMContentLoaded', () => {
    // Default Tab
    const defaultTab = document.getElementById('defaultOpen');
    if(defaultTab) defaultTab.click();
});
