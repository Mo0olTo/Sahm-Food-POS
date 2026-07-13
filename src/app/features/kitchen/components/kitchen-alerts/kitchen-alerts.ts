import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { KitchenAlert } from '../../models/kitchen-alert.model';

interface AlertView {
  title: string;
  message: string;
  icon: string;
  tone: 'info' | 'warning' | 'critical';
  container: string;
  iconBg: string;
  iconColor: string;
  bar: string;
}

@Component({
  selector: 'app-kitchen-alerts',
  imports: [],
  templateUrl: './kitchen-alerts.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenAlerts {

  alerts = input.required<readonly KitchenAlert[]>();

  readonly hasAlerts = computed(() => this.alerts().length > 0);

  readonly views = computed<readonly AlertView[]>(() =>
    this.alerts().map(alert => this.toView(alert))
  );

  private toView(alert: KitchenAlert): AlertView {

    const base: AlertView = {
      title: alert.title,
      message: alert.message,
      icon: 'pi-info-circle',
      tone: alert.severity,
      container: '',
      iconBg: '',
      iconColor: '',
      bar: '',
    };

    switch (alert.severity) {

      case 'info':
        return {
          ...base,
          icon: 'pi-info-circle',
          container: 'border-blue-500/30 bg-blue-500/5',
          iconBg: 'bg-blue-500/15',
          iconColor: 'text-blue-400',
          bar: 'bg-blue-500',
        };

      case 'warning':
        return {
          ...base,
          icon: 'pi-exclamation-triangle',
          container: 'border-amber-500/30 bg-amber-500/5',
          iconBg: 'bg-amber-500/15',
          iconColor: 'text-amber-400',
          bar: 'bg-amber-500',
        };

      case 'critical':
        return {
          ...base,
          icon: 'pi-bolt',
          container: 'border-red-500/40 bg-red-500/5',
          iconBg: 'bg-red-500/15',
          iconColor: 'text-red-400',
          bar: 'bg-red-500',
        };
    }
  }
}
