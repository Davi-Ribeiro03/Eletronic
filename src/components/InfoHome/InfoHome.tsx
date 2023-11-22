import React from "react";
import styles from "./InfoHome.module.sass";
import avatar from "../../img/cell_phone.png";
import { styled } from "styled-components";
import { Container } from "../Container/Container";
import infinite from "../../img/infinite.png";

const InfoHome = () => {
  return (
    <div className={styles.infoHomeContainer}>
      <section className={styles.containerLeft}>
        <h2 className={styles.tituloInfoHome}>ELETRONIC</h2>
        <span className={styles.descricaoDesktop}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
          voluptas reiciendis obcaecati omnis? Veritatis quod exercitationem
          eius suscipit voluptate, recusandae animi maiores rerum dicta velit,
          reiciendis impedit ea, delectus dolores.
        </span>
        <span className={styles.descricaoMobile}>
          Lorem ipsum dolor sit amet.
        </span>
        {/* <img src={infinite} alt="" /> */}
      </section>

      <section className={styles.containerRight}>
        <div className={styles.img} />
        <div className={styles.anel} />
        {/* <img
          data-testid="img_home"
          src={avatar}
          alt="Homem segurando um celular e usando fone de ouvido"
        /> */}
      </section>
    </div>
  );
};

export default InfoHome;
