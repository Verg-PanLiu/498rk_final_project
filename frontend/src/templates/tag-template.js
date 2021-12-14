import React, {useEffect, useState} from "react"
import RecipesList from "../components/RecipesList"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const TagTemplate = ({pageContext}) => {

  let endpoint = `http://localhost:4000/api/recipes?where={"Category": "${pageContext.tag}"}`;
  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
          setRecipeList(resultData.data)
      })
  }, [])

  return (
    <Layout>
      <SEO title={pageContext.tag} />
      <main className="page">
        <h3>{pageContext.tag}</h3>
        <div className="tag-recipes">
          <RecipesList recipeList={recipeList} />
        </div>
      </main>
    </Layout>
  )
}

export default TagTemplate
