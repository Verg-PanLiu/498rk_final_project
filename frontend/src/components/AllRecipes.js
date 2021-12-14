import React, { useState, useEffect } from "react"
import TagsList from "./TagsList"
import RecipesList from "./RecipesList"

const AllRecipes = () => {
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
      <TagsList recipeList={recipeList} />
      <RecipesList recipeList={recipeList} />
    </section>
  )
}

export default AllRecipes
