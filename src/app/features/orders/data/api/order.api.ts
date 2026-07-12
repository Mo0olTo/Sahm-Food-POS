export const ORDERS_API = {

    GET_ALL: '/orders',
  
    GET_BY_ID: (id: string) => `/orders/${id}`,
  
    CREATE: '/orders',
  
    UPDATE: (id: string) => `/orders/${id}`,
  
    DELETE: (id: string) => `/orders/${id}`,
  
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  
    GET_STATISTICS: '/orders/statistics',
  
  } as const;