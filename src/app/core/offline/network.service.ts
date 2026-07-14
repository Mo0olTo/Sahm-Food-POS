import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {

  readonly online = signal(navigator.onLine);

  readonly offline = computed(() => !this.online());

  constructor() {

    window.addEventListener('online', () => {
      this.online.set(true);
    });

    window.addEventListener('offline', () => {
      this.online.set(false);
    });

  }

  isOnline(){
    return this.online();
  }

}