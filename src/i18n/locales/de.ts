export default {
  header: {
    dataAssessment: "Datenbasierte Bewertung",
    modelAssessment: "Modellbasierte Bewertung",
  },
  sidebar: {
    currentPatient: "Aktueller Patient",
    lastAssessment: "Letzte Bewertung",
    analysisMode: "Analysemodus",
    aiStatus: "KI-Status",
    modelActive: "Modell v4.2.0 aktiv. Verarbeitungsvertrauen: 94%.",
  },
  modes: {
    screening: {
      label: "Screening",
      description: "Frühstadium-Screening & Unterstützung",
    },
    learning: {
      label: "Lernen",
      description: "Bildungsansichten für Training",
    },
    assessment: {
      label: "Vertieft",
      description: "Komplexe Fälle & Diagnose",
    },
  },
  screening: {
    title: "KI-gestützte Screening-Übersicht",
    subtitle: "Basierend auf nicht-invasiven SIT-Aufzeichnungen und automatisierter Verhaltensanalyse.",
    metrics: {
      title: "Hauptmetriken",
      signalQuality: "Signalqualität",
      processingTime: "Verarbeitungszeit",
      confidence: "KI-Vertrauen",
    },
    confusionMatrix: {
      title: "Leistungsübersicht: Konfusionsmatrix",
      withASC: "Mit ASS-Diagnose",
      withoutASC: "Ohne ASS-Diagnose",
      aiRecommendsASC: "KI empfiehlt ASS-Diagnose",
      aiRecommendsNoASC: "KI empfiehlt keine ASS-Diagnose",
    },
    aiAssessment: {
      title: "KI-Bewertung",
      elevated: "ERHÖHTER HINWEIS",
      description: "Das KI-Modell zeigt eine erhöhte Wahrscheinlichkeit autistischer Merkmale basierend auf Blick-, Bewegungs- und Gesichtsausdrucksdaten.",
      clinicalGuidance: "KLINISCHE ANLEITUNG",
      guidanceText: "Dies ist ein Screening-Ergebnis, keine klinische Diagnose. Eine Nachverfolgung mit klinischer Bewertung wird empfohlen.",
      generateReport: "Detaillierten klinischen Bericht erstellen",
    },
  },
  learning: {
    title: "Bildungseinblicke: Die Bewertung verstehen",
    traits: {
      title: "Verhaltensmerkmale & Quantifizierung",
      patient: "Patient",
      average: "Durchschnitt",
      educational: "Bildungshinweise",
      gazePatterns: "Blickmuster",
      facialExpressivity: "Gesichtsausdruck",
      vocalProsody: "Stimmprosodie",
      headMovement: "Kopfbewegung",
      socialReciprocity: "Soziale Reziprozität",
    },
    differentialDiagnosis: {
      title: "Differenzialdiagnose-Wahrscheinlichkeiten",
      description: "Diese Wahrscheinlichkeiten helfen bei der klinischen Argumentation, sind aber nicht definitiv. Sie stellen die Wahrscheinlichkeit dar, dass bestimmte Zustände die beobachteten Verhaltensmuster erklären könnten.",
    },
    timeSeries: {
      title: "Verhaltenssignal im Zeitverlauf",
      gaze: "Blick",
      movement: "Bewegung",
    },
  },
  assessment: {
    title: "Vertiefte klinische Bewertung",
    complexity: "Analyse hochkomplexer Fälle",
    description: "Detaillierte multimodale Bewertung, die Verhaltens-, Entwicklungs- und Kontextfaktoren für komplexe Diagnosefälle kombiniert.",
  },
};
