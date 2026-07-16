import React, { createContext, useContext, useState } from 'react';

// Sistema i18n ligero y sin dependencias. Si el proyecto crece,
// se puede sustituir por react-i18next sin cambiar las pantallas:
// la interfaz t('clave') es la misma.

const translations = {
  es: {
    greeting: 'Hola de nuevo',
    subtitle: 'Tu camino hacia el Wirtepatent y la SCA',
    progressTitle: 'Progreso general',
    continueStudy: 'Continuar estudiando',
    moduleWirtepatent: 'Wirtepatent Zürich',
    moduleWirtepatentDesc: 'Derecho, HACCP, L-GAV, contabilidad, seguros',
    moduleSca: 'SCA Foundation',
    moduleScaDesc: 'Barista skills, brewing, análisis sensorial',
    questionsDone: 'preguntas completadas',
    examSimulator: 'Simulador de examen',
    flashcards: 'Tarjetas de memoria',
    dailyFact: 'Dato del día',
    dailyFactText:
      'En el cantón de Zürich, la venta de bebidas espirituosas está prohibida a menores de 18 años; cerveza y vino, a menores de 16.',
    glossary: 'Glosario DE–ES',
    cta: 'Empezar',
    question: 'Pregunta',
    timeLeft: 'Tiempo restante',
    showTranslation: 'Mostrar traducción 🇪🇸',
    hideTranslation: 'Ocultar traducción',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto',
    explanation: 'Explicación',
    next: 'Siguiente',
    seeResults: 'Ver resultados',
    resultsTitle: 'Resultados',
    timeUp: 'Se acabó el tiempo',
    correctAnswers: 'respuestas correctas',
    retry: 'Reintentar',
    backHome: 'Volver al inicio',
    card: 'Tarjeta',
    tapToFlip: 'Toca la tarjeta para voltearla',
    previous: 'Anterior',
  },
  de: {
    greeting: 'Willkommen zurück',
    subtitle: 'Dein Weg zum Wirtepatent und zur SCA',
    progressTitle: 'Gesamtfortschritt',
    continueStudy: 'Weiterlernen',
    moduleWirtepatent: 'Wirtepatent Zürich',
    moduleWirtepatentDesc: 'Recht, HACCP, L-GAV, Buchhaltung, Versicherungen',
    moduleSca: 'SCA Foundation',
    moduleScaDesc: 'Barista Skills, Brewing, Sensorik',
    questionsDone: 'Fragen beantwortet',
    examSimulator: 'Prüfungssimulator',
    flashcards: 'Lernkarten',
    dailyFact: 'Fakt des Tages',
    dailyFactText:
      'Im Kanton Zürich ist der Verkauf von Spirituosen an unter 18-Jährige verboten; Bier und Wein an unter 16-Jährige.',
    glossary: 'Glossar DE–ES',
    cta: 'Starten',
    question: 'Frage',
    timeLeft: 'Verbleibende Zeit',
    showTranslation: 'Übersetzung anzeigen 🇪🇸',
    hideTranslation: 'Übersetzung ausblenden',
    correct: 'Richtig!',
    incorrect: 'Falsch',
    explanation: 'Erklärung',
    next: 'Weiter',
    seeResults: 'Ergebnisse ansehen',
    resultsTitle: 'Ergebnisse',
    timeUp: 'Die Zeit ist um',
    correctAnswers: 'richtige Antworten',
    retry: 'Wiederholen',
    backHome: 'Zurück zur Übersicht',
    card: 'Karte',
    tapToFlip: 'Karte antippen zum Umdrehen',
    previous: 'Zurück',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es');
  const t = (key) => translations[lang][key] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
