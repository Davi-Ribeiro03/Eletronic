import React from "react";
import styles from "./InfoHome.module.sass";
import avatar from "../../img/phoneCell.png";
import { styled } from "styled-components";
import { Container } from "../Container/Container";

const InfoHome = () => {
  return (
    <Container>
      <section className={styles.containerLeft}>
        <h2>Produtos Eletronicos</h2>
        <span className={styles.descricaoDesktop}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
          voluptas reiciendis obcaecati omnis? Veritatis quod exercitationem
          eius suscipit voluptate, recusandae animi maiores rerum dicta velit,
          reiciendis impedit ea, delectus dolores.
        </span>
        <span className={styles.descricaoMobile}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </span>
      </section>

      <section className={styles.containerRight}>
        <img
          src={avatar}
          alt="Homem segurando um celular e usando fone de ouvido"
        />
      </section>
    </Container>
  );
};

export default InfoHome;
