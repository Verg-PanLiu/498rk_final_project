import React, { useState } from "react"
import { Link } from "gatsby"
import { FiAlignJustify } from "react-icons/fi"
import logo from "../assets/images/logo3.png"

import { useCookies } from "react-cookie";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [cookies, setCookie] = useCookies(["login"]);
  let login = cookies.hasLogin === "true" ? true : false;

  const logoff = () => {
    setCookie("hasLogin", "false", {path: "/"});
    window.location.reload();
  };

  let content = <div className="nav-link contact-link">
                  <Link to="/signup" className="btn" onClick={() => setShow(false)}>
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn" onClick={() => setShow(false)}>
                    Log In
                  </Link>
                </div>;
  if (login) {
    content = <div className="nav-link contact-link">
                <Link to="/" className="btn" onClick={() => logoff()}>
                  Log Off
                </Link>
              </div>
  }

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="simply recipes" />
          </Link>
          <button className="nav-btn" onClick={() => setShow(!show)}>
            <FiAlignJustify />
          </button>
        </div>
        <div className={show ? "nav-links show-links" : "nav-links"}>
          <Link
            to="/"
            className="nav-link"
            activeClassName="active-link"
            onClick={() => setShow(false)}
          >
            home
          </Link>
          <Link
            to="/recipes"
            className="nav-link"
            activeClassName="active-link"
            onClick={() => setShow(false)}
          >
            recipes
          </Link>
          <Link
            to="/tags"
            className="nav-link"
            activeClassName="active-link"
            onClick={() => setShow(false)}
          >
            tags
          </Link>

          {login && <Link to="/addrecipe" className="nav-link" activeClassName="active-link" onClick={() => setShow(false)}> Add Recipes </Link>}

          {content}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
