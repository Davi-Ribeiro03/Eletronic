import React, { useEffect, useState } from "react";
import styles from "./ProductsHome.module.sass";
import { useSelector } from "react-redux";
import { ProductsType } from "../../types/ProductsType.type";
import { BsCartPlusFill, BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  addProductInCart,
  changeProductInCart,
  reduceProductFromCart,
  removeProductFromCart,
} from "../../store/reducers/products";
import Toast from "../Toast/Toast";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillCheckCircle,
} from "react-icons/ai";
import { createPortal } from "react-dom";

const home = document.querySelector(".home");

const iconsProps = {
  size: 35,
  color: "white",
  cursor: "pointer",
};

type ClickCart = {
  click: boolean;
  id?: string;
};

const ProductsHome = () => {
  const products = useSelector(
    (state: { products: ProductsType[] }) => state.products
  );
  const dispatch = useDispatch();
  const [clickCart, setClickCart] = useState<ClickCart>({
    click: false,
  });
  const [indexProduct, setIndexProduct] = useState<number>(0);

  return (
    <div className={styles.productsContainer}>
      {products.map((product, index) => (
        <div className={styles.product} key={product.id}>
          <img src={product.image} />
          <h3 className={styles.nameProduct}>{product.name}</h3>
          <p data-testid="description" className={styles.descriptionProduct}>
            {product.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
          <p
            data-testid="descriptionMobile"
            className={styles.descriptionProductMobile}
          >
            {product.description}
          </p>
          <strong className={styles.valor}>R$:{product.value},00</strong>
          <span className={styles.carrinho}>
            {product.productInCart === true ? (
              <BsCartPlusFill
                data-testid="tiraDoCarrinho"
                onClick={() => {
                  dispatch(changeProductInCart([product.id, false]));
                  setClickCart({ click: false });
                }}
              />
            ) : (
              <BsCartPlus
                data-testid="adicionaNoCarrinho"
                onClick={() => {
                  if (clickCart.click !== true) {
                    dispatch(changeProductInCart([product.id, true]));
                    dispatch(addProductInCart(product.id));
                    setClickCart({ click: true, id: product.id });
                    setIndexProduct(index);
                  }
                }}
              />
            )}
            {clickCart.click &&
              clickCart.id === product.id &&
              createPortal(
                <Toast color="white" barra={false}>
                  <div
                    className={styles.toastInfo}
                    data-testid="toastProductQtd"
                  >
                    <section className={styles.toastProduct}>
                      <h2 data-testid="nameProductInToast">
                        {products[indexProduct].name}
                      </h2>
                    </section>

                    <section className={styles.toastQtd}>
                      <AiOutlinePlus
                        data-testid="aumentaQtdNoToast"
                        {...iconsProps}
                        style={{
                          backgroundColor: "#20d013",
                          borderRadius: "30px",
                        }}
                        onClick={() => {
                          if (
                            products[indexProduct].qtInCart <
                            products[indexProduct].stock
                          ) {
                            dispatch(
                              addProductInCart(products[indexProduct].id)
                            );
                          }
                        }}
                      />
                      <span data-testid="qtdInCart">
                        {products[indexProduct].qtInCart}
                      </span>
                      <AiOutlineMinus
                        data-testid="diminuiQtdNoToast"
                        {...iconsProps}
                        style={{
                          backgroundColor: "#20d013",
                          borderRadius: "30px",
                        }}
                        onClick={() => {
                          if (products[indexProduct].qtInCart > 1) {
                            dispatch(
                              reduceProductFromCart(products[indexProduct].id)
                            );
                          }
                        }}
                      />

                      <AiFillCheckCircle
                        {...iconsProps}
                        data-testid="botaoConfirmar"
                        size={30}
                        onClick={() => {
                          if (products[indexProduct].qtInCart !== 0)
                            setClickCart({ click: false });
                        }}
                      />
                    </section>
                  </div>
                </Toast>,
                document.body
              )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductsHome;
