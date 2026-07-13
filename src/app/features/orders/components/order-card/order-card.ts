import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../../models/order.model';
import { OrderChannel } from '../../models/order-channel.type';
import { OrderStatus } from '../../models/order-status.type';
import { StatusBadge } from "../../../../shared/ui/status-badge/status-badge";
import { PriorityBadge } from "../../../../shared/ui/priority-badge/priority-badge";

type StatusTone = 'neutral' | 'info' | 'warn' | 'success' | 'muted';
type ChannelTone = 'walk-in' | 'delivery' | 'online';

@Component({
  selector: 'app-order-card',
  imports: [DatePipe, StatusBadge, CurrencyPipe, PriorityBadge],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCard {
  order = input.required<Order>(); 

  selected = output<number>();

  onSelect() {
    this.selected.emit(this.order().id);
  } 


  // Map order lifecycle to a tone used by the status pill (and accent border).
  readonly statusTone = computed<StatusTone>(() => {
    const status = this.order().status;
    return STATUS_TONE_MAP[status] ?? 'neutral';
  });

  // Map channel to its tone; drives the small channel chip.
  readonly channelTone = computed<ChannelTone>(() => this.order().channel);

  // Human-friendly label for the channel (kebab → spaced words).
  readonly channelLabel = computed<string>(() =>
    this.order().channel.replace('-', ' '),
  );

  // First-letter glyph for the channel chip.
  readonly channelIcon = computed<string>(() => CHANNEL_ICON[this.order().channel]);

  // Subtotal-style headline: surface total items in a single signal
  // so the template doesn't recompute on every change-detection pass.
  readonly itemsCount = computed(() =>
    this.order().items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );
  
  readonly itemsLabel = computed(() => {
  
    const count = this.itemsCount();
  
    return `${count} item${count === 1 ? '' : 's'}`;
  
  });


  readonly totalPrice = computed(() => this.order().total);

} 

const STATUS_TONE_MAP: Readonly<Record<OrderStatus, StatusTone>> = {
  received: 'info',
  preparing: 'warn',
  ready: 'success',
  delivered: 'muted',
  completed: 'muted',
};

const CHANNEL_ICON: Readonly<Record<OrderChannel, string>> = {
  'walk-in': 'W',
  'delivery': 'D',
  'online': 'O',
};
