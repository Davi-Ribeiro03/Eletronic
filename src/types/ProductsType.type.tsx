export type ProductsType = {
  id: string;
  name: string;
  image: string;
  description: string;
  value: number;
  productInCart?: boolean;
  stock: number;
  qtInCart: number;
};
