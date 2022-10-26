import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "./../button/MyButton";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = (e) => {
    e.preventDefault();
    setIsAuth(false);
    localStorage.removeItem('auth')
  };
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/about">О нас</Link>
        <Link to="/posts">Посты</Link>
      </div>
      <MyButton onClick={logout}>Выйти</MyButton>
    </div>
  );
};

export default Navbar;
