import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { removeInStore } from "../../store/reducers/userInfo";
import styles from "./Navbar.module.sass";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

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
      <h1>Logo</h1>

      <div className={styles.navbar__menu}>
        <ul className={hamburguerMenuActive ? styles.ulBlock : styles.ulNone}>
          {pages.map(
            (page) =>
              location.pathname !== page.location &&
              (page.name === "Carrinho" ? (
                <Link to={page.location} key={page.name}>
                  <BsCart3 className={styles.cart} />
                </Link>
              ) : (
                <Link to={page.location} key={page.name}>
                  {page.name}
                </Link>
              ))
          )}
          <Link
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
          size={30}
          color="black"
          className={styles.navbar__menu_hamburger}
          onClick={() => toggleHamburguerMenuMode()}
        />
      </div>
    </div>
  );
};

export default Navbar;
