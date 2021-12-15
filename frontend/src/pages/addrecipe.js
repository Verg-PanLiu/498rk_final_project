import React, { useState } from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { BsClockHistory, BsClock, BsPeople } from "react-icons/bs"
import { useCookies } from "react-cookie"

import SEO from "../components/SEO"
import axios from "axios"

const Addrecipe = () => {
  const [instructionList, setInstructionList] = useState([""])
  const [ingredientList, setIngredientList] = useState([""])
  const [categoryList, setCategoryList] = useState([""])
  const [photo, setPhoto] = useState("")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [prepTime, setPrepTime] = useState(0)
  const [cookTime, setCookTime] = useState(0)
  const [score, setScore] = useState(0)
  const [invalid, setInvalid] = useState(false)
  const [cookies, setCookie] = useCookies()

  const handleChange = (e, index, lst, setLst) => {
    const { name, value } = e.target
    const list = [...lst]
    list[index] = value
    setLst(list)
  }

  const handleDelete = (lst, setLst) => {
    const list = [...lst]
    list.splice(-1)
    setLst(list)
  }

  const handleAdd = (lst, setLst) => {
    setLst([...lst, ""])
  }

  // ************** Ingredients ***************
  const handleIngredientChange = (e, index) => {
    handleChange(e, index, ingredientList, setIngredientList)
  }

  const handleAddIngredient = () => {
    handleAdd(ingredientList, setIngredientList)
  }

  const handleDeleteIngredient = () => {
    handleDelete(ingredientList, setIngredientList)
  }

  // ************** Instructions ***************
  const handleInstructionChange = (e, index) => {
    handleChange(e, index, instructionList, setInstructionList)
  }

  const handleDeleteInstruction = () => {
    handleDelete(instructionList, setInstructionList)
  }

  const handleAddInstruction = () => {
    handleAdd(instructionList, setInstructionList)
  }

  // ************** Categories ***************
  const handleCategoryChange = (e, index) => {
    handleChange(e, index, categoryList, setCategoryList)
  }

  const handleDeleteCategory = () => {
    handleDelete(categoryList, setCategoryList)
  }

  const handleAddCategory = () => {
    handleAdd(categoryList, setCategoryList)
  }

  // ************** Upload ***************
  const handleSubmit = event => {
    event.preventDefault()

    let json = {
      RecipeName: title,
      Description: description,
      PhotoURL: photo,
      recipeProcedure: instructionList,
      Score: score,
      UserId: cookies.userID,
      Ingredient: ingredientList,
      Category: categoryList,
      cookTime: cookTime,
      prepTime: prepTime,
    }
    axios
      .post("https://tiramisu-backend.herokuapp.com/api/recipes/", json)
      .then(res => {
        window.location = "/"
      })
      .catch(error => {
        console.log(error)
        setInvalid(true)
      })
  }

  // error message
  let errMsg = invalid ? "Recipe Submission Failure" : ""

  return (
    <Layout>
      <SEO title="Home " />
      <main className="page">
        <h1>Submit your recipe here</h1>
        <form className="form contact-form recipe-form" onSubmit={handleSubmit}>
          <div className="err-msg">{errMsg}</div>
          <section className="recipe-hero">
            <input
              type="text"
              alt="image"
              name="photo"
              value={photo}
              onChange={e => setPhoto(e.target.value)}
              placeholder="place the image url here"
              required
            />
            <article className="recipe-info">
              <h4>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Recipe Name"
                  required
                />
              </h4>
              <textarea
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows="4"
                cols="50"
                placeholder="Short Description of the recipe"
              ></textarea>
              {/* icons */}
              <div className="recipe-icons">
                <article>
                  <BsClock />
                  <h5>prep time</h5>
                  <input
                    type="number"
                    name="prepTime"
                    value={prepTime}
                    onChange={e => setPrepTime(e.target.value)}
                    required
                  />
                </article>
                <article>
                  <BsClockHistory />
                  <h5>cook time</h5>
                  <input
                    type="number"
                    name="cookTime"
                    value={cookTime}
                    onChange={e => setCookTime(e.target.value)}
                    required
                  />
                </article>
                <article>
                  <BsPeople />
                  <h5>Score</h5>
                  <input
                    type="number"
                    name="score"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                    required
                  />
                </article>
              </div>
              {/* tags */}
              Tags:
              {categoryList.map((item, index) => {
                return (
                  <div key={index} className="single-tag">
                    <input
                      type="text"
                      name={"tag" + index}
                      value={item}
                      onChange={e => handleCategoryChange(e, index)}
                      maxLength="8"
                      size="10"
                      required
                    />
                  </div>
                )
              })}
              {categoryList.length < 3 && (
                <button type="button" onClick={handleAddCategory}>
                  Add
                </button>
              )}
              {categoryList.length > 1 && (
                <button type="button" onClick={handleDeleteCategory}>
                  Delete
                </button>
              )}
            </article>
          </section>

          {/* rest of the content */}
          <section className="recipe-content">
            <article>
              <h4>instructions</h4>
              {instructionList.map((item, index) => {
                return (
                  <div key={index} className="single-instruction">
                    <header>
                      <p>step {index + 1}</p>
                      <div></div>
                    </header>
                    <input
                      type="text"
                      name={"step" + index}
                      value={item}
                      onChange={e => handleInstructionChange(e, index)}
                      required
                    />
                  </div>
                )
              })}

              <button type="button" onClick={handleAddInstruction}>
                Add
              </button>

              {instructionList.length > 1 && (
                <button type="button" onClick={handleDeleteInstruction}>
                  Delete
                </button>
              )}
            </article>

            <article className="second-column">
              <div>
                <h4>ingredients</h4>
                {ingredientList.map((item, index) => {
                  return (
                    <p key={index} className="single-ingredient">
                      <input
                        type="text"
                        name={"ingredient" + index}
                        value={item}
                        onChange={e => handleIngredientChange(e, index)}
                        required
                      />
                    </p>
                  )
                })}
                <button type="button" onClick={handleAddIngredient}>
                  Add
                </button>

                {ingredientList.length > 1 && (
                  <button type="button" onClick={handleDeleteIngredient}>
                    Delete
                  </button>
                )}
              </div>
            </article>
          </section>

          <button id="submit" type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </main>
    </Layout>
  )
}

export default Addrecipe
