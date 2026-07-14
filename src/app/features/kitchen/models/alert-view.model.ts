export interface AlertView {
  title: string;
  message: string;
  icon: string;
  tone: 'info' | 'warning' | 'critical';
  container: string;
  iconBg: string;
  iconColor: string;
  bar: string;
}