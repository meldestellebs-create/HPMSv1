
// ==========================================
// GLOBALE STEUERUNG (Tabs)
// ==========================================
function switchTool(toolId) {
    document.querySelectorAll('.tool-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + toolId).classList.add('active');

    document.querySelectorAll('.tool-section').forEach(s => s.classList.add('hidden'));
    const activeSection = document.getElementById('tool-' + toolId);
    activeSection.classList.remove('hidden');
    activeSection.classList.add('animate-in');
}

// =========================================================
// TOOL 1: BQW-2 (Wizard Logik)
// =========================================================
let bqwStand = '';

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

const bqwData = {
    kein: {
        deutsch: [
            { name: "VABO", desc: "Vorqualifizierungsjahr Arbeit/Beruf", details: ["Dauer: 1 Jahr", "Ziel: Deutsch A1-B1"], link: "Anfrage%20VABO%20SJ%2026-27%20Version%2003-02-2026.pdf", btn: "Vermittlungsanfrage VABO" },
            { name: "Integrationskurs", desc: "Bundesweites Angebot", details: ["Dauer: 6-10 Monate"], link: "https://www.vhs-stuttgart.de", btn: "Zur VHS" }
        ],
        hauptschul: [
            { name: "AVdual", desc: "Ausbildungsvorbereitung dual", details: ["Dauer: 1 Jahr"], link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf", btn: "Vermittlungsanfrage AVdual" },
            { name: "Schulfremdenprüfung", desc: "Abschluss ohne Schulbesuch", details: ["Vorbereitung nötig"], link: "#", btn: "Infos Schulamt" }
        ],
        orientierung: [ 
            { name: "FSJ / FÖJ", desc: "Freiwilligendienste", details: ["12 Monate"], link: "https://www.jugendagentur.net", btn: "Jugendagentur" }
        ],
        ausbildung: [ { name: "AVdual", desc: "Vorbereitung Ausbildung", details: ["Praktikum + Schule"], link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf", btn: "Anfrage AVdual" } ]
    },
    hauptschul: {
        mittlerer: [
            { name: "2-jährige Berufsfachschule", desc: "Weg zur Mittleren Reife", details: ["2 Jahre"], link: "https://www.farbegestaltung.de/wp-content/uploads/Einjaehrige-Berufsfachschule-Angebote-Stuttgart-02_2025.pdf", btn: "Infoblatt" }
        ],
        ausbildung: [ { name: "Duale Ausbildung", desc: "Lehre im Betrieb", details: ["3 Jahre"], link: "https://www.hwk-stuttgart.de", btn: "HWK Lehrstellen" } ],
        orientierung: [ { name: "AVdual", desc: "Notenverbesserung", details: ["Praxis"], link: "AVdual%202026%20-%20Vermittlungsanfrage.pdf", btn: "Anfrage AVdual" } ]
    },
    mittlerer: {
        fhr: [ { name: "Berufskolleg", desc: "Zur FH-Reife", details: ["1-2 Jahre"], link: "https://bewo.kultus-bw.de", btn: "BewO" } ],
        abitur: [ { name: "Berufliches Gymnasium", desc: "Zum Abitur", details: ["3 Jahre"], link: "https://bewo.kultus-bw.de", btn: "BewO" } ],
        ausbildung: [ { name: "Duale Ausbildung", desc: "Anspruchsvolle Berufe", details: ["Karriere"], link: "https://www.ihk.de", btn: "IHK" } ],
        orientierung: [ { name: "FSJ", desc: "Freiwilliges Jahr", details: ["Soziales Engagement"], link: "https://www.jugendagentur.net", btn: "Infos" } ]
    }
};

function bqwSelectStand(stand) {
    bqwStand = stand;
    document.getElementById('bqw-step1').classList.add('hidden');
    document.getElementById('bqw-step2').classList.remove('hidden');
    const grid = document.getElementById('bqw-ziel-grid');
    grid.innerHTML = '';
    (bqwZielOptionen[stand] || []).forEach(opt => {
        grid.innerHTML += `<div class="option-card animate-in" onclick="bqwShowResults('${opt.id}')"><div class="card-icon-wrapper">${opt.icon}</div><h3>${opt.label}</h3><p>${opt.desc}</p></div>`;
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
        grid.innerHTML += `<div class="result-card animate-in"><div class="result-header"><h3>${res.name}</h3></div><p class="result-desc">${res.desc}</p><ul class="result-details">${detailsHtml}</ul><div class="result-footer"><a href="${res.link}" target="_blank" class="btn btn-primary btn-full">${res.btn}</a></div></div>`;
    });
}

function bqwReset() {
    bqwStand = '';
    document.getElementById('bqw-results').classList.add('hidden');
    document.getElementById('bqw-step2').classList.add('hidden');
    document.getElementById('bqw-step1').classList.remove('hidden');
}

// =========================================================
// TOOL 2: BW-Option-7 (Bildungswegetool) - EXTRACTED LOGIC
// =========================================================

// --- BEGINN EXTRAHIERTER CODE ---
const paths = {
  // ============ OHNE ABSCHLUSS ============
  ohneAbschluss: {
    hauptschulabschluss: [
      {
        title: "VAB (Vorqualifizierungsjahr Arbeit/Beruf)",
        steps: ["Ohne Abschluss", "VAB + Prüfung", "Hauptschulabschluss"],
        duration: "1 Jahr",
        note: "Im VAB wird berufliche Orientierung geboten und der Hauptschulabschluss kann über eine Prüfung erworben werden.",
        recommended: true
      },
      {
        title: "AV (Ausbildungsvorbereitung)",
        steps: ["Ohne Abschluss", "AV + Prüfung", "Hauptschulabschluss"],
        duration: "1 Jahr",
        note: "Die AV bereitet auf eine Berufsausbildung vor und ermöglicht den Erwerb eines dem Hauptschulabschluss gleichwertigen Bildungsstands.",
        recommended: true
      },
      {
        title: "AVdual (Ausbildungsvorbereitung dual)",
        steps: ["Ohne Abschluss", "AVdual + Prüfung", "Hauptschulabschluss"],
        duration: "1-2 Jahre",
        note: "AVdual kombiniert schulisches Lernen mit Betriebspraktika. Der Hauptschulabschluss wird über eine Prüfung erworben.",
        recommended: true
      },
      {
        title: "1-jährige Berufsfachschule (1BFS)",
        steps: ["Ohne Abschluss", "1-jährige Berufsfachschule", "Hauptschulabschluss"],
        duration: "1 Jahr",
        note: "Mit erfolgreichem Abschluss der 1BFS wird ein dem Hauptschulabschluss gleichwertiger Bildungsstand erlangt.",
        recommended: true
      },
      {
        title: "Ausbildung Alltagsbetreuer/in",
        steps: ["Ohne Abschluss", "Berufsfachschule Alltagsbetreuung", "Berufsabschluss + Hauptschulabschluss"],
        duration: "Individuell",
        note: "Die Ausbildung kann ohne Hauptschulabschluss begonnen werden. Der erfolgreiche Abschluss schließt einen dem Hauptschulabschluss gleichwertigen Bildungsstand ein."
      },
      {
        title: "Über duale Ausbildung",
        steps: ["Ohne Abschluss", "Duale Ausbildung", "Berufsabschluss + Hauptschulabschluss"],
        duration: "2-3,5 Jahre",
        note: "Mit dem erfolgreichen Abschluss einer dualen Ausbildung wird ein dem Hauptschulabschluss gleichwertiger Bildungsstand erworben."
      }
    ],
    mittlereReife: [
      {
        title: "Über Hauptschulabschluss und 2BFS",
        steps: ["Ohne Abschluss", "AVdual/VAB/AV", "Hauptschulabschluss", "2-jährige Berufsfachschule", "Mittlere Reife"],
        duration: "3-4 Jahre",
        note: "Zunächst Hauptschulabschluss erwerben, dann über die 2BFS zur Fachschulreife (Mittlere Reife).",
        recommended: true
      },
      {
        title: "Über Hauptschulabschluss und Modell 9+3",
        steps: ["Ohne Abschluss", "AVdual/VAB", "Hauptschulabschluss", "Duale Ausbildung (3 Jahre, Ø 2,5)", "Mittlere Reife"],
        duration: "4-5 Jahre",
        note: "Mit guten Leistungen in der Ausbildung kann ein dem Realschulabschluss gleichwertiger Bildungsstand zuerkannt werden."
      }
    ],
    fachhochschulreife: [
      {
        title: "Über Hauptschul- und Mittlere Reife",
        steps: ["Ohne Abschluss", "Hauptschulabschluss", "Mittlere Reife", "Berufskolleg", "Fachhochschulreife"],
        duration: "5-7 Jahre",
        note: "Mehrstufiger Weg mit Zwischenschritten."
      }
    ],
    abitur: [
      {
        title: "Über alle Zwischenschritte",
        steps: ["Ohne Abschluss", "Hauptschulabschluss", "Mittlere Reife", "Berufliches Gymnasium", "Abitur"],
        duration: "7-9 Jahre",
        note: "Mit jedem Abschluss gibt es immer einen Anschluss - auch bis zum Abitur."
      }
    ],
    berufsabschluss: [
      {
        title: "Direkte duale Ausbildung (ohne Abschluss möglich)",
        steps: ["Ohne Abschluss", "Duale Ausbildung", "Berufsabschluss"],
        duration: "2-3,5 Jahre",
        note: "In manchen Berufen ist eine Ausbildung auch ohne Schulabschluss möglich.",
        recommended: true
      },
      {
        title: "Über Hauptschulabschluss",
        steps: ["Ohne Abschluss", "AVdual/VAB", "Hauptschulabschluss", "Duale Ausbildung", "Berufsabschluss"],
        duration: "3,5-5,5 Jahre",
        note: "Mit Hauptschulabschluss verbessern sich die Chancen auf einen Ausbildungsplatz deutlich."
      }
    ],
    meister: [
      {
        title: "Über Berufsabschluss zur Aufstiegsfortbildung",
        steps: ["Ohne Abschluss", "Hauptschulabschluss", "Ausbildung", "Berufspraxis", "Meister/Techniker/Fachwirt"],
        duration: "8-12 Jahre",
        note: "Mit Abschluss, immer Anschluss - bis zur höchsten beruflichen Qualifikation."
      }
    ],
    studium: [
      {
        title: "Über Abitur zum Studium",
        steps: ["Ohne Abschluss", "Hauptschulabschluss", "Mittlere Reife", "Abitur", "Studium"],
        duration: "10+ Jahre",
        note: "Auch ohne Schulabschluss ist der Weg bis zum Studium möglich."
      },
      {
        title: "Über berufliche Qualifikation",
        steps: ["Ohne Abschluss", "Hauptschulabschluss", "Ausbildung", "Berufspraxis (3 Jahre)", "Studium ohne Abitur"],
        duration: "9+ Jahre",
        note: "Mit abgeschlossener Berufsausbildung und Berufserfahrung ist ein Studium auch ohne Abitur möglich."
      }
    ]
  },

  // ============ SBBZ ============
  sbbz: {
    bve: [
      {
        title: "Berufsvorbereitende Einrichtung (BVE)",
        steps: ["SBBZ", "BVE"],
        duration: "2 Jahre",
        note: "SBBZ-spezifisches Angebot: Die BVE bereitet auf eine Beschäftigung auf dem allgemeinen Arbeitsmarkt vor.",
        recommended: true
      }
    ],
    vabKF: [
      {
        title: "VAB-KF (Kooperative Form)",
        steps: ["SBBZ", "VAB-KF"],
        duration: "1 Jahr",
        note: "SBBZ-spezifisches Angebot: Vorbereitung auf Ausbildung oder Beschäftigung.",
        recommended: true
      }
    ],
    sonderberufsschule: [
      {
        title: "Sonderberufsschule",
        steps: ["SBBZ", "Sonderberufsschule", "Berufsabschluss"],
        duration: "Individuell",
        note: "SBBZ-spezifisches Angebot: Ausbildung speziell für Menschen mit Behinderung.",
        recommended: true
      }
    ],
    hauptschulabschluss: [
      {
        title: "Direkter Weg über SBBZ",
        steps: ["SBBZ", "Hauptschulabschluss"],
        duration: "Individuell",
        note: "An manchen SBBZ kann der Hauptschulabschluss direkt erworben werden (abhängig vom Förderschwerpunkt).",
        recommended: true
      },
      {
        title: "VAB mit Prüfung",
        steps: ["SBBZ", "VAB + Prüfung", "Hauptschulabschluss"],
        duration: "1 Jahr",
        note: "Im VAB wird berufliche Orientierung geboten und der Hauptschulabschluss kann über eine Prüfung erworben werden."
      },
      {
        title: "AV mit Prüfung",
        steps: ["SBBZ", "AV + Prüfung", "Hauptschulabschluss"],
        duration: "1 Jahr",
        note: "Die AV bereitet auf eine Berufsausbildung vor und ermöglicht den Erwerb des Hauptschulabschlusses."
      },
      {
        title: "AVdual mit Prüfung",
        steps: ["SBBZ", "AVdual + Prüfung", "Hauptschulabschluss"],
        duration: "1-2 Jahre",
        note: "AVdual kombiniert schulisches Lernen mit Betriebspraktika und ermöglicht den Erwerb des Hauptschulabschlusses."
      },
      {
        title: "1-jährige Berufsfachschule",
        steps: ["SBBZ", "1-jährige Berufsfachschule", "Hauptschulabschluss"],
        duration: "1 Jahr",
        note: "Mit erfolgreichem Abschluss der 1BFS wird ein dem Hauptschulabschluss gleichwertiger Bildungsstand erlangt."
      },
      {
        title: "Über duale Ausbildung",
        steps: ["SBBZ", "Duale Ausbildung mit Unterstützung", "Berufsabschluss + Hauptschulabschluss"],
        duration: "2-3,5 Jahre",
        note: "Mit Unterstützung durch Berufsberatung und ggf. Reha-Maßnahmen."
      }
    ],
    mittlereReife: [
      {
        title: "Über Hauptschulabschluss und 2BFS",
        steps: ["SBBZ", "Hauptschulabschluss", "2-jährige Berufsfachschule", "Mittlere Reife"],
        duration: "2+ Jahre",
        note: "Bei entsprechendem Förderschwerpunkt: Zunächst Hauptschulabschluss, dann 2BFS.",
        recommended: true
      },
      {
        title: "Über Ausbildung und Modell 9+3",
        steps: ["SBBZ", "Hauptschulabschluss", "Duale Ausbildung (3 Jahre, Ø 2,5)", "Mittlere Reife"],
        duration: "4+ Jahre",
        note: "Mit guten Leistungen in der Ausbildung kann ein dem Realschulabschluss gleichwertiger Bildungsstand zuerkannt werden."
      }
    ],
    fachhochschulreife: [
      {
        title: "Über Hauptschul- und Mittlere Reife",
        steps: ["SBBZ", "Hauptschulabschluss", "Mittlere Reife", "Berufskolleg", "Fachhochschulreife"],
        duration: "5-7 Jahre",
        note: "Mit entsprechendem Förderschwerpunkt und Unterstützung realistisch erreichbar."
      }
    ],
    abitur: [
      {
        title: "Über alle Bildungsstufen",
        steps: ["SBBZ", "Hauptschulabschluss", "Mittlere Reife", "Berufliches Gymnasium", "Abitur"],
        duration: "6-9 Jahre",
        note: "Mit entsprechendem Förderschwerpunkt (z.B. Hören, Sehen, körperlich-motorische Entwicklung) und Unterstützung möglich."
      }
    ],
    berufsabschluss: [
      {
        title: "Duale Ausbildung mit Unterstützung",
        steps: ["SBBZ", "Hauptschulabschluss", "Duale Ausbildung + Unterstützung", "Berufsabschluss"],
        duration: "3-4 Jahre",
        note: "Mit Unterstützung durch Berufsberatung und ggf. Reha-Maßnahmen, Hilfsmitteln am Arbeitsplatz.",
        recommended: true
      },
      {
        title: "Fachpraktiker-Ausbildung (theoriereduziert)",
        steps: ["SBBZ", "Fachpraktiker-Ausbildung", "Berufsabschluss"],
        duration: "2-3 Jahre",
        note: "SBBZ-spezifisches Angebot: Theoriereduzierte Ausbildung für Menschen mit Lernbehinderung.",
        recommended: true
      },
      {
        title: "Ausbildung im Berufsbildungswerk",
        steps: ["SBBZ", "Berufsbildungswerk", "Berufsabschluss"],
        duration: "2-3,5 Jahre",
        note: "SBBZ-spezifisches Angebot: Spezialisierte Ausbildung mit umfassender Unterstützung.",
        recommended: true
      }
    ],
    meister: [
      {
        title: "Über Ausbildung zur Aufstiegsfortbildung",
        steps: ["SBBZ", "Hauptschulabschluss", "Ausbildung", "Berufspraxis", "Meister/Techniker"],
        duration: "8-12 Jahre",
        note: "Mit entsprechender Unterstützung und abhängig vom Förderschwerpunkt möglich."
      }
    ],
    studium: [
      {
        title: "Über Abitur",
        steps: ["SBBZ", "Hauptschulabschluss", "Mittlere Reife", "Abitur", "Studium mit Unterstützung"],
        duration: "10+ Jahre",
        note: "Abhängig vom Förderschwerpunkt. Hochschulen bieten Unterstützungsangebote für Studierende mit Behinderung."
      }
    ]
  },

  // ============ VABO ============
  vabo: {
    hauptschulabschluss: [
      {
        title: "VABO mit Deutschförderung → VAB",
        steps: ["VABO (Deutschförderung B1)", "VAB + Prüfung", "Hauptschulabschluss"],
        duration: "2 Jahre",
        note: "Nach erfolgreicher Deutschförderung im VABO kann über VAB der Hauptschulabschluss erworben werden.",
        recommended: true
      },
      {
        title: "VABO → AV",
        steps: ["VABO (Deutschförderung B1)", "AV + Prüfung", "Hauptschulabschluss"],
        duration: "2 Jahre",
        note: "Nach dem VABO ermöglicht die AV den Erwerb des Hauptschulabschlusses.",
        recommended: true
      },
      {
        title: "VABO → AVdual",
        steps: ["VABO (Deutschförderung B1)", "AVdual + Prüfung", "Hauptschulabschluss"],
        duration: "2-3 Jahre",
        note: "Nach dem VABO kann über AVdual mit Betriebspraktika der Hauptschulabschluss erworben werden.",
        recommended: true
      },
      {
        title: "VABO → 1BFS",
        steps: ["VABO (Deutschförderung B1)", "1-jährige Berufsfachschule", "Hauptschulabschluss"],
        duration: "2 Jahre",
        note: "Mit ausreichenden Deutschkenntnissen direkter Einstieg in die 1BFS möglich.",
        recommended: true
      },
      {
        title: "VABO → Ausbildung Alltagsbetreuer/in",
        steps: ["VABO (Deutschförderung B1)", "Berufsfachschule Alltagsbetreuung", "Berufsabschluss + Hauptschulabschluss"],
        duration: "2+ Jahre",
        note: "Die Ausbildung kann nach VABO begonnen werden und schließt einen dem Hauptschulabschluss gleichwertigen Bildungsstand ein."
      },
      {
        title: "VABO → Duale Ausbildung",
        steps: ["VABO (Deutschförderung B1)", "Duale Ausbildung", "Berufsabschluss + Hauptschulabschluss"],
        duration: "3,5-5 Jahre",
        note: "Mit erfolgreichem Abschluss einer dualen Ausbildung wird ein dem Hauptschulabschluss gleichwertiger Bildungsstand erworben."
      }
    ],
    mittlereReife: [
      {
        title: "VABO → Hauptschulabschluss → 2BFS",
        steps: ["VABO (Deutschförderung B1)", "AVdual/VAB", "Hauptschulabschluss", "2-jährige Berufsfachschule", "Mittlere Reife"],
        duration: "4-5 Jahre",
        note: "Zunächst Deutsch lernen und Hauptschulabschluss erwerben, dann über die 2BFS zur Mittleren Reife.",
        recommended: true
      },
      {
        title: "VABO → Hauptschulabschluss → Modell 9+3",
        steps: ["VABO (Deutschförderung B1)", "Hauptschulabschluss", "Duale Ausbildung (3 Jahre, Ø 2,5)", "Mittlere Reife"],
        duration: "5-6 Jahre",
        note: "Mit guten Leistungen in der Ausbildung kann ein dem Realschulabschluss gleichwertiger Bildungsstand zuerkannt werden."
      }
    ],
    fachhochschulreife: [
      {
        title: "VABO → Mittlere Reife → Berufskolleg",
        steps: ["VABO (Deutschförderung B1)", "Hauptschulabschluss", "Mittlere Reife", "Berufskolleg", "Fachhochschulreife"],
        duration: "6-8 Jahre",
        note: "Mehrstufiger Weg mit Zwischenschritten."
      }
    ],
    abitur: [
      {
        title: "VABO → Mittlere Reife → Berufliches Gymnasium",
        steps: ["VABO (Deutschförderung B1)", "Hauptschulabschluss", "Mittlere Reife", "Berufliches Gymnasium", "Abitur"],
        duration: "7-9 Jahre",
        note: "Mit jedem Abschluss gibt es immer einen Anschluss."
      }
    ],
    berufsabschluss: [
      {
        title: "VABO → direkt zur Ausbildung",
        steps: ["VABO (Deutschförderung B1)", "Duale Ausbildung", "Berufsabschluss"],
        duration: "3,5-5 Jahre",
        note: "In manchen Berufen ist eine Ausbildung nach VABO direkt möglich. Ggf. mit ausbildungsbegleitenden Hilfen (abH).",
        recommended: true
      },
      {
        title: "VABO → Hauptschulabschluss → Ausbildung",
        steps: ["VABO (Deutschförderung B1)", "AVdual/VAB", "Hauptschulabschluss", "Duale Ausbildung", "Berufsabschluss"],
        duration: "4,5-6,5 Jahre",
        note: "Mit Hauptschulabschluss verbessern sich die Chancen auf einen Ausbildungsplatz."
      }
    ],
    meister: [
      {
        title: "VABO → Ausbildung → Aufstiegsfortbildung",
        steps: ["VABO (Deutschförderung B1)", "Hauptschulabschluss", "Ausbildung", "Berufspraxis", "Meister/Techniker"],
        duration: "9-13 Jahre",
        note: "Mit Abschluss, immer Anschluss - auch für zugewanderte Jugendliche."
      }
    ],
    studium: [
      {
        title: "VABO → Abitur → Studium",
        steps: ["VABO (Deutschförderung B1)", "Hauptschulabschluss", "Mittlere Reife", "Abitur", "Studium"],
        duration: "11+ Jahre",
        note: "Der Weg zum Studium ist auch nach VABO möglich."
      }
    ]
  },

  // ============ AVDUAL (als eigener Startpunkt) ============
  avdual: {
    hauptschulabschluss: [
      {
        title: "Hauptschulabschluss über AVdual",
        steps: ["AVdual + Prüfung", "Hauptschulabschluss"],
        duration: "1-2 Jahre",
        note: "Im AVdual kann der Hauptschulabschluss erworben oder verbessert werden.",
        recommended: true
      }
    ],
    berufsabschluss: [
      {
        title: "Direkt in die Ausbildung",
        steps: ["AVdual", "Duale Ausbildung", "Berufsabschluss"],
        duration: "2-3,5 Jahre",
        note: "Nach erfolgreichem AVdual-Abschluss kann eine Berufsausbildung begonnen werden.",
        recommended: true
      }
    ]
  },

  // ============ HAUPTSCHULABSCHLUSS ============
  hauptschulabschluss: {
    mittlereReife: [
      {
        title: "2-jährige Berufsfachschule (2BFS)",
        steps: ["Hauptschulabschluss", "2-jährige Berufsfachschule", "Mittlere Reife"],
        duration: "2 Jahre",
        note: "Die 2BFS führt zur Fachschulreife (Mittlere Reife) und vermittelt berufliche Grundbildung.",
        recommended: true
      },
      {
        title: "10. Klasse Werkrealschule",
        steps: ["Hauptschulabschluss", "10. Klasse Werkrealschule", "Werkrealschulabschluss"],
        duration: "1 Jahr",
        note: "Nach Klasse 9 kann die 10. Klasse der Werkrealschule besucht werden."
      },
      {
        title: "10. Klasse Realschule",
        steps: ["Hauptschulabschluss", "10. Klasse Realschule", "Realschulabschluss"],
        duration: "1 Jahr",
        note: "Bei entsprechenden Noten kann die 10. Klasse der Realschule besucht werden."
      },
      {
        title: "10. Klasse Gemeinschaftsschule",
        steps: ["Hauptschulabschluss", "10. Klasse Gemeinschaftsschule", "Realschulabschluss"],
        duration: "1 Jahr",
        note: "Die Gemeinschaftsschule bietet die Möglichkeit, den Realschulabschluss zu erreichen."
      },
      {
        title: "Mit dualer Ausbildung (Modell 9+3)",
        steps: ["Hauptschulabschluss", "Duale Ausbildung (3 Jahre, Ø 2,5)", "Berufsabschluss + Mittlere Reife"],
        duration: "3 Jahre",
        note: "Bei guten Leistungen (Notendurchschnitt 2,5) kann ein dem Realschulabschluss gleichwertiger Bildungsstand zuerkannt werden.",
        recommended: true
      },
      {
        title: "Mit dualer Ausbildung (KMK-Modell)",
        steps: ["Hauptschulabschluss", "Duale Ausbildung (mind. 2 Jahre, Ø 3,0)", "Berufsabschluss + Mittlere Reife"],
        duration: "2-3 Jahre",
        note: "Bei Notenschnitt 3,0 in der Berufsschule und 5 Jahren Fremdsprachenunterricht wird ein dem Realschulabschluss gleichwertiger Bildungsstand zuerkannt."
      },
      {
        title: "Berufsaufbauschule (BAS)",
        steps: ["Hauptschulabschluss", "Duale Ausbildung", "Berufsaufbauschule (1 Jahr)", "Mittlere Reife"],
        duration: "4-5 Jahre",
        note: "Mit abgeschlossener Berufsausbildung kann über die BAS der mittlere Bildungsabschluss erworben werden."
      }
    ],
    fachhochschulreife: [
      {
        title: "Über Mittlere Reife zum Berufskolleg",
        steps: ["Hauptschulabschluss", "2BFS/10. Klasse", "Mittlere Reife", "Berufskolleg", "Fachhochschulreife"],
        duration: "4-5 Jahre",
        note: "Zunächst Mittlere Reife erwerben, dann 2 Jahre Berufskolleg.",
        recommended: true
      },
      {
        title: "Über Ausbildung und BKFH",
        steps: ["Hauptschulabschluss", "Mittlere Reife", "Ausbildung", "BKFH (1 Jahr)", "Fachhochschulreife"],
        duration: "6-8 Jahre",
        note: "Nach Ausbildung kann in einem Jahr die Fachhochschulreife erworben werden."
      }
    ],
    abitur: [
      {
        title: "Über Mittlere Reife zum Beruflichen Gymnasium",
        steps: ["Hauptschulabschluss", "Mittlere Reife", "Berufliches Gymnasium", "Abitur"],
        duration: "5 Jahre",
        note: "Mit Mittlerer Reife Zugang zum dreijährigen beruflichen Gymnasium.",
        recommended: true
      },
      {
        title: "Über Ausbildung zur Berufsoberschule",
        steps: ["Hauptschulabschluss", "Mittlere Reife", "Ausbildung", "Berufsoberschule (2 Jahre)", "Abitur"],
        duration: "7-9 Jahre",
        note: "Mit abgeschlossener Berufsausbildung zur fachgebundenen oder allgemeinen Hochschulreife."
      }
    ],
    berufsabschluss: [
      {
        title: "Duale Ausbildung",
        steps: ["Hauptschulabschluss", "Duale Ausbildung", "Berufsabschluss"],
        duration: "2-3,5 Jahre",
        note: "Mit Hauptschulabschluss können viele Ausbildungsberufe erlernt werden.",
        recommended: true
      },
      {
        title: "2-jährige Berufsfachschule",
        steps: ["Hauptschulabschluss", "Berufsfachschule (2-jährig)", "Berufsabschluss"],
        duration: "2 Jahre",
        note: "Schulische Berufsausbildung in verschiedenen Berufsfeldern."
      },
      {
        title: "1-jährige Berufsfachschule + Ausbildung",
        steps: ["Hauptschulabschluss", "1-jährige Berufsfachschule", "Duale Ausbildung (verkürzt)", "Berufsabschluss"],
        duration: "3,5-4,5 Jahre",
        note: "Die 1BFS kann als erstes Ausbildungsjahr in Handwerksberufen angerechnet werden."
      }
    ],
    meister: [
      {
        title: "Über Ausbildung zur Aufstiegsfortbildung",
        steps: ["Hauptschulabschluss", "Duale Ausbildung", "Berufspraxis", "Meister/Techniker/Fachwirt"],
        duration: "6-10 Jahre",
        note: "Mit Abschluss, immer Anschluss - bis zur höchsten beruflichen Qualifikation."
      }
    ],
    studium: [
      {
        title: "Über Abitur",
        steps: ["Hauptschulabschluss", "Mittlere Reife", "Abitur", "Studium"],
        duration: "8+ Jahre",
        note: "Der klassische Weg über alle Bildungsstufen."
      },
      {
        title: "Über berufliche Qualifikation (ohne Abitur)",
        steps: ["Hauptschulabschluss", "Mittlere Reife", "Ausbildung", "Berufspraxis (3 Jahre)", "Studium ohne Abitur"],
        duration: "9+ Jahre",
        note: "Für beruflich Qualifizierte ist ein Studium ohne Abitur möglich."
      }
    ]
  },

  // ============ MITTLERE REIFE ============
  mittlereReife: {
    fachhochschulreife: [
      {
        title: "2-jähriges Berufskolleg",
        steps: ["Mittlere Reife", "Berufskolleg (2 Jahre)", "Fachhochschulreife"],
        duration: "2 Jahre",
        note: "Das 2-jährige Berufskolleg führt zur Fachhochschulreife und vermittelt berufliche Kenntnisse.",
        recommended: true
      },
      {
        title: "Berufskolleg I + II",
        steps: ["Mittlere Reife", "Berufskolleg I (1 Jahr)", "Berufskolleg II (1 Jahr)", "Fachhochschulreife + Assistentenabschluss"],
        duration: "2 Jahre",
        note: "Nach BK I kann bei guten Noten ins BK II gewechselt werden."
      },
      {
        title: "Mit dualer Ausbildung + Zusatzunterricht",
        steps: ["Mittlere Reife", "Duale Ausbildung + Zusatzunterricht", "Berufsabschluss + Fachhochschulreife"],
        duration: "3 Jahre",
        note: "Während der Ausbildung kann durch Zusatzunterricht die Fachhochschulreife erworben werden."
      },
      {
        title: "1-jähriges Berufskolleg nach Ausbildung (BKFH)",
        steps: ["Mittlere Reife", "Duale Ausbildung", "Berufskolleg zum Erwerb der FH-Reife (1 Jahr)", "Fachhochschulreife"],
        duration: "4-5 Jahre",
        note: "Nach abgeschlossener Berufsausbildung kann in einem Jahr die Fachhochschulreife erworben werden."
      },
      {
        title: "2-jährige Fachschule",
        steps: ["Mittlere Reife", "Duale Ausbildung", "Fachschule (2 Jahre)", "Fachhochschulreife + Fortbildungsabschluss"],
        duration: "5-7 Jahre",
        note: "An zweijährigen Fachschulen kann die Fachhochschulreife erworben werden."
      }
    ],
    abitur: [
      {
        title: "Berufliches Gymnasium (3-jährig)",
        steps: ["Mittlere Reife", "Berufliches Gymnasium (3 Jahre)", "Abitur"],
        duration: "3 Jahre",
        note: "Das berufliche Gymnasium führt zur allgemeinen Hochschulreife mit beruflichem Schwerpunkt (6 Richtungen verfügbar).",
        recommended: true
      },
      {
        title: "Aufbaugymnasium",
        steps: ["Mittlere Reife", "Aufbaugymnasium (3 Jahre)", "Abitur"],
        duration: "3 Jahre",
        note: "Das Aufbaugymnasium ist speziell für Realschulabsolventen ('Realschulaufsetzer')."
      },
      {
        title: "Allgemeinbildendes Gymnasium",
        steps: ["Mittlere Reife", "Gymnasium Klasse 11-13", "Abitur"],
        duration: "3 Jahre",
        note: "Bei entsprechender Qualifikation ist der Wechsel ans allgemeinbildende Gymnasium möglich."
      },
      {
        title: "Gymnasiale Oberstufe Gemeinschaftsschule",
        steps: ["Mittlere Reife", "Gemeinschaftsschule Oberstufe (3 Jahre)", "Abitur"],
        duration: "3 Jahre",
        note: "Die Gemeinschaftsschule bietet eine gymnasiale Oberstufe an."
      },
      {
        title: "Berufsoberschule (BOS) nach Ausbildung",
        steps: ["Mittlere Reife", "Duale Ausbildung", "Berufsoberschule Oberstufe (2 Jahre)", "Abitur"],
        duration: "5-7 Jahre",
        note: "Mit abgeschlossener Berufsausbildung führt die BOS zur fachgebundenen oder allgemeinen Hochschulreife."
      }
    ],
    berufsabschluss: [
      {
        title: "Duale Ausbildung",
        steps: ["Mittlere Reife", "Duale Ausbildung", "Berufsabschluss"],
        duration: "2-3,5 Jahre",
        note: "Mit Mittlerer Reife stehen nahezu alle Ausbildungsberufe offen.",
        recommended: true
      },
      {
        title: "Schulische Berufsausbildung",
        steps: ["Mittlere Reife", "Berufsfachschule/Berufskolleg", "Berufsabschluss"],
        duration: "2-3 Jahre",
        note: "Vollzeitschulische Ausbildung z.B. als Erzieher/in, Pflegefachmann/-frau oder technische/r Assistent/in."
      },
      {
        title: "1-jährige Berufsfachschule + Ausbildung",
        steps: ["Mittlere Reife", "1-jährige Berufsfachschule", "Duale Ausbildung (verkürzt)", "Berufsabschluss"],
        duration: "3,5-4,5 Jahre",
        note: "Die 1BFS kann bei Ausbildungsplatzzusage als erstes Ausbildungsjahr angerechnet werden."
      }
    ],
    meister: [
      {
        title: "Über Ausbildung zur Aufstiegsfortbildung",
        steps: ["Mittlere Reife", "Duale Ausbildung", "Berufspraxis", "Meister/Techniker/Fachwirt"],
        duration: "6-9 Jahre",
        note: "Höchste berufliche Qualifikation - gleichgestellt mit Bachelor."
      }
    ],
    studium: [
      {
        title: "Klassischer Weg über Abitur",
        steps: ["Mittlere Reife", "Abitur (3 Jahre)", "Studium"],
        duration: "6+ Jahre",
        note: "Abitur berechtigt zum Studium aller Studiengänge.",
        recommended: true
      },
      {
        title: "Weg über Fachhochschulreife",
        steps: ["Mittlere Reife", "Berufskolleg (2 Jahre)", "Fachhochschulreife", "Studium (FH/DHBW)"],
        duration: "5+ Jahre",
        note: "Studium an Fachhochschulen und Dualen Hochschulen."
      },
      {
        title: "Über berufliche Qualifikation (ohne Abitur)",
        steps: ["Mittlere Reife", "Ausbildung", "Berufspraxis (3 Jahre)", "Studium ohne Abitur"],
        duration: "8+ Jahre",
        note: "Für beruflich Qualifizierte ist ein Studium ohne Abitur möglich."
      }
    ]
  },

  // ============ FACHHOCHSCHULREIFE ============
  fachhochschulreife: {
    abitur: [
      {
        title: "Berufliches Gymnasium Klasse 13",
        steps: ["Fachhochschulreife", "Berufliches Gymnasium Klasse 13", "Abitur"],
        duration: "1 Jahr",
        note: "Mit Fachhochschulreife kann die Klasse 13 des beruflichen Gymnasiums besucht werden.",
        recommended: true
      },
      {
        title: "Berufsoberschule Oberstufe Klasse 2",
        steps: ["Fachhochschulreife + Ausbildung", "Berufsoberschule Klasse 2", "Abitur"],
        duration: "1 Jahr",
        note: "Bei guter Fachhochschulreife und abgeschlossener Ausbildung direkter Einstieg in Klasse 2 der BOS möglich."
      }
    ],
    berufsabschluss: [
      {
        title: "Duale Ausbildung",
        steps: ["Fachhochschulreife", "Duale Ausbildung", "Berufsabschluss"],
        duration: "2-3 Jahre",
        note: "Eine Berufsausbildung ist auch mit Fachhochschulreife möglich und sinnvoll."
      }
    ],
    meister: [
      {
        title: "Über Ausbildung zur Aufstiegsfortbildung",
        steps: ["Fachhochschulreife", "Duale Ausbildung", "Berufspraxis", "Meister/Techniker/Fachwirt"],
        duration: "6-9 Jahre",
        note: "Höchste berufliche Qualifikation."
      }
    ],
    bachelor: [
      {
        title: "Studium an Hochschule für angewandte Wissenschaften",
        steps: ["Fachhochschulreife", "Hochschule/FH/DHBW", "Bachelor"],
        duration: "3-4 Jahre",
        note: "Die Fachhochschulreife berechtigt zum Studium an Hochschulen für angewandte Wissenschaften und Dualen Hochschulen.",
        recommended: true
      },
      {
        title: "Duales Studium",
        steps: ["Fachhochschulreife", "Duales Studium", "Bachelor + Berufsabschluss"],
        duration: "3-4 Jahre",
        note: "Kombination von Praxis im Betrieb und Theorie an der Hochschule."
      }
    ]
  },

  // ============ ABITUR ============
  abitur: {
    berufsabschluss: [
      {
        title: "Duale Ausbildung",
        steps: ["Abitur", "Duale Ausbildung", "Berufsabschluss"],
        duration: "2-3 Jahre",
        note: "Viele Abiturienten entscheiden sich bewusst für eine Berufsausbildung, oft mit verkürzter Ausbildungszeit."
      },
      {
        title: "Schulische Berufsausbildung",
        steps: ["Abitur", "Berufsfachschule/Berufskolleg", "Berufsabschluss"],
        duration: "2-3 Jahre",
        note: "Schulische Ausbildungen z.B. als Erzieher/in oder technische/r Assistent/in."
      }
    ],
    meister: [
      {
        title: "Über Ausbildung zur Aufstiegsfortbildung",
        steps: ["Abitur", "Duale Ausbildung", "Berufspraxis", "Meister/Techniker/Fachwirt"],
        duration: "6-9 Jahre",
        note: "Auch mit Abitur kann der Weg über eine Berufsausbildung zur Aufstiegsfortbildung führen."
      }
    ],
    bachelor: [
      {
        title: "Direktes Studium",
        steps: ["Abitur", "Universität/Hochschule", "Bachelor"],
        duration: "3-4 Jahre",
        note: "Mit Abitur können alle Studiengänge an Universitäten und Hochschulen studiert werden.",
        recommended: true
      },
      {
        title: "Duales Studium",
        steps: ["Abitur", "Duales Studium", "Bachelor + Berufsabschluss"],
        duration: "3-4 Jahre",
        note: "Das duale Studium kombiniert Praxis im Betrieb mit Theorie an der Hochschule."
      }
    ]
  }
}
// --- ENDE EXTRAHIERTER CODE ---

// Hilfsfunktion für die Zeiterhöhung (aus Original-Repo)
function erhoeheZeit(dauer, jahre) {
    if (!dauer) return dauer;
    const match = dauer.match(/(\d+)(-(\d+))?\s*Jahre?/);
    if (match) {
        const min = parseInt(match[1]) + jahre;
        const max = match[3] ? parseInt(match[3]) + jahre : null;
        return max ? `${min}-${max} Jahre` : `${min} Jahre`;
    }
    return dauer;
}

// Ableitungs-Logik falls nicht im Extrakt enthalten
function erweiterePathsMitAbleitungen() {
    // Prüfen, ob VABO-Pfade abgeleitet werden müssen
    if (!paths.vabo || Object.keys(paths.vabo).length === 0) {
        paths.vabo = {};
        const ohneAbschluss = paths.ohneAbschluss;
        for (const ziel in ohneAbschluss) {
            if (!paths.vabo[ziel]) paths.vabo[ziel] = [];
            // Wir nehmen die ersten 2 Wege von "ohneAbschluss" und fügen VABO davor
            const basePaths = ohneAbschluss[ziel].slice(0, 2);

            basePaths.forEach(op => {
                paths.vabo[ziel].push({
                    title: "VABO → " + op.title,
                    steps: ["VABO (Deutsch)", ...op.steps.slice(1)], // Schritt "Ohne Abschluss" ersetzen
                    duration: erhoeheZeit(op.duration, 1),
                    note: "Nach erfolgreicher Deutschförderung im VABO: " + op.note,
                    recommended: op.recommended
                });
            });
        }
    }
}
// Einmalig ausführen
try { erweiterePathsMitAbleitungen(); } catch(e) { console.log("Fehler bei Ableitungen", e); }


// INTERFACE LOGIC
function bw7UpdateTargets() {
    const start = document.getElementById('bw7-start').value;
    const zielSelect = document.getElementById('bw7-ziel');

    // Reset
    zielSelect.innerHTML = '<option value="" disabled selected>-- Bitte wählen --</option>';
    zielSelect.disabled = true;
    document.getElementById('bw7-visual').classList.add('hidden');

    if (!start || !paths[start]) return;

    // Get available targets
    const targets = Object.keys(paths[start]);

    // Labels mapping
    const labels = {
        'hauptschulabschluss': 'Hauptschulabschluss',
        'mittlereReife': 'Mittlere Reife',
        'fachhochschulreife': 'Fachhochschulreife',
        'abitur': 'Abitur',
        'berufsabschluss': 'Berufsabschluss',
        'meister': 'Meister/Techniker',
        'bachelor': 'Bachelor/Studium',
        'studium': 'Studium',
        'bve': 'BVE (Berufsvorbereitung)',
        'vabKF': 'VAB-KF',
        'sonderberufsschule': 'Sonderberufsschule'
    };

    targets.forEach(key => {
        if (paths[start][key] && paths[start][key].length > 0) {
            zielSelect.innerHTML += `<option value="${key}">${labels[key] || key}</option>`;
        }
    });

    zielSelect.disabled = false;
}

function bw7ShowPath() {
    const start = document.getElementById('bw7-start').value;
    const ziel = document.getElementById('bw7-ziel').value;
    const container = document.getElementById('bw7-visual');

    if (!start || !ziel || !paths[start] || !paths[start][ziel]) return;

    const possiblePaths = paths[start][ziel]; // THIS IS THE ARRAY OF 6 PATHS

    // Build HTML for ALL paths found
    let html = `<div class="results-header" style="text-align:center; margin-bottom:20px;"><h3>✨ ${possiblePaths.length} Wege gefunden</h3></div><div class="results-list">`;

    possiblePaths.forEach((path, idx) => {
        // Build steps HTML
        let stepsHtml = '';
        if(path.steps) {
            path.steps.forEach((step, sIdx) => {
                stepsHtml += `<span class="step" style="display:inline-block; padding:5px 10px; background:rgba(102,126,234,0.1); border-radius:8px; margin:2px;">${step}</span>`;
                if(sIdx < path.steps.length - 1) stepsHtml += `<span class="arrow" style="margin:0 5px;">→</span>`;
            });
        }

        html += `
            <div class="path-card animate-in" style="animation-delay: ${idx * 0.1}s; margin-bottom: 20px; padding: 20px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(255,255,255,0.02);">
                <div class="path-card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div class="path-number-badge" style="background:#667eea; width:24px; height:24px; border-radius:50%; display:flex; justify-content:center; align-items:center; font-weight:bold;">${idx + 1}</div>
                        <div class="path-title" style="font-weight:bold; font-size:1.1rem;">${path.title}</div>
                    </div>
                    ${path.duration ? `<div class="duration-badge" style="background:#ffd93d; color:#000; padding:2px 8px; border-radius:12px; font-size:0.8rem; font-weight:bold;">⏱️ ${path.duration}</div>` : ''}
                </div>

                <div class="path-steps" style="margin:15px 0;">${stepsHtml}</div>

                ${path.note ? `<div class="path-note" style="background:rgba(255,217,61,0.1); padding:10px; border-radius:8px; border-left:3px solid #ffd93d; font-size:0.9rem;"><strong>ℹ️ Hinweis:</strong> ${path.note}</div>` : ''}
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
    container.classList.remove('hidden');
}
