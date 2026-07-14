import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLanguage } from '../i18n/LanguageContext';
import { theme } from '../theme';
import {
  getProgress,
  countCorrect,
  countCardsReviewed,
} from '../storage/progress';
import data from '../data/questions.json';

const { colors, spacing, radius } = theme;

const wirtepatentModule = data.modules.find((m) => m.id === 'wirtepatent');
const scaModule = data.modules.find((m) => m.id === 'sca-foundation');
const totals = {
  wirtepatent: wirtepatentModule.questions.length,
  sca: scaModule.questions.reduce((sum, q) => sum + q.glossary.length, 0),
};

// ---------- Selector de idioma ES / DE ----------
function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <View style={styles.toggle}>
      {['es', 'de'].map((code) => (
        <Pressable
          key={code}
          onPress={() => setLang(code)}
          style={[styles.toggleBtn, lang === code && styles.toggleBtnActive]}
        >
          <Text
            style={[styles.toggleText, lang === code && styles.toggleTextActive]}
          >
            {code.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// ---------- Barra de progreso estilo "extracción de espresso" ----------
function ExtractionBar({ value }) {
  return (
    <View style={styles.barTrack}>
      <View style={[styles.barFill, { width: `${value}%` }]} />
    </View>
  );
}

// ---------- Tarjeta de módulo ----------
function ModuleCard({ title, description, done, total, accent, ctaLabel, onPress }) {
  const pct = Math.round((done / total) * 100);
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardPct, { color: accent }]}>{pct}%</Text>
      </View>
      <Text style={styles.cardDesc}>{description}</Text>
      <ExtractionBar value={pct} />
      <View style={styles.cardFooter}>
        <Text style={styles.cardMeta}>
          {done}/{total}
        </Text>
        <Text style={[styles.cardCta, { color: accent }]}>{ctaLabel} →</Text>
      </View>
    </Pressable>
  );
}

// ---------- Dashboard ----------
export default function DashboardScreen({ navigation }) {
  const { t, lang } = useLanguage();

  const [progress, setProgress] = useState({
    wirtepatent: { done: 0, total: totals.wirtepatent },
    sca: { done: 0, total: totals.sca },
  });

  // Recarga el progreso guardado cada vez que el dashboard vuelve a tener foco
  useFocusEffect(
    useCallback(() => {
      let active = true;
      getProgress().then((stored) => {
        if (!active) return;
        setProgress({
          wirtepatent: {
            done: countCorrect(stored, 'wirtepatent'),
            total: totals.wirtepatent,
          },
          sca: { done: countCardsReviewed(stored), total: totals.sca },
        });
      });
      return () => {
        active = false;
      };
    }, [])
  );
  const overall = Math.round(
    ((progress.wirtepatent.done + progress.sca.done) /
      (progress.wirtepatent.total + progress.sca.total)) * 100
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('greeting')}</Text>
            <Text style={styles.subtitle}>{t('subtitle')}</Text>
          </View>
          <LanguageToggle />
        </View>

        {/* Progreso general */}
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>{t('progressTitle')}</Text>
          <Text style={styles.progressValue}>{overall}%</Text>
          <ExtractionBar value={overall} />
          <Text style={styles.progressMeta}>
            {progress.wirtepatent.done + progress.sca.done} {t('questionsDone')}
          </Text>
        </View>

        {/* Rutas de aprendizaje */}
        <ModuleCard
          title={t('moduleWirtepatent')}
          description={t('moduleWirtepatentDesc')}
          done={progress.wirtepatent.done}
          total={progress.wirtepatent.total}
          accent={colors.crema}
          ctaLabel={t('cta')}
          onPress={() => navigation?.navigate('Wirtepatent')}
        />
        <ModuleCard
          title={t('moduleSca')}
          description={t('moduleScaDesc')}
          done={progress.sca.done}
          total={progress.sca.total}
          accent={colors.success}
          ctaLabel={t('cta')}
          onPress={() => navigation?.navigate('Sca')}
        />

        {/* Accesos rápidos */}
        <View style={styles.quickRow}>
          {[
            { label: t('examSimulator'), route: 'Wirtepatent' },
            { label: t('flashcards'), route: null },
            { label: t('glossary'), route: null },
          ].map(({ label, route }) => (
            <Pressable
              key={label}
              style={styles.quickChip}
              onPress={() => route && navigation?.navigate(route)}
            >
              <Text style={styles.quickText}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Dato del día */}
        <View style={styles.factCard}>
          <Text style={styles.factLabel}>
            ☕ {t('dailyFact')} · {lang.toUpperCase()}
          </Text>
          <Text style={styles.factText}>{t('dailyFactText')}</Text>
        </View>
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
    alignItems: 'flex-start',
  },
  greeting: { color: colors.milk, fontSize: 26, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: spacing(1) },

  // Selector de idioma
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
  },
  toggleBtn: {
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(1.5),
    borderRadius: radius.pill,
  },
  toggleBtnActive: { backgroundColor: colors.crema },
  toggleText: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  toggleTextActive: { color: colors.bg },

  // Progreso general
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(5),
    gap: spacing(2),
  },
  progressLabel: { color: colors.muted, fontSize: 13, letterSpacing: 0.5 },
  progressValue: { color: colors.crema, fontSize: 40, fontWeight: '800' },
  progressMeta: { color: colors.muted, fontSize: 13 },

  // Barra "extracción"
  barTrack: {
    height: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.crema,
    borderRadius: radius.pill,
  },

  // Tarjetas de módulo
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(5),
    gap: spacing(3),
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { color: colors.milk, fontSize: 18, fontWeight: '700' },
  cardPct: { fontSize: 16, fontWeight: '700' },
  cardDesc: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  cardMeta: { color: colors.muted, fontSize: 13 },
  cardCta: { fontSize: 14, fontWeight: '600' },

  // Accesos rápidos
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(2) },
  quickChip: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2.5),
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickText: { color: colors.milk, fontSize: 13, fontWeight: '500' },

  // Dato del día
  factCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.card,
    borderLeftWidth: 3,
    borderLeftColor: colors.crema,
    padding: spacing(4),
    gap: spacing(2),
  },
  factLabel: { color: colors.crema, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  factText: { color: colors.milk, fontSize: 14, lineHeight: 21 },
});
