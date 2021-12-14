import React, {useState} from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import SEO from "../components/SEO"

const Addrecipe = () => {
  const [instructionList, setInstructionList] = useState([""]);
  const [ingridentList, setIngridentList] = useState([""]);
  const [photo, setPhoto] = useState("");

  const handleInstructionChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...instructionList];
    list[index] = value;
    setInstructionList(list); 
  };

  const handleDelete = () => {
    const list = [...instructionList];
    list.splice(-1);
    setInstructionList(list);
  };

  const handleAddClick = () => {
    setInstructionList([...instructionList, ""]);
  };

  return (
    <Layout>
      <SEO title="Home " />
      <main className="page">
        <h1>Submit your recipe here</h1>
        <form className="form contact-form recipe-form">
          <div className="form-col">
            <label htmlFor="photo" className="form-label">Photo</label>
            <input name="photo" id="photo" type="file" className="form-input" />

            <h3>Instruction</h3>

            {instructionList.map((x, i) => {
              return (
                <div className="box">
                  <label htmlFor={"step" + i}>Step {i + 1}</label>
                  <input type="text" name={"step" + i} value={x} onChange={e => handleInstructionChange(e, i)} />
                </div>
              )
            })}

            <button type="button" onClick={handleAddClick}>
              Add
            </button>

            {instructionList.length > 1 && <button type="button" onClick={handleDelete}>Delete</button>}
          </div>

          <div className="form-col">

          </div>
        </form>
      </main>
    </Layout>
  )
}

export default Addrecipe