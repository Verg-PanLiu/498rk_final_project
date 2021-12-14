const path = require("path")
const slugify = require("slugify")
const fetch = require('node-fetch');

exports.createPages = async ({ actions }) => {
    const { createPage } = actions
    const response = await fetch(
      `http://localhost:4000/api/recipes`
    );
    const data = await response.json();

    const recipeList = data.data
    const allTags = {}
    recipeList.forEach(recipe => {
        recipe.Category.forEach(tag => {
          if (allTags[tag]) {
            allTags[tag] = allTags[tag] + 1
          } else {
            allTags[tag] = 1
          }
        })
    })
      const newTags = Object.entries(allTags).sort((a, b) => {
        const [firstTag] = a
        const [secondTag] = b
        return firstTag.localeCompare(secondTag)
      })

    recipeList.forEach(recipe =>{
          createPage({
            path: `/${recipe.RecipeID}`,
            component: path.resolve(`src/templates/recipe-template.js`),
            context: {
              RecipeID: recipe.RecipeID,
            },
          })
    })


    newTags.forEach(tag => {
        const [text, value] = tag
        const tagSlug = slugify(text, { lower: true })
        createPage({
              path: `/tags/${tagSlug}`,
              component: path.resolve(`src/templates/tag-template.js`),
              context: {
                  tag: text,
              },
        })
      })
}



