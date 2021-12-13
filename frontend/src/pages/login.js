import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import RecipesList from "../components/RecipesList"
import SEO from "../components/SEO"

const Login = ({ data }) => {
  // const recipes = data.allContentfulRecipe.nodes
  return (
    <Layout>
      <SEO title="Contact" />
      <main className="page">
        <section className="contact-page">
          <article className="contact-info">
            <p><h6> A recipe has no soul. You, as the cook, must bring soul to the recipe.</h6></p>
            <p><h2> -Thomas Keller </h2> </p>
          </article>
          <article>
            <form className="form contact-form">
              <div className="form-row">
                <label className="form-label">User Name</label>
                <input type="text" name="name" id="name_login" className="form-input"/>
              </div>
              <div className="form-row">
                <label className="form-label">User Password</label>
                <input type="password" name="password" id="password_login" className="form-input"/>
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

export default Login
