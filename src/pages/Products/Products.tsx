import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
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

Modal.setAppElement("#root");

const Products = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const products = useSelector(
    (state: { products: ProductsType[] }) => state.products
  );
  const dispatch = useDispatch();
  const { product, setProduct, initialProduct } = useContext(FormContext);
  const navigate = useNavigate();
  const userInfo = useSelector(
    (state: { userInfo: UserDataType }) => state.userInfo
  );

  useEffect(() => {
    if (userInfo.role === "") {
      navigate("/ErrorPage");
    }
  }, []);

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
        <div key={product.id} className="product">
          <h3>Produto: {product.name}</h3>
          <strong>Valor: R${product.value}</strong>
          <p>{product.description}</p>
          {/* <img src={product.image} alt="" /> */}
          <AiFillCloseCircle
            color="red"
            className="close"
            onClick={() => dispatch(removeProduct(product.id))}
          />
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="form Modal"
        overlayClassName="modalOverlay"
        className="modal"
      >
        <form action="">
          <h2>Cadastro de produto</h2>
          <div className="name">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome do produto"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div className="description">
            <label>Descrição</label>
            <input
              type="text"
              placeholder="Descrição do produto"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          <div className="image">
            <label>Imagem</label>
            <input
              type="text"
              placeholder="Url da imagem"
              onChange={(e) => {
                setProduct({ ...product, image: e.target.value });
              }}
            />
          </div>
          <div className="value">
            <label>Valor</label>
            <input
              type="number"
              placeholder="Valor do produto"
              onChange={(e) =>
                setProduct({ ...product, value: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="quantidade">
            <label>Quantidade de produtos</label>
            <input
              type="number"
              placeholder="quantidade de produtos"
              onChange={(e) =>
                setProduct({ ...product, stock: parseInt(e.target.value) })
              }
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (product.name !== "") {
                dispatch(addProduct(product));
                setProduct({ ...initialProduct });
                closeModal();
              }
            }}
          >
            Cadastrar
          </button>
          <button onClick={closeModal}>Sair</button>
        </form>
      </Modal>

      <button className="button-cadastrar" onClick={openModal}>
        Cadastrar novo produto
      </button>
    </div>
  );
};

export default Products;
