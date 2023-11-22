import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import carrinho from "../../img/Carrinho.png";
import { Container } from "../../components/Container/Container";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { ProductsType } from "../../types/ProductsType.type";
import ProductsCart from "../../components/ProductsCart/ProductsCart";
import { removeAllOfTheCart } from "../../store/reducers/products";
import { useDispatch } from "react-redux";
import styles from "./Carrinho.module.sass";
import { CartContext } from "../../context/CartContext";
import Toast from "../../components/Toast/Toast";
import { createPortal } from "react-dom";
import { ToastContext } from "../../context/ToastContext";
import { timeToast } from "../../utils/timeToast";
import { FaCheck } from "react-icons/fa";

const ContainerGeral = styled.div`
  height: 100vh;
  position: relative;
  overflow: auto;
`;

const ImgEstilizada = styled.img`
  width: 300px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const H1 = styled.h1`
  color: rgb(10, 59, 108);
  font-size: 50px;
  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 767px) {
    flex-direction: row;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
  }
`;

const BotaoComprar = styled.button`
  width: 30%;
  height: 50px;
  border-radius: 10px;
  font-weight: bolder;
  background-color: #41ff33df;
  cursor: pointer;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 576px) {
    width: 60%;
    gap: 5px;
  }
`;

// const CompraRealizada = styled.h1`
//   text-align: center;
//   color: green;
//   margin: 20px auto;
//   text
// `;

const Carrinho = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: { products: ProductsType[] }) => state.products
  );
  const { toastActive, setToastActive } = useContext(ToastContext);

  useEffect(() => {
    if (toastActive === true) {
      const timeout = timeToast({ setToastActive });
      return () => clearTimeout(timeout);
    }
  }, [toastActive]);

  return (
    <ContainerGeral>
      <Navbar />
      {/* <Container>
        <Section>
          <H1>Carrinho</H1>
          <H1>de</H1>
          <H1>Compras</H1>
        </Section>
        <ImgEstilizada src={carrinho} alt="Carrinho de compras" />
      </Container> */}

      <div className={styles.tituloCart}>
        <img src={carrinho} alt="Carrinho de compras" />
        <h3>Carrinho de compras</h3>
      </div>

      <ProductsCart />
      {toastActive === true &&
        createPortal(
          <Toast color="#20d013" barra={true}>
            Compra realizada com sucesso
          </Toast>,
          document.body
        )}
      <Section>
        <BotaoComprar
          data-testid="botaoComprar"
          disabled={
            products.some((product) => product.productInCart === true) === false
              ? true
              : false
          }
          onClick={() => {
            dispatch(removeAllOfTheCart());
            setToastActive(true);
          }}
        >
          Finalizar compra
          <FaCheck color="white" />
        </BotaoComprar>
      </Section>
    </ContainerGeral>
  );
};

export default Carrinho;
