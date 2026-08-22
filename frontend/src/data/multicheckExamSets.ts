import { multicheckInteractivePack, type MultiCheckInteractiveChallenge } from './multicheckInteractivePack';

export type MultiCheckExamSet = {
  id: string;
  name: string;
  description: string;
  timeLimitMinutes: number;
  domains: MultiCheckInteractiveChallenge['domain'][];
  challengeIds: string[];
};

const ids = multicheckInteractivePack.map(item => item.id);

export const multicheckExamSets: MultiCheckExamSet[] = [
  { id:'mc-quick', name:'Chequeo rápido', description:'8 preguntas mixtas para calentar y detectar puntos débiles.', timeLimitMinutes:8, domains:['language','math','logic','memory','visual'], challengeIds:ids },
  { id:'mc-reasoning', name:'Razonamiento', description:'Lenguaje, lógica y matemáticas con explicaciones para revisar al terminar.', timeLimitMinutes:12, domains:['language','math','logic'], challengeIds:ids.filter(id => /word|math|logic/.test(id)) },
  { id:'mc-focus', name:'Foco y memoria', description:'Sesión corta para entrenar memoria de trabajo y transformación mental.', timeLimitMinutes:6, domains:['memory','visual'], challengeIds:ids.filter(id => /memory|visual/.test(id)) }
];

export function getExamChallenges(setId: string) {
  const set = multicheckExamSets.find(item => item.id === setId);
  if (!set) return [];
  const wanted = new Set(set.challengeIds);
  return multicheckInteractivePack.filter(item => wanted.has(item.id));
}
