import { AiAction } from './ai-action.type';

export interface AiRecommendation {
  id: string;
  title: string;
  description: string;
}

export interface AiAnalysis {
  recommendations: AiRecommendation[];
}