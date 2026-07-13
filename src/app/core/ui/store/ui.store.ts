import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiStore {

  // ==========================
  // State
  // ==========================

  private readonly _isNewOrderDrawerOpen = signal(false);

  // ==========================
  // Readonly State
  // ==========================

  readonly isNewOrderDrawerOpen =
    this._isNewOrderDrawerOpen.asReadonly();

  // ==========================
  // Actions
  // ==========================

  openNewOrderDrawer(): void {

    this._isNewOrderDrawerOpen.set(true);

  }

  closeNewOrderDrawer(): void {

    this._isNewOrderDrawerOpen.set(false);

  }

}