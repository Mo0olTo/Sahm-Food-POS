import { Observable } from "rxjs";

export type OfflineActionType =
  | 'CREATE_ORDER'
  | 'UPDATE_ORDER'
  | 'DELETE_ORDER';


  export type OfflineActionHandler = (payload: unknown) => Observable<unknown>;