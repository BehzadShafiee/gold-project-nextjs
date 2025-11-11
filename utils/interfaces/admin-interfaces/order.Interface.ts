export interface Order {
  _id: string;
  order_type: number;
  orderProduct: string;
  weight_value: number;
  weight_unit: number;
  price_value: number;
  createdAt: Date;
  submit_product?: number;
  user_id?: string;
  user?: {
    _id: string;
    username: string;
    mobile: string;
  };
  isRegister: number
}
