export interface KitchenAlert {
    id: number;
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'critical';
  }