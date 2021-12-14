const path = require("path")
const slugify = require("slugify")
const fetch = require('node-fetch');
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
      query GetRecipes {
        allContentfulRecipe {
          nodes {
            content {
              tags
            }
          }
        }
      }
    `)
    const response = await fetch(
      `http://localhost:4000/api/recipes`
    );
    const data = await response.json();

    data.data.forEach(recipe =>{
          createPage({
            path: `/${recipe.RecipeID}`,
            component: path.resolve(`src/templates/recipe-template.js`),
            context: {
              RecipeID: recipe.RecipeID,
            },
          })
    })

    result.data.allContentfulRecipe.nodes.forEach(recipe => {
      recipe.content.tags.forEach(tag => {
        const tagSlug = slugify(tag, { lower: true })
        createPage({
          path: `/tags/${tagSlug}`,
          component: path.resolve(`src/templates/tag-template.js`),
          context: {
            tag: tag,
          },
        })
      })
    })
}



