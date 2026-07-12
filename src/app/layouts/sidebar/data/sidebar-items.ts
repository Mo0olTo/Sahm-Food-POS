import { SidebarItem } from "../models/sidebar-items.model";

export const SIDEBAR_ITEMS :SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      label: 'Orders',
      icon: 'receipt_long',
      route: '/orders',
    },
    {
      label: 'Kitchen',
      icon: 'restaurant',
      route: '/kitchen',
    },
    {
      label: 'Products',
      icon: 'inventory_2',
      route: '/products',
    },
    {
      label: 'Inventory',
      icon: 'warehouse',
      route: '/inventory',
    },
    {
      label: 'Reports',
      icon: 'bar_chart',
      route: '/reports',
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
    },
  ];