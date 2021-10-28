import { Category } from './category.model';
import { Brand } from './brands.model';
export interface Model {
    id: number;
    model: string;
    brand: Brand
    type: Category
}