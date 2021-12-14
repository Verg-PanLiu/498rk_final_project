import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import AllRecipes from "../components/AllRecipes"
import SearchBar from "../components/SearchBar"
import SEO from "../components/SEO"
import TagsList from "../components/TagsList";
import RecipesList from "../components/RecipesList";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            allRecipes: [],
            search: ''
        }
    }

    searchRecipes = (search) => {
        this.setState({
            recipes: [],
            allRecipes: [],
            search
        })
        let endpoint = `http://localhost:4000/api/recipes?contains=${search}`;
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    recipes: result.data,
                })
        })
        .catch(error => console.error('Error:', error))

        let endpoint1 = `http://localhost:4000/api/recipes`;
        fetch(endpoint1)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    allRecipes: result.data,
                })
        })
        .catch(error => console.error('Error:', error))
    }


  render() {
        const isSearch = this.state.search;
        const recipeList = this.state.recipes;
        const allRecipeList = this.state.allRecipes;
        let isExist = recipeList.length
        console.log(isExist)
        let content
        if (isExist !== 0){
            content = <RecipesList recipeList={recipeList}/>
        }else{
            content = <h1>No Recipes Found</h1>
        }

    return (
        <Layout>
          <SEO title="Home "/>
          <main className="page">
            <header className="hero">
              <StaticImage
                  src="../assets/images/food.jpg"
                  alt="homepage_img"
                  className="hero-img"
                  placeholder="tracedSVG"
                  layout="fullWidth"
              ></StaticImage>
              <div className="hero-container">
                <div className="hero-text">
                  <h1>recipes house</h1>
                  <h4>no fluff, just recipes</h4>
                </div>
              </div>
            </header>
            <SearchBar callback={this.searchRecipes}/>
            {isSearch
                ? <section className="recipes-container">
                        <TagsList recipeList={allRecipeList} />
                        {content}
                    </section>
                : <AllRecipes/>}
          </main>
        </Layout>
    )
  }
}
export default Home;
