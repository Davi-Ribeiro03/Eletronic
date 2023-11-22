import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsType } from "../../types/ProductsType.type";
import { styled } from "styled-components";
import styles from "./ProductsCart.module.sass";
import { AiFillUpCircle, AiFillDownCircle } from "react-icons/ai";
import {
  addProductInCart,
  reduceProductFromCart,
  removeProductFromCart,
} from "../../store/reducers/products";
import { AiFillCloseCircle } from "react-icons/ai";

const iconsProps = {
  size: 35,
  color: "white",
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
        <h2 className={styles.productTitle}>Produto</h2>
        <h2 className={styles.quantidade}>Quantidade</h2>
        <h2 className={styles.valor}>Valor</h2>
        <h2 className={styles.subtotal}>Subtotal</h2>
      </section>

      {products.map(
        (product: ProductsType) =>
          product.productInCart === true && (
            <div
              className={styles.product}
              key={product.id}
              data-testid="productsInCart"
            >
              <section className={styles.productImg}>
                <img src={product.image} alt={`Imagem de ${product.name}`} />
              </section>
              <section className={styles.qtdButton}>
                <AiFillUpCircle
                  data-testid="aumenta_qtd"
                  {...iconsProps}
                  onClick={() => {
                    if (product.qtInCart < product.stock) {
                      dispatch(addProductInCart(product.id));
                    }
                  }}
                />
                <span data-testid="quantidade">{product.qtInCart}</span>
                <AiFillDownCircle
                  data-testid="diminui_qtd"
                  {...iconsProps}
                  onClick={() => {
                    if (product.qtInCart > 1)
                      dispatch(reduceProductFromCart(product.id));
                  }}
                />
              </section>
              <h2 className={styles.valor}>R${product.value}</h2>
              <h2 className={styles.subtotal}>
                R${product.qtInCart * product.value}
              </h2>

              <AiFillCloseCircle
                size="20"
                className={styles.removeInCart}
                onClick={() => dispatch(removeProductFromCart(product.id))}
              />
            </div>
          )
      )}

      {calculaTotal() !== 0 && (
        <div className={styles.valorTotal} data-testid="valor_total">
          <h2>Total:</h2>
          <h2>{calculaTotal()}</h2>
        </div>
      )}

      {products.some(
        (product: ProductsType) => product.productInCart === true
      ) === false && (
        <h1 className={styles.emptyCart} data-testid="carrinho_vazio">
          Não Possui produtos no carrinho {":("}
        </h1>
      )}
    </div>
  );
};

export default ProductsCart;
