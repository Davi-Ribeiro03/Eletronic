import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserDataType } from "../../types/UserDataType";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Dashboard.module.sass";
import DashboardInfo from "../../components/DashboardInfo/DashboardInfo";
import { ProductsType } from "../../types/ProductsType.type";
import Grafico from "../../components/Grafico/Grafico";
import { styled } from "styled-components";
import Tabela from "../../components/Tabela/Tabela";
import { Chart } from "../../components/Grafico/Chart";
import { calculaValorTotal } from "../../utils/calculaValorTotal";
import { verificaRoleAdmin } from "../../utils/verificaRole";

const H1 = styled.h1`
  color: white;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo, products } = useSelector(
    (state: { userInfo: UserDataType; products: ProductsType[] }) => {
      return {
        userInfo: state.userInfo,
        products: state.products,
      };
    }
  );

  const productsValue = calculaValorTotal(products);

  useEffect(() => {
    !verificaRoleAdmin(userInfo.role) && navigate("/ErrorPage");
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      <div className={styles.dashboardInfo}>
        <H1 data-testid="dashboard">Dashboard</H1>
        <section className={styles.cardAndTable}>
          <div className={styles.infoCards}>
            <DashboardInfo
              titulo="Quantidade de produtos"
              quantidade={products.length}
            />
            <DashboardInfo
              titulo="Valor total de produtos em reais"
              value={productsValue}
            />
          </div>
          <Tabela />
        </section>

        <Chart />
        {/* <div style={{ width: "80%", height: "300px" }}>
          <Grafico />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
