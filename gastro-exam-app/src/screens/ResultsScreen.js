import React from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { theme } from '../theme';

const { colors, spacing, radius } = theme;

export default function ResultsScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { correct, total, timedOut } = route.params;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{t('resultsTitle')}</Text>
          {timedOut && <Text style={styles.timeUp}>⏱ {t('timeUp')}</Text>}
          <Text
            style={[
              styles.pct,
              { color: pct >= 60 ? colors.success : colors.error },
            ]}
          >
            {pct}%
          </Text>
          <Text style={styles.detail}>
            {correct}/{total} {t('correctAnswers')}
          </Text>
        </View>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => navigation.replace('Wirtepatent')}
        >
          <Text style={styles.primaryBtnText}>{t('retry')}</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryBtn}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.secondaryBtnText}>{t('backHome')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: {
    flex: 1,
    padding: spacing(5),
    justifyContent: 'center',
    gap: spacing(3),
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(6),
    alignItems: 'center',
    gap: spacing(2),
  },
  title: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  timeUp: { color: colors.error, fontSize: 14, fontWeight: '600' },
  pct: { fontSize: 56, fontWeight: '800' },
  detail: { color: colors.milk, fontSize: 15 },

  primaryBtn: {
    backgroundColor: colors.crema,
    borderRadius: radius.pill,
    paddingVertical: spacing(3.5),
    alignItems: 'center',
  },
  primaryBtnText: { color: colors.bg, fontSize: 15, fontWeight: '700' },
  secondaryBtn: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing(3.5),
    alignItems: 'center',
  },
  secondaryBtnText: { color: colors.milk, fontSize: 15, fontWeight: '600' },
});
