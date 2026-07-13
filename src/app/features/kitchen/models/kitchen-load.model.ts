import { KitchenAlert } from "./kitchen-alert.model";
import { KitchenLevel } from "./kitchen-level.type";

export interface KitchenLoad {

    id:number; 
    
    percentage: number;
  
    level: KitchenLevel;
  
    activeOrders: number;
  
    estimatedWait: number;
  
    alerts: KitchenAlert[];
  
  }