import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { removeInStore } from "../../store/reducers/userInfo";
import styles from "./Navbar.module.sass";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../../img/logo.png";

const Navbar = () => {
  const pages = [
    { name: "Home", location: "/Home" },
    { name: "Dashboard", location: "/Dashboard" },
    { name: "Products", location: "/Products" },
    { name: "Carrinho", location: "/Carrinho" },
  ];
  const location = useLocation();
  const dispatch = useDispatch();
  const [hamburguerMenuActive, setHamburguerMenuActive] = useState(false);

  function toggleHamburguerMenuMode() {
    setHamburguerMenuActive(!hamburguerMenuActive);
  }

  return (
    <div className={styles.container}>
      {/* <img src={logo} alt="logoMarca" /> */}
      <h1>Logo</h1>

      <div className={styles.navbar__menu}>
        <ul className={hamburguerMenuActive ? styles.ulBlock : styles.ulNone}>
          {pages.map(
            (page) =>
              location.pathname !== page.location &&
              (page.name === "Carrinho" ? (
                <Link
                  to={page.location}
                  key={page.name}
                  data-testid="linkNavigate"
                >
                  <BsCart3 className={styles.cart} />
                </Link>
              ) : (
                <Link
                  to={page.location}
                  key={page.name}
                  data-testid="linkNavigate"
                >
                  {page.name}
                </Link>
              ))
          )}
          <Link
            data-testid="logout"
            to={"/"}
            onClick={() => {
              dispatch(removeInStore());
              localStorage.removeItem("userDataJson");
            }}
            className={styles.logout}
          >
            Logout
          </Link>
        </ul>

        <AiOutlineMenu
          data-testid="menu_hamburguer"
          size={30}
          color="white"
          className={styles.navbar__menu_hamburger}
          onClick={() => toggleHamburguerMenuMode()}
        />
      </div>
    </div>
  );
};

export default Navbar;
