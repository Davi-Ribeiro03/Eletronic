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

const H1 = styled.h1`
  color: #083860;
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

  let productsValue = 0;
  products.forEach((product) => {
    productsValue += product.value;
  });

  useEffect(() => {
    if (userInfo.role !== "admin") {
      navigate("/ErrorPage");
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      <div className={styles.dashboardInfo}>
        <H1>Dashboard</H1>
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

        <Grafico />
      </div>
    </div>
  );
};

export default Dashboard;
