export type MultiCheckInteractiveChallenge = {
  id: string;
  domain: 'language' | 'math' | 'logic' | 'memory' | 'visual';
  title: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  hint: string;
};

export const multicheckInteractivePack: MultiCheckInteractiveChallenge[] = [
  { id:'mc-word-1', domain:'language', title:'Relación verbal', prompt:'Brújula es a orientación como termómetro es a…', options:['temperatura','peso','velocidad','distancia'], answer:0, explanation:'Una brújula mide o indica orientación; un termómetro indica temperatura.', hint:'Piensa en qué propiedad revela cada instrumento.' },
  { id:'mc-word-2', domain:'language', title:'Sinónimo preciso', prompt:'Elige el sinónimo más cercano de «efímero».', options:['duradero','breve','ruidoso','incierto'], answer:1, explanation:'Efímero significa que dura poco tiempo.', hint:'Busca la idea opuesta a permanente.' },
  { id:'mc-math-1', domain:'math', title:'Porcentaje inverso', prompt:'Un precio sube un 20% y después baja un 20%. ¿Vuelve al precio inicial?', options:['Sí','No, queda 4% por debajo','No, queda 4% por encima','Depende'], answer:1, explanation:'100 × 1,20 × 0,80 = 96: el resultado queda 4% por debajo del inicial.', hint:'Aplica los porcentajes de forma multiplicativa.' },
  { id:'mc-math-2', domain:'math', title:'Patrón numérico', prompt:'Completa: 3, 7, 15, 31, …', options:['47','55','63','65'], answer:2, explanation:'Cada término es el anterior ×2 +1.', hint:'Prueba una operación que se repita entre términos.' },
  { id:'mc-logic-1', domain:'logic', title:'Silogismo', prompt:'Todos los noris son azules. Algunos azules son rápidos. ¿Qué se deduce con seguridad?', options:['Todos los noris son rápidos','Algunos noris son rápidos','Ningún nori es rápido','No se puede asegurar que un nori sea rápido'], answer:3, explanation:'Los azules rápidos podrían no pertenecer al conjunto de los noris.', hint:'Distingue entre «todos» y «algunos».' },
  { id:'mc-logic-2', domain:'logic', title:'Orden', prompt:'Ana llega antes que Bruno. Bruno antes que Carla. Diego llega antes que Ana. ¿Quién llega primero?', options:['Ana','Bruno','Carla','Diego'], answer:3, explanation:'Diego → Ana → Bruno → Carla.', hint:'Convierte cada frase en una flecha temporal.' },
  { id:'mc-memory-1', domain:'memory', title:'Memoria de trabajo', prompt:'Lee 4-8-1-6-3. ¿Cuál es la secuencia al revés?', options:['3-6-1-8-4','3-6-1-4-8','4-8-1-6-3','6-3-1-8-4'], answer:0, explanation:'Invertir la secuencia exige mantener y reorganizar la información.', hint:'Recorre los dígitos desde el último al primero.' },
  { id:'mc-visual-1', domain:'visual', title:'Transformación', prompt:'Una figura gira 90° en sentido horario y después otros 90°. El cambio total es…', options:['90°','180°','270°','360°'], answer:1, explanation:'Dos giros consecutivos de 90° suman 180°.', hint:'Suma las transformaciones antes de elegir.' }
];

export const getInteractiveChallenges = (domain?: MultiCheckInteractiveChallenge['domain']) =>
  domain ? multicheckInteractivePack.filter(challenge => challenge.domain === domain) : multicheckInteractivePack;
