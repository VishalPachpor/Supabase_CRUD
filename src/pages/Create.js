import { useState } from "react"
import supabase from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"


const Create = () => {
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)
 
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
      e.preventDefault();

      if(!title || !method || !rating){
        setFormError("Please  fill out all fields.");
      }

      const {data, error} = await supabase
      .from("smoothies")
      .insert({title, method, rating})


      if(error){
        console.log(error);
        setFormError("Please fill out all fields")
      }

      if(data){
        console.log(data);
        setFormError(null)
        navigate("/")
      }

  }

  const setNavigation =()=>{
    navigate("/")
  }


  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="title">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="title">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={setNavigation}>Create a Smothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default Create