import { keyframes } from "styled-components";
import React, { ReactNode } from "react";
import { styled } from "styled-components";
import styles from "./Toast.module.sass";

// const ToastEstilizado = styled.div`
//   display: flex;
//   flex-direction: column-reverse;
//   align-items: center;
//   background-color: #e6e6e6;
//   position: absolute;
//   border-radius: 10px;
//   top: 150px;
//   right: 5px;
// `;

// const ContentToast = styled.section`
//   width: 250px;
//   height: 70px;
//   border-radius: 10px;
//   box-shadow: 0px 0px 5px 0px black;
//   font-size: 20px;
//   position: relative;
//   color: ${(props) => props.color};
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1rem;
//   background-color: rgb(10, 59, 108);
// `;
// const barra = keyframes`
//   from{width: 250px};
//   to{width: 0px};
// `;

// const Barra = styled.div`
//   position: absolute;
//   bottom: 0px;
//   left: 4px;
//   width: 240px;
//   border-radius: 2px;
//   background-color: ${(props) => props.color};
//   height: 5px;
//   animation: ${barra} 3.2s 1;
// `;

const Toast = ({
  children,
  color,
  barra,
}: {
  children: ReactNode;
  color: string;
  barra: boolean;
}) => {
  return (
    <div className={styles.ToastEstilizado} data-testid="toast">
      <section
        className={styles.ContentToast}
        color={color}
        data-testid="textToast"
      >
        {children}
      </section>
      {barra === true && (
        <div
          data-testid="toastBarra"
          className={styles.Barra}
          color={color}
          style={{ backgroundColor: `${color}` }}
        />
      )}
    </div>
  );
};

export default Toast;
