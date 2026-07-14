import { Injectable } from '@angular/core';
import { OfflineAction } from './models/offline.action.model';


const STORAGE_KEY = 'offline-queue';

@Injectable({
  providedIn: 'root',
})
export class OfflineStorageService {

  save(actions: OfflineAction[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  }

  load(): OfflineAction[] {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as OfflineAction[];
    } catch {
      return [];
    }

  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

}