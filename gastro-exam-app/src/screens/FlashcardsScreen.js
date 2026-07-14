import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { theme } from '../theme';
import { recordCardReviewed } from '../storage/progress';
import data from '../data/questions.json';

const { colors, spacing, radius } = theme;

// Las tarjetas nacen del glosario de cada pregunta del módulo SCA:
// término en alemán al frente; traducción y explicación al reverso.
function buildCards() {
  const module = data.modules.find((m) => m.id === 'sca-foundation');
  return module.questions.flatMap((question) =>
    question.glossary.map((entry) => ({
      key: `${question.id}:${entry.de}`,
      front: entry.de,
      back: entry.es,
      explanation: question.explanation,
      topic: question.topic,
    }))
  );
}

export default function FlashcardsScreen() {
  const { t, lang } = useLanguage();
  const cards = useMemo(buildCards, []);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flip = useRef(new Animated.Value(0)).current;

  const card = cards[index];

  const frontRotate = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backRotate = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const onFlip = () => {
    const toValue = flipped ? 0 : 180;
    Animated.spring(flip, {
      toValue,
      friction: 8,
      tension: 12,
      useNativeDriver: true,
    }).start();
    if (!flipped) recordCardReviewed(card.key);
    setFlipped(!flipped);
  };

  const goTo = (nextIndex) => {
    flip.setValue(0);
    setFlipped(false);
    setIndex(nextIndex);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.counter}>
          {t('card')} {index + 1}/{cards.length}
        </Text>

        <Pressable style={styles.cardArea} onPress={onFlip}>
          {/* Frente: término en alemán */}
          <Animated.View
            style={[styles.card, { transform: [{ rotateY: frontRotate }] }]}
          >
            <Text style={styles.topic}>☕ {card.topic}</Text>
            <Text style={styles.term}>{card.front}</Text>
            <Text style={styles.hint}>{t('tapToFlip')}</Text>
          </Animated.View>

          {/* Reverso: traducción + explicación */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backRotate }] },
            ]}
          >
            <Text style={styles.translation}>{card.back}</Text>
            <Text style={styles.explanation}>{card.explanation[lang]}</Text>
          </Animated.View>
        </Pressable>

        <View style={styles.nav}>
          <Pressable
            style={[styles.navBtn, index === 0 && styles.navBtnDisabled]}
            disabled={index === 0}
            onPress={() => goTo(index - 1)}
          >
            <Text style={styles.navBtnText}>← {t('previous')}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.navBtn,
              index === cards.length - 1 && styles.navBtnDisabled,
            ]}
            disabled={index === cards.length - 1}
            onPress={() => goTo(index + 1)}
          >
            <Text style={styles.navBtnText}>{t('next')} →</Text>
          </Pressable>
        </View>
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
    gap: spacing(4),
  },
  counter: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  cardArea: { height: 320 },
  card: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(6),
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(3),
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.crema,
  },
  topic: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  term: {
    color: colors.milk,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  hint: { color: colors.muted, fontSize: 13 },
  translation: {
    color: colors.crema,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  explanation: {
    color: colors.milk,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  nav: { flexDirection: 'row', justifyContent: 'space-between' },
  navBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing(5),
    paddingVertical: spacing(3),
  },
  navBtnDisabled: { opacity: 0.4 },
  navBtnText: { color: colors.milk, fontSize: 14, fontWeight: '600' },
});
