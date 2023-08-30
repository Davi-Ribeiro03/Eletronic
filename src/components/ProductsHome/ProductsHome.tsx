import React, { useState } from "react";
import styles from "./ProductsHome.module.sass";
import { useSelector } from "react-redux";
import { ProductsType } from "../../types/ProductsType.type";
import { BsCartPlusFill, BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  addProductInCart,
  changeProductInCart,
  removeProductFromCart,
} from "../../store/reducers/products";
import Toast from "../Toast/Toast";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillCheckCircle,
} from "react-icons/ai";

const iconsProps = {
  size: 35,
  color: "white",
  cursor: "pointer",
};

const ProductsHome = () => {
  const products = useSelector(
    (state: { products: ProductsType[] }) => state.products
  );
  const dispatch = useDispatch();
  const [clickCart, setClickCart] = useState(false);
  const [indexProduct, setIndexProduct] = useState<number>(0);

  return (
    <div className={styles.productsContainer}>
      {products.map((product, index) => (
        <div className={styles.product} key={product.id}>
          <img src={product.image} />
          <p>{product.description}</p>
          <strong>R$:{product.value},00</strong>
          <span className={styles.carrinho}>
            {product.productInCart === true ? (
              <BsCartPlusFill
                onClick={() =>
                  dispatch(changeProductInCart([product.id, false]))
                }
              />
            ) : (
              <BsCartPlus
                onClick={() => {
                  dispatch(changeProductInCart([product.id, true]));
                  dispatch(addProductInCart(product.id));
                  setClickCart(true);
                  setIndexProduct(index);
                }}
              />
            )}
            {clickCart && (
              <Toast color="white" barra={false}>
                <div className={styles.toastInfo}>
                  <section className={styles.toastProduct}>
                    <h2>{products[indexProduct].name}</h2>
                  </section>

                  <section className={styles.toastQtd}>
                    <AiOutlinePlus
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
                          dispatch(addProductInCart(products[indexProduct].id));
                        }
                      }}
                    />
                    <span>{products[indexProduct].qtInCart}</span>
                    <AiOutlineMinus
                      {...iconsProps}
                      style={{
                        backgroundColor: "#20d013",
                        borderRadius: "30px",
                      }}
                      onClick={() => {
                        if (products[indexProduct].qtInCart > 0) {
                          dispatch(
                            removeProductFromCart(products[indexProduct].id)
                          );
                        }
                      }}
                    />

                    <AiFillCheckCircle
                      size={30}
                      onClick={() => {
                        if (products[indexProduct].qtInCart !== 0)
                          setClickCart(false);
                      }}
                    />
                  </section>
                </div>
              </Toast>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductsHome;
