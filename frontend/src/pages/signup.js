import React, { useState } from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import SEO from "../components/SEO"

import axios from 'axios'

const Signup = ({ data }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("MALE");
  const [invalid, setInvalid] = useState(false);

  let errMsg = "";
  const handleSignUp = (event) => {
    event.preventDefault();

    if (password !== password2) {
      setInvalid(true);
      return;
    }
    
    let json = {
      UserId: 100,
      UserName: name,
      UserPassword: password,
      Gender: gender,
      EmailAddress: email
    };
    axios.post("http://localhost:4000/api/users/", json)
    .then((res) => {
      console.log(res);
      window.location = "/login";
    })
    .catch((error) => {
      console.log(error);
      setInvalid(true);
    });
  };

  if (invalid) {
    errMsg = "Registration Failure";
  }

  return (
    <Layout>
      <SEO title="Contact" />
      <main className="page">
        <section className="contact-page">
          <article className="contact-info">
            <h1>Welcome!</h1>
            <h4> Thanks for joining us!</h4>
          </article>
          <article>
            <form className="form contact-form" onSubmit={handleSignUp}>
              <div className="err-msg">
                {errMsg}
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="name">User Name</label>
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} id="name" className="form-input" required/>
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="password1">User Password</label>
                <input type="text" name="password1" id="password1" value={password} onChange={e=> setPassword(e.target.value)} className="form-input" required/>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="password2">Repeat Password</label>
                <input type="text" name="password2" value={password2} onChange={e=> setPassword2(e.target.value)} id="password2" className="form-input" required/>
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" repeat/>
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="gender">Gender</label>
                <select className="form-input" id="gender" name = "registerGender" value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
              </div>
              <button id="signup" type="submit" className="btn btn-block">
                Create Account
              </button>
            </form>
          </article>
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulRecipe(
      sort: { fields: title, order: ASC }
      filter: { featured: { eq: true } }
    ) {
      nodes {
        id
        title
        cookTime
        prepTime
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  }
`

export default Signup
