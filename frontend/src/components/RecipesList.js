import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"
const RecipesList = ({ recipeList = [] }) => {
  return (
    <div className="recipes-list">
      {recipeList.map(recipe => {
        const { RecipeID, RecipeName, PhotoURL, prepTime, cookTime } = recipe
        // const slug = slugify(RecipeName, { lower: true })

        return (
          <Link key={RecipeID} to={`/${RecipeID}`} className="recipe">
            <img
                src= {PhotoURL}
                width="290"
                height= "300"
                style={{border: "3px solid #9db1b7", borderRadius: "10px", objectFit: "cover"}}
                alt={RecipeName}
            />
            <h5>{RecipeName}</h5>
            <p>
              Prep : {prepTime}min | Cook : {cookTime}min
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default RecipesList
