import Modal from "react-modal";
import { FormContext } from "../../context/FormContext";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/reducers/products";
import "./CustomModal.sass";
import App from "../../App";

const root = document.querySelector("#root") as HTMLElement;
Modal.setAppElement(root);

type CustomModalProps = {
  modalIsOpen: boolean;
  setIsOpen: Function;
  openModal: Function;
  closeModal: Function;
};

export default function CustomModal({
  modalIsOpen,
  setIsOpen,
  openModal,
  closeModal,
}: CustomModalProps) {
  const { product, setProduct, initialProduct } = useContext(FormContext);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal()}
        contentLabel="form Modal"
        overlayClassName="modalOverlay"
        className="modal"
      >
        <form action="" data-testId="modal">
          <h2>Cadastro de produto</h2>
          <div className="name">
            <label>Nome</label>
            <input
              data-testid="nome-do-produto"
              type="text"
              placeholder="Nome do produto"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div className="description">
            <label>Descrição</label>
            <input
              data-testid="descrição-do-produto"
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
              data-testid="url-da-imagem"
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
              data-testid="valor-do-produto"
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
              data-testid="quantidade-de-produtos"
              type="number"
              placeholder="Quantidade de produtos"
              onChange={(e) =>
                setProduct({ ...product, stock: parseInt(e.target.value) })
              }
            />
          </div>
          <button
            data-testid="cadastrar"
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
          <button data-testid="closaModal" onClick={() => closeModal()}>
            Sair
          </button>
        </form>
      </Modal>
    </>
  );
}
