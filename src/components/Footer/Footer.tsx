import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer} data-testid="footer">
      <h3>Developed by Davi Ribeiro</h3>
    </div>
  );
};

export default Footer;
