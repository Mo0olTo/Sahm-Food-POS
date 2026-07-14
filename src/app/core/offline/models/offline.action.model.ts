import { OfflineActionType } from "./offline.action.types";

export interface OfflineAction<T = unknown> {
    id: string;
  
    /** action types*/
    type: OfflineActionType;
  
    /** data to make the action*/
    payload: T;
  
    /** initiate time*/
    createdAt: number;
  
    /**times that user retry*/
    retryCount: number;
  }