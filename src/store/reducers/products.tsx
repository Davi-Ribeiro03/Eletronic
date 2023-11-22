import { createSlice } from "@reduxjs/toolkit";
import { ProductsType } from "../../types/ProductsType.type";
import celular from "../../img/celular.png";
import fone from "../../img/fone.png";
import notebook from "../../img/notebook.png";
import tvBox from "../../img/tv_box.png";
import { v4 as uuid } from "uuid";

export let initialState: ProductsType[] = [
  {
    id: uuid(),
    name: "celular",
    image: celular,
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 2000,
    stock: 5,
    qtInCart: 0,
  },
  {
    id: uuid(),
    name: "fone",
    image: fone,
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 150,
    stock: 5,
    qtInCart: 0,
  },
  {
    id: uuid(),
    name: "notebook",
    image: notebook,
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 4500,
    stock: 5,
    qtInCart: 0,
  },
  {
    id: uuid(),
    name: "tv-box",
    image: tvBox,
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 800,
    stock: 5,
    qtInCart: 0,
  },
  {
    id: uuid(),
    name: "tv-box",
    image: tvBox,
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 800,
    stock: 5,
    qtInCart: 0,
  },
];

let registeredProducts = localStorage.getItem("products");

if (registeredProducts !== null) {
  const registeredProductsArray = JSON.parse(registeredProducts);

  // if (registeredProducts.length !== initialState.length)
  initialState = registeredProductsArray;
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, { payload }) {
      state = [...state, { ...payload }];
      localStorage.setItem("products", JSON.stringify(state));

      return state;
    },
    removeProduct(state, { payload }) {
      state = state.filter((product: ProductsType) => product.id !== payload);
      localStorage.setItem("products", JSON.stringify(state));

      return state;
    },
    changeProductInCart(state, { payload }) {
      state.map((product, index) => {
        if (product.id === payload[0]) {
          state[index].productInCart = payload[1];
        }
      });
      localStorage.setItem("products", JSON.stringify(state));
      return state;
    },
    removeAllOfTheCart(state) {
      state.map((product) => {
        product.productInCart = false;
        product.qtInCart = 0;
      });
      localStorage.setItem("products", JSON.stringify(state));
      return state;
    },
    addProductInCart(state, { payload }) {
      console.log(payload);
      state.map((product, index) => {
        if (product.id === payload) {
          ++state[index].qtInCart;
        }
      });

      localStorage.setItem("products", JSON.stringify(state));
      return state;
    },
    reduceProductFromCart(state, { payload }) {
      state.map((product, index) => {
        if (product.id === payload) {
          --state[index].qtInCart;
        }
      });
    },

    removeProductFromCart(state, { payload }) {
      state.map((product, index) => {
        if (product.id === payload) {
          state[index].productInCart = false;
          state[index].qtInCart = 0;
        }
      });

      localStorage.setItem("products", JSON.stringify(state));
      return state;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  changeProductInCart,
  removeAllOfTheCart,
  addProductInCart,
  removeProductFromCart,
  reduceProductFromCart,
} = productsSlice.actions;
export default productsSlice.reducer;
