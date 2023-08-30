import { useSelector } from "react-redux";
import { ProductsType } from "../../types/ProductsType.type";
import "./Tabela.sass";

function ProductsInfo() {
  const products = useSelector(
    (state: { products: ProductsType[] }) => state.products
  );

  return products;
}

function Tabela() {
  return (
    <section className="table">
      <thead>
        <tr>
          <th>Aparelho</th>
          <th>Estoque</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {ProductsInfo().map((product: ProductsType, index: number) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.stock}</td>
            <td>R${product.value}</td>
          </tr>
        ))}
      </tbody>
    </section>
  );
}

export default Tabela;
