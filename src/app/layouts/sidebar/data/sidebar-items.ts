import { SidebarItem } from "../models/sidebar-items.model";

export const SIDEBAR_ITEMS :SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'th-large',
      route: '/dashboard',
    },
    {
      label: 'Orders',
      icon: 'receipt',
      route: '/orders',
    },
    {
      label: 'Kitchen',
      icon: 'shop',
      route: '/kitchen',
    },
    {
      label: 'Products',
      icon: 'box',
      route: '/products',
    },
    {
      label: 'Inventory',
      icon: 'warehouse',
      route: '/inventory',
    },
    {
      label: 'Reports',
      icon: 'chart-line',
      route: '/reports',
    },
    {
      label: 'Settings',
      icon: 'cog',
      route: '/settings',
    },
  ];