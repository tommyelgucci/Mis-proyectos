import AsyncStorage from '@react-native-async-storage/async-storage';

// Persistencia local del progreso. Estructura:
// {
//   modules: { [moduleId]: { [questionId]: boolean } },  // último resultado por pregunta
//   cards:   { [cardKey]: true },                        // tarjetas ya repasadas
// }
const KEY = '@gastro-exam/progress:v1';

const empty = () => ({ modules: {}, cards: {} });

export async function getProgress() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw);
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

async function save(progress) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // Sin almacenamiento disponible la app sigue funcionando, solo no persiste.
  }
}

export async function recordAnswer(moduleId, questionId, correct) {
  const progress = await getProgress();
  progress.modules[moduleId] = {
    ...progress.modules[moduleId],
    [questionId]: correct,
  };
  await save(progress);
}

export async function recordCardReviewed(cardKey) {
  const progress = await getProgress();
  progress.cards[cardKey] = true;
  await save(progress);
}

export function countCorrect(progress, moduleId) {
  return Object.values(progress.modules[moduleId] ?? {}).filter(Boolean).length;
}

export function countCardsReviewed(progress) {
  return Object.keys(progress.cards ?? {}).length;
}
