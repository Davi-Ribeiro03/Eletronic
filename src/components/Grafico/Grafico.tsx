import React from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, Tooltip } from "recharts";
import { Bar } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { BarChart } from "recharts";
import { styled } from "styled-components";
import { ProductsType } from "../../types/ProductsType.type";

const Grafico = () => {
  function DadosGrafico() {
    const products = useSelector(
      (state: { products: ProductsType[] }) => state.products
    );

    let dados = products.map((product: ProductsType) => ({
      aparelho: product.name,
      qtdVendas: Math.round(Math.random() * 10),
    }));

    return dados;
  }

  const Grafico = styled.section``;

  return (
    <Grafico>
      <ResponsiveContainer width="100%" height={300} className="grafico">
        <BarChart
          layout="horizontal"
          data={DadosGrafico()}
          margin={{ top: 25, right: 40, left: 40, bottom: 20 }}
        >
          <XAxis dataKey="aparelho" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="qtdVendas" fill="#2a2af0" barSize={30}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </Grafico>
  );
};

export default Grafico;
