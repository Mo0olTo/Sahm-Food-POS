import { API_ENDPOINTS } from "./API-ENDPOINTS";


export const API_ROUTES = {

    orders: {
        getAll: API_ENDPOINTS.orders,
        getById: (id: number) => `${API_ENDPOINTS.orders}/${id}`,
        create: API_ENDPOINTS.orders,
        update: (id: number) => `${API_ENDPOINTS.orders}/${id}`,
        delete: (id: number) => `${API_ENDPOINTS.orders}/${id}`,
        updateStatus: (id: number) => `${API_ENDPOINTS.orders}/${id}`,
      },

};