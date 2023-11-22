import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./Products.sass";
import { useSelector, useDispatch } from "react-redux";
import { ProductsType } from "../../types/ProductsType.type";
import { addProduct, removeProduct } from "../../store/reducers/products";
import { AiFillCloseCircle } from "react-icons/ai";
import { FormContext } from "../../context/FormContext";
import { UserDataType } from "../../types/UserDataType";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CustomModal from "../../components/Modal/CustomModal";
import Modal from "react-modal";

const root = document.querySelector("#root") as HTMLElement;
Modal.setAppElement(root);

const Products = () => {
  const products = useSelector(
    (state: { products: ProductsType[] }) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(
    (state: { userInfo: UserDataType }) => state.userInfo
  );
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container">
      <Navbar />

      {products.map((product) => (
        <div key={product.id} className="product" data-testid="products">
          <h3 data-testid="productsName">Produto: {product.name}</h3>
          <strong>Valor: R${product.value}</strong>
          <p>{product.description}</p>
          {/* <img src={product.image} alt="" /> */}
          <AiFillCloseCircle
            data-testid="removeProduct"
            color="red"
            className="close"
            onClick={() => dispatch(removeProduct(product.id))}
          />
        </div>
      ))}

      <CustomModal
        data-testid="modal"
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      <button
        data-testid="cadastrar-produto"
        className="button-cadastrar"
        onClick={() => openModal()}
      >
        Cadastrar novo produto
      </button>
    </div>
  );
};

export default Products;
