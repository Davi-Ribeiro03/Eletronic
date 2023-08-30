import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsType } from "../../types/ProductsType.type";
import { styled } from "styled-components";
import styles from "./ProductsCart.module.sass";
import { AiFillUpCircle, AiFillDownCircle } from "react-icons/ai";
import {
  addProductInCart,
  removeProductFromCart,
} from "../../store/reducers/products";

const iconsProps = {
  size: 35,
  color: "blue",
  cursor: "pointer",
};

const ProductsCart = () => {
  const products = useSelector(
    (state: { products: ProductsType[] }) => state.products
  );
  const dispatch = useDispatch();

  function calculaTotal() {
    let total = 0;
    products.map(
      (product: ProductsType) => (total += product.qtInCart * product.value)
    );

    return total;
  }

  return (
    <div className={styles.container}>
      <section className={styles.titulo}>
        <h2 className={styles.productTitle}>produto</h2>
        <h2 className={styles.quantidade}>quantidade</h2>
        <h2 className={styles.valor}>Valor</h2>
      </section>

      {products.map(
        (product: ProductsType) =>
          product.productInCart === true && (
            <div className={styles.product} key={product.id}>
              <section className={styles.productImg}>
                <img src={product.image} alt={`Imagem de ${product.name}`} />
              </section>
              <section className={styles.qtdAndValue}>
                <section className={styles.qtdButton}>
                  <AiFillUpCircle
                    {...iconsProps}
                    onClick={() => {
                      dispatch(addProductInCart(product.id));
                    }}
                  />
                  <span>{product.qtInCart}</span>
                  <AiFillDownCircle
                    {...iconsProps}
                    onClick={() => dispatch(removeProductFromCart(product.id))}
                  />
                </section>
                <h2>R${product.value}</h2>
              </section>
            </div>
          )
      )}

      {calculaTotal() !== 0 && (
        <div className={styles.valorTotal}>
          <h2>Total:</h2>
          <h2>{calculaTotal()}</h2>
        </div>
      )}

      {products.some(
        (product: ProductsType) => product.productInCart === true
      ) === false && (
        <h1 className={styles.emptyCart}>
          Não Possui produtos no carrinho {":("}
        </h1>
      )}
    </div>
  );
};

export default ProductsCart;
