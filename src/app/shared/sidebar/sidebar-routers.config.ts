import { RouteInfo } from './sidebar.metadata';


export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },
  {
    path: '/orders',
    title: 'Orders',
    icon: 'bi bi-cart3',
    class: 'has-submenu',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/orders',
        title: 'Order List',
        icon: '',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/orders/',
        title: 'List Orders',
        icon: 'mdi mdi-cart-plus',
        class: 'has-submenu',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/orders/new',
            title: 'New Order',
            icon: 'mdi mdi-cart-plus',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/orders/new/step1',
            title: 'Step 1',
            icon: 'mdi mdi-cart-plus',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/orders/new/step2',
            title: 'Step 2',
            icon: 'mdi mdi-cart-plus',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/orders/new/step3',
            title: 'Step 3',
            icon: 'mdi mdi-cart-plus',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          }

        ]
      }
    ]
  },
  {
    path: '/products',
    title: 'Products',
    icon: 'bi bi-bag',
    class: 'has-submenu',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/products/list',
        title: 'Product List',
        icon: '',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/products/new',
        title: 'New Product',
        icon: '',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      }
    ]
  },

];
