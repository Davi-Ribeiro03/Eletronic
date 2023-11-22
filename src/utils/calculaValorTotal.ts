import { ProductsType } from "../types/ProductsType.type";

export function calculaValorTotal(products:ProductsType[]) {
  let productsValue = 0;

  if(Array.isArray(products)){
    products.forEach((product) => {
      productsValue += product.value * product.stock;
    });  
  }

  return productsValue;
}