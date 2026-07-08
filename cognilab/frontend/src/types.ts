export interface Question {
  id: number;
  origQ: string;
  domain: string;
  question: string;
  options: Record<string, string>;
  correct: string;
  explanation: string;
  isTrap: boolean;
  sourceFile: string;
}

export interface QuickCard {
  id: number;
  domain: string;
  front: string;
  back: string;
}

export interface AudioCard {
  id: number;
  domain: string;
  domainColor: string;
  topic: string;
  shortTitle: string;
  content: string;
  keyPoint: string;
}

export type QuizModeId =
  | "practice"
  | "exam"
  | "lightning"
  | "survival"
  | "boss"
  | "traps"
  | "failed"
  | "daily";
