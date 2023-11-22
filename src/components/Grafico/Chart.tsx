import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { initialState } from "../../store/reducers/products";
import { dadosDoGrafico } from "../../utils/dadosDoGrafico";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Quantidade de vendas",
    },
  },
};

const labels = dadosDoGrafico();

export const data = {
  labels,
  datasets: [
    {
      label: "Quantidade",
      data: labels.map(() => faker.number.int({ min: 0, max: 5 })),
      backgroundColor: "#2a2af0",
      borderWidth: 5,
    },
  ],
};

export function Chart() {
  return (
    <div
      className="grafico"
      style={{
        width: "80%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Bar
        style={{ width: "200px", color: "white" }}
        options={options}
        data={data}
        data-testid="chart"
      />
    </div>
  );
}
