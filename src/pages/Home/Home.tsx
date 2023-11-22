import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDataType } from "../../types/UserDataType";
import styles from "./Home.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import InfoHome from "../../components/InfoHome/InfoHome";
import ProductsHome from "../../components/ProductsHome/ProductsHome";

const Home = () => {
  return (
    <div className={styles.home} id="home">
      <Navbar />
      <InfoHome />
      <ProductsHome />
    </div>
  );
};

export default Home;
