import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import setupTags from "../utils/setupTags"
import slugify from "slugify"
import SEO from "../components/SEO"

const Tags = () => {
  let endpoint = "https://tiramisu-backend.herokuapp.com/api/recipes"
  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setRecipeList(resultData.data)
      })
  }, [])

  const newTags = setupTags(recipeList)

  return (
    <Layout>
      <SEO title="Tags" />
      <main className="page">
        <section className="tags-page">
          {newTags.map((tag, index) => {
            const [text, value] = tag
            const slug = slugify(text, { lower: true })

            return (
              <Link to={`/tags/${slug}`} key={index} className="tag">
                <h5>{text}</h5>
                <p>{value} recipe</p>
              </Link>
            )
          })}
        </section>
      </main>
    </Layout>
  )
}
export default Tags
