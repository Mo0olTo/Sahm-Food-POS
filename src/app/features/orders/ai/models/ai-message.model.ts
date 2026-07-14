import { AiRecommendation } from './ai-analysis.model';

export interface AiMessage {

  id: string;

  role: 'user' | 'assistant';

  content?: string;

  recommendations?: AiRecommendation[];

  createdAt: string;

}