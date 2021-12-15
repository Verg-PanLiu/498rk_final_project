import React, {useState} from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

import axios from 'axios'
import { useCookies } from "react-cookie";

const Login = ({ data }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [cookies, setCookie] = useCookies({});

  let errMsg = "";
  const handleLogin = (event) => {
    event.preventDefault();

    let json = {userName: name, userPassword: password};
    axios.post("http://localhost:4000/api/users/login", json)
    .then((res) => {
      setCookie("hasLogin", "true", {path: "/"});
      window.location = "/";
    })
    .catch((error) => {
      console.log(error);
      setCookie("hasLogin", "false", {path: "/"});
      setInvalid(true);
    })
  };

  if (invalid) {
    errMsg = "Invalid Username or Password";
  }

  // const recipes = data.allContentfulRecipe.nodes
  return (
    <Layout>
      <SEO title="Contact" />
      <main className="page">
        <section className="contact-page">
          <article className="contact-info">
            <h6> A recipe has no soul. You, as the cook, must bring soul to the recipe.</h6>
            <h2> -Thomas Keller </h2>
          </article>
          <article>
            <form className="form contact-form" onSubmit={handleLogin}>
              <div className="err-msg">
                {errMsg}
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="name">User Name</label>
                <input type="text" name="name" id="name_login" value={name} onChange={e => setName(e.target.value)} className="form-input"/>
              </div>
              <div className="form-row">
                <label className="form-label" htmlfor="password">User Password</label>
                <input type="password" name="password" id="password_login" value={password} onChange={e => setPassword(e.target.value)} className="form-input"/>
              </div>
              <button id="login" type="submit" className="btn btn-block">
                Log in
              </button>
            </form>
          </article>
        </section>
      </main>
    </Layout>
  )
};

export default Login;
