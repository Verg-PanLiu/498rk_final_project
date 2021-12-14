// import React from "react"
import React, { useState, useEffect } from "react"
import TagsList from "./TagsList"
import RecipesList from "./RecipesList"
import { graphql, useStaticQuery } from "gatsby"
const query = graphql`
  {
    allContentfulRecipe(sort: { fields: title, order: ASC }) {
      nodes {
        id
        title
        cookTime
        prepTime
        content {
          tags
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`
const AllRecipes = () => {
  const data = useStaticQuery(query)
  const recipes = data.allContentfulRecipe.nodes

  let endpoint = "http://localhost:4000/api/recipes"
  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
          setRecipeList(resultData.data)
      })
  }, [])

  return (
    <section className="recipes-container">
      <TagsList recipes={recipes} />
      <RecipesList recipeList={recipeList} />
    </section>
  )
}

export default AllRecipes
