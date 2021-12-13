import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import RecipesList from "../components/RecipesList"
import SEO from "../components/SEO"

const Signup = ({ data }) => {
  // const recipes = data.allContentfulRecipe.nodes
  return (
    <Layout>
      <SEO title="Contact" />
      <main className="page">
        <section className="contact-page">
          <article className="contact-info">
            <h1>Welcome!</h1>
            <p><h4> Thanks for joining us!</h4></p>
          </article>
          <article>
            <form className="form contact-form">
              <div className="form-row">
                <label className="form-label">User Name</label>
                <input type="text" name="name" id="name" className="form-input"/>
              </div>
              <div className="form-row">
                <label className="form-label">User Password</label>
                <input type="text" name="password1" id="password1" className="form-input"/>
              </div>
              <div className="form-row">
                <label className="form-label">Repeat Password</label>
                <input type="text" name="password2" id="password2" className="form-input"/>
              </div>
              <div className="form-row">
                <label className="form-label">Email (Optional)</label>
                <input type="text" name="email" id="email" className="form-input"/>
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
