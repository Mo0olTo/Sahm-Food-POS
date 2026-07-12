import { Component, inject, signal } from '@angular/core';
import { OrdersFacade } from '../../facade/orders.facade';
import { FormsModule } from '@angular/forms';
import { StatCard } from "../../../../shared/ui/stat-card/stat-card";

@Component({
  selector: 'app-order-toolbar',
  imports: [FormsModule, StatCard],
  templateUrl: './order-toolbar.html',
  styleUrl: './order-toolbar.scss',
})
export class OrderToolbar {
  private readonly facade = inject(OrdersFacade);

  readonly statistics = this.facade.statistics;

  search = signal('');

  onSearch(): void {
    this.facade.setSearch(this.search());
  }

}
