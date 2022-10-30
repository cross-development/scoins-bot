// Packages
import { Request } from 'express';
// Interfaces and types
import { IProduct } from './product.interfaces';

interface IBotData {
  queryId: string;
  products: IProduct[];
  totalPrice: number;
}

export interface IBotRequest extends Request {
  body: IBotData;
}
