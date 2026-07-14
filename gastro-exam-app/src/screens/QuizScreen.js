import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { theme } from '../theme';
import { recordAnswer } from '../storage/progress';
import data from '../data/questions.json';

const { colors, spacing, radius } = theme;

// El examen real se rinde en alemán; la traducción es apoyo de estudio.
const MODULE_ID = 'wirtepatent';
const SECONDS_PER_QUESTION = 90;
// Cada intento toma un subconjunto aleatorio del banco, como el examen real.
const EXAM_SIZE = 15;

function pickExamQuestions(all) {
  const shuffled = [...all];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(EXAM_SIZE, shuffled.length));
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function QuizScreen({ navigation }) {
  const { t } = useLanguage();
  const module = useMemo(
    () => data.modules.find((m) => m.id === MODULE_ID),
    []
  );
  const questions = useMemo(() => pickExamQuestions(module.questions), [module]);
  const examLang = module.examLanguage;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    questions.length * SECONDS_PER_QUESTION
  );
  const correctCount = useRef(0);

  const question = questions[index];
  const answered = selected !== null;
  const isLast = index === questions.length - 1;

  const finish = (timedOut = false) => {
    navigation.replace('Results', {
      correct: correctCount.current,
      total: questions.length,
      timedOut,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finish(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSelect = (optionId) => {
    if (answered) return;
    setSelected(optionId);
    const correct = optionId === question.correctOption;
    if (correct) correctCount.current += 1;
    recordAnswer(MODULE_ID, question.id, correct);
  };

  const onNext = () => {
    if (isLast) {
      finish();
      return;
    }
    setIndex(index + 1);
    setSelected(null);
    setShowTranslation(false);
  };

  const optionStyle = (optionId) => {
    if (!answered) return styles.option;
    if (optionId === question.correctOption) {
      return [styles.option, styles.optionCorrect];
    }
    if (optionId === selected) {
      return [styles.option, styles.optionWrong];
    }
    return [styles.option, styles.optionFaded];
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabecera: posición + temporizador */}
        <View style={styles.header}>
          <Text style={styles.position}>
            {t('question')} {index + 1}/{questions.length}
          </Text>
          <Text
            style={[
              styles.timer,
              secondsLeft <= 60 && { color: colors.error },
            ]}
          >
            ⏱ {formatTime(secondsLeft)}
          </Text>
        </View>

        {/* Pregunta en el idioma del examen */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question[examLang]}</Text>
        </View>

        {/* Opciones */}
        <View style={styles.options}>
          {question.options.map((option) => (
            <Pressable
              key={option.id}
              style={optionStyle(option.id)}
              onPress={() => onSelect(option.id)}
            >
              <Text style={styles.optionText}>{option.text[examLang]}</Text>
            </Pressable>
          ))}
        </View>

        {/* Traducción y glosario de apoyo */}
        <Pressable
          style={styles.translationToggle}
          onPress={() => setShowTranslation(!showTranslation)}
        >
          <Text style={styles.translationToggleText}>
            {showTranslation ? t('hideTranslation') : t('showTranslation')}
          </Text>
        </Pressable>
        {showTranslation && (
          <View style={styles.translationCard}>
            <Text style={styles.translationQuestion}>
              {question.question.es}
            </Text>
            {question.options.map((option) => (
              <Text key={option.id} style={styles.translationOption}>
                {option.id.toUpperCase()}. {option.text.es}
              </Text>
            ))}
            <Text style={styles.glossaryTitle}>{t('glossary')}</Text>
            {question.glossary.map((entry) => (
              <Text key={entry.de} style={styles.glossaryEntry}>
                <Text style={styles.glossaryTerm}>{entry.de}</Text> — {entry.es}
              </Text>
            ))}
          </View>
        )}

        {/* Feedback inmediato + explicación bilingüe */}
        {answered && (
          <View
            style={[
              styles.feedbackCard,
              {
                borderLeftColor:
                  selected === question.correctOption
                    ? colors.success
                    : colors.error,
              },
            ]}
          >
            <Text
              style={[
                styles.feedbackLabel,
                {
                  color:
                    selected === question.correctOption
                      ? colors.success
                      : colors.error,
                },
              ]}
            >
              {selected === question.correctOption
                ? t('correct')
                : t('incorrect')}
            </Text>
            <Text style={styles.explanationTitle}>{t('explanation')}</Text>
            <Text style={styles.explanationText}>
              🇩🇪 {question.explanation.de}
            </Text>
            <Text style={styles.explanationText}>
              🇪🇸 {question.explanation.es}
            </Text>
            <Pressable style={styles.nextBtn} onPress={onNext}>
              <Text style={styles.nextBtnText}>
                {isLast ? t('seeResults') : t('next')} →
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing(5), gap: spacing(4) },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  position: { color: colors.muted, fontSize: 14, fontWeight: '600' },
  timer: { color: colors.crema, fontSize: 16, fontWeight: '700' },

  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(5),
  },
  questionText: {
    color: colors.milk,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },

  options: { gap: spacing(2) },
  option: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(4),
  },
  optionCorrect: { borderColor: colors.success, backgroundColor: '#22301C' },
  optionWrong: { borderColor: colors.error, backgroundColor: '#33201A' },
  optionFaded: { opacity: 0.5 },
  optionText: { color: colors.milk, fontSize: 15, lineHeight: 21 },

  translationToggle: { alignSelf: 'flex-start' },
  translationToggleText: {
    color: colors.crema,
    fontSize: 14,
    fontWeight: '600',
  },
  translationCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.card,
    borderLeftWidth: 3,
    borderLeftColor: colors.crema,
    padding: spacing(4),
    gap: spacing(2),
  },
  translationQuestion: {
    color: colors.milk,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  translationOption: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  glossaryTitle: {
    color: colors.crema,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: spacing(1),
  },
  glossaryEntry: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  glossaryTerm: { color: colors.milk, fontWeight: '600' },

  feedbackCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderLeftWidth: 3,
    padding: spacing(4),
    gap: spacing(2),
  },
  feedbackLabel: { fontSize: 16, fontWeight: '800' },
  explanationTitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  explanationText: { color: colors.milk, fontSize: 14, lineHeight: 21 },
  nextBtn: {
    backgroundColor: colors.crema,
    borderRadius: radius.pill,
    paddingVertical: spacing(3),
    alignItems: 'center',
    marginTop: spacing(2),
  },
  nextBtnText: { color: colors.bg, fontSize: 15, fontWeight: '700' },
});
