import { initialState } from "../store/reducers/products";

export function dadosDoGrafico(){
    const labels:string[] = []
    
    initialState.forEach((product) => {
    labels.push(product.name);
  });

  return labels

}